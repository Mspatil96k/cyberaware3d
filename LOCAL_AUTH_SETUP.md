# Local Authentication Setup for Mac Development

## Using Local Auth Instead of Replit Auth

This project can run locally with a simple username/password authentication system.

### Setup Steps

1. **Update your `.env.local` file:**
   ```env
   NODE_ENV=development
   DATABASE_URL="postgresql://user:password@localhost:5432/cybershield_dev"
   SESSION_SECRET="your-dev-secret-key-change-me"
   USE_LOCAL_AUTH="true"
   ```

2. **The system includes:**
   - User registration (`/api/register`)
   - User login (`/api/login`)
   - User logout (`/api/logout`)
   - Auth check (`/api/auth/user`)

### Create Your First User

Once the app is running, use the browser console or make a POST request:

```bash
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","firstName":"John","password":"password123"}'
```

Or through the UI (login form will appear on the landing page).

### Default Test Credentials
- Email: `test@example.com`
- Password: `test123`

### How It Works

- **Registration**: Creates a new user in PostgreSQL
- **Login**: Uses Passport.js local strategy with session management
- **Session**: Stored in PostgreSQL, persists across requests
- **Password**: Hashed with base64 (use bcrypt in production)

### Switching Between Auth Methods

In `server/index-dev.ts`, comment out Replit Auth and enable local auth:

```typescript
// Replit Auth (comment out for local development)
// await setupAuth(app, server);

// Local Auth (uncomment for local development)
await setupLocalAuth(app);
```

### Testing Authenticated Routes

1. Register/Login first
2. Access protected routes like:
   - `/dashboard` - View your quiz progress
   - `/api/quiz-attempts` - Get your quiz history
   - `/report-incident` - Submit incident reports

### Important Notes

⚠️ **For Production**: This local auth is basic and NOT SECURE. Use:
- bcrypt for password hashing
- HTTPS only
- Stronger session management
- Environment-based secrets

For production, use Replit Auth or a proper auth service like Auth0.

### Troubleshooting

**Can't create user?**
- Check PostgreSQL is running: `brew services list`
- Verify database exists: `psql cybershield_dev`

**Session not persisting?**
- Ensure `sessions` table exists
- Check `SESSION_SECRET` is set

**Cookies not saving?**
- Set `secure: false` in `server/localAuth.ts` for localhost
