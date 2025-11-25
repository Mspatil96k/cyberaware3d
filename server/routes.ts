import { createServer as createHttpServer } from "node:http";
import { type Express, type Request, type Response } from "express";
import { db } from "./db";
import { articles, quizzes, quizAttempts, incidentReports, users, badges, userAchievements } from "@shared/schema";
import { insertQuizAttemptSchema, insertIncidentReportSchema } from "@shared/schema";
import { eq, desc, count } from "drizzle-orm";
import { requireAuth } from "./middleware";
import { setupAuth } from "./replitAuth";
import { setupLocalAuth } from "./localAuth";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function registerRoutes(app: Express) {
  const server = createHttpServer(app);
  
  // Setup authentication (use local auth for development if enabled)
  if (process.env.USE_LOCAL_AUTH === "true" || process.env.NODE_ENV === "development") {
    try {
      await setupLocalAuth(app);
    } catch (error) {
      console.log("Local auth setup failed, falling back to Replit auth");
      await setupAuth(app, server);
    }
  } else {
    await setupAuth(app, server);
  }

  // Articles endpoints
  app.get("/api/articles", async (req: Request, res: Response) => {
    try {
      const allArticles = await db.query.articles.findMany({
        orderBy: desc(articles.createdAt),
      });
      res.json(allArticles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/:slug", async (req: Request, res: Response) => {
    try {
      const article = await db.query.articles.findFirst({
        where: eq(articles.slug, req.params.slug),
      });
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch article" });
    }
  });

  // Quizzes endpoints
  app.get("/api/quizzes/random", async (req: Request, res: Response) => {
    try {
      const allQuizzes = await db.query.quizzes.findMany();
      if (allQuizzes.length === 0) {
        return res.status(404).json({ error: "No quizzes available" });
      }
      const randomQuiz = allQuizzes[Math.floor(Math.random() * allQuizzes.length)];
      res.json(randomQuiz);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz" });
    }
  });

  app.get("/api/quizzes", async (req: Request, res: Response) => {
    try {
      const allQuizzes = await db.query.quizzes.findMany();
      res.json(allQuizzes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quizzes" });
    }
  });

  // Quiz attempts endpoints
  app.post("/api/quiz-attempts", requireAuth, async (req: Request, res: Response) => {
    try {
      const { quizId, score, answers } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const validatedData = insertQuizAttemptSchema.parse({
        userId,
        quizId,
        score,
        answers,
      });

      const attempt = await db.insert(quizAttempts).values(validatedData).returning();
      res.json(attempt[0]);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to submit quiz" });
    }
  });

  app.get("/api/quiz-attempts", requireAuth, async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const attempts = await db.query.quizAttempts.findMany({
        where: eq(quizAttempts.userId, userId),
        orderBy: desc(quizAttempts.completedAt),
      });

      res.json(attempts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz attempts" });
    }
  });

  app.get("/api/quiz-attempts/recent", requireAuth, async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const attempts = await db.query.quizAttempts.findMany({
        where: eq(quizAttempts.userId, userId),
        orderBy: desc(quizAttempts.completedAt),
        limit: 5,
      });

      res.json(attempts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recent attempts" });
    }
  });

  // AI Chat endpoint
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { message, conversationHistory } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Invalid message" });
      }

      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
        {
          role: "system",
          content: `You are CyberShield Assistant, a helpful AI chatbot specialized in cybersecurity awareness and education. You help users with:
1. Cybersecurity best practices and tips
2. How to report cyber fraud in India
3. Understanding common cyber threats
4. Protection strategies
5. Information about Indian cyber crime reporting portals

When users ask about reporting fraud, provide clear step-by-step guidance and mention official Indian resources like the National Cyber Crime Reporting Portal (cybercrime.gov.in).

Be helpful, accurate, and encourage users to check official resources for important decisions. Keep responses concise and friendly.`,
        },
      ];

      if (Array.isArray(conversationHistory)) {
        conversationHistory.forEach((msg: any) => {
          messages.push({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text,
          });
        });
      }

      messages.push({
        role: "user",
        content: message,
      });

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages,
        max_tokens: 500,
        temperature: 0.7,
      });

      const reply = response.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";

      res.json({ reply });
    } catch (error: any) {
      console.error("Chat error:", error);
      res.status(500).json({
        error: error.message || "Failed to process chat message",
      });
    }
  });

  // Incident Reports endpoints
  app.post("/api/incident-reports", requireAuth, async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });

      const data = insertIncidentReportSchema.parse(req.body);
      const report = await db
        .insert(incidentReports)
        .values({ ...data, userId })
        .returning();

      res.json(report[0]);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to submit report" });
    }
  });

  app.get("/api/incident-reports", requireAuth, async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });

      const reports = await db.query.incidentReports.findMany({
        where: eq(incidentReports.userId, userId),
        orderBy: desc(incidentReports.createdAt),
      });

      res.json(reports);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reports" });
    }
  });

  // Admin endpoints
  app.get("/api/admin/stats", requireAuth, async (req: Request, res: Response) => {
    try {
      if (!req.user?.isAdmin) return res.status(403).json({ error: "Forbidden" });

      const totalUsersResult = await db.select({ count: count() }).from(users);
      const totalArticlesResult = await db.select({ count: count() }).from(articles);
      const totalQuizzesResult = await db.select({ count: count() }).from(quizzes);

      res.json({
        totalUsers: totalUsersResult[0]?.count || 0,
        totalArticles: totalArticlesResult[0]?.count || 0,
        totalQuizzes: totalQuizzesResult[0]?.count || 0,
        activeToday: 0,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Suggested next quiz based on performance
  app.get("/api/quiz/suggested", requireAuth, async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });

      const attempts = await db.query.quizAttempts.findMany({
        where: eq(quizAttempts.userId, userId),
        orderBy: desc(quizAttempts.completedAt),
        limit: 5,
      });

      if (attempts.length === 0) {
        const beginner = await db.query.quizzes.findFirst({
          where: eq(quizzes.difficulty, "beginner"),
        });
        return res.json(beginner);
      }

      const avgScore = attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length;
      let difficulty = "beginner";
      if (avgScore > 80) difficulty = "advanced";
      else if (avgScore > 60) difficulty = "intermediate";

      const suggested = await db.query.quizzes.findFirst({
        where: eq(quizzes.difficulty, difficulty),
      });

      res.json(suggested);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch suggested quiz" });
    }
  });

  // Leaderboard endpoint
  app.get("/api/leaderboard", async (req: Request, res: Response) => {
    try {
      const allUsers = await db.query.users.findMany();
      
      const leaderboardData = await Promise.all(
        allUsers.map(async (user) => {
          const userAttempts = await db.query.quizAttempts.findMany({
            where: eq(quizAttempts.userId, user.id),
          });

          const totalScore = userAttempts.reduce((sum, a) => sum + a.score, 0);
          const averageScore =
            userAttempts.length > 0
              ? Math.round(totalScore / userAttempts.length)
              : 0;

          const userBadges = await db.query.userAchievements.findMany({
            where: eq(userAchievements.userId, user.id),
          });

          return {
            id: user.id,
            firstName: user.firstName,
            email: user.email,
            totalScore,
            quizCount: userAttempts.length,
            averageScore,
            badges: userBadges.length,
          };
        })
      );

      const sorted = leaderboardData
        .sort((a, b) => b.totalScore - a.totalScore)
        .slice(0, 50);

      res.json(sorted);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });

  return server;
}
