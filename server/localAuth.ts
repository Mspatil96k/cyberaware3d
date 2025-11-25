import { type Express, type Request, type Response } from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { db } from "./db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";

// Simple password hashing (use bcrypt in production)
const hashPassword = (password: string) => Buffer.from(password).toString("base64");
const comparePassword = (password: string, hash: string) => hashPassword(password) === hash;

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000;
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  return session({
    secret: process.env.SESSION_SECRET || "dev-secret-key",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: sessionTtl,
    },
  });
}

export async function setupLocalAuth(app: Express) {
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  // Local strategy
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await db.query.users.findFirst({
          where: eq(users.email, username),
        });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        // For local auth, password hash is stored in profileImageUrl field
        // In production, use bcrypt or a dedicated password field
        const storedHash = user.profileImageUrl || "";
        if (!comparePassword(password, storedHash)) {
          return done(null, false, { message: "Invalid password" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.id, id),
      });
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Login route
  app.post("/api/login", passport.authenticate("local"), (req: Request, res: Response) => {
    res.json({ user: req.user });
  });

  // Register route
  app.post("/api/register", async (req: Request, res: Response) => {
    try {
      const { email, firstName, password } = req.body;

      const existing = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (existing) {
        return res.status(400).json({ error: "User already exists" });
      }

      const user = await db
        .insert(users)
        .values({
          email,
          firstName: firstName || email.split("@")[0],
          profileImageUrl: hashPassword(password), // Store hash in profileImageUrl temporarily
        })
        .returning();

      req.login(user[0], (err) => {
        if (err) return res.status(500).json({ error: "Login failed" });
        res.json({ user: user[0] });
      });
    } catch (error) {
      res.status(500).json({ error: "Registration failed" });
    }
  });

  // Logout route
  app.get("/api/logout", (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) return res.status(500).json({ error: "Logout failed" });
      res.json({ message: "Logged out" });
    });
  });

  // Auth check route
  app.get("/api/auth/user", (req: Request, res: Response) => {
    if (req.user) {
      res.json(req.user);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  });
}
