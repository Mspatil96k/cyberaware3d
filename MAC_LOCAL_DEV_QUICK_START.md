# Quick Start: CyberShield on Mac with VS Code

## 5-Minute Setup

### 1. Prerequisites Check
```bash
# Check if you have Node.js
node --version  # Should be v18+

# Check if you have PostgreSQL
brew services list | grep postgresql
# If not installed:
brew install postgresql@15
```

### 2. PostgreSQL Setup
```bash
# Start PostgreSQL
brew services start postgresql@15

# Create database
createdb cybershield_dev
```

### 3. Project Setup
```bash
# Clone and enter project
git clone <repo-url>
cd cybershield

# Install dependencies
npm install

# Create .env.local file
cat > .env.local << 'EOF'
NODE_ENV=development
DATABASE_URL="postgresql://$(whoami)@localhost:5432/cybershield_dev"
SESSION_SECRET="dev-secret-key-12345"
USE_LOCAL_AUTH="true"
EOF
```

### 4. Initialize Database
```bash
npm run db:push
```

### 5. Start Development Server
```bash
npm run dev
```

### 6. Open in Browser
- Visit: `http://localhost:5000`
- Use demo credentials:
  - **Email**: `test@example.com`
  - **Password**: `test123`

## Features Available Without Setup
- ✅ View articles & quizzes
- ✅ Learn cybersecurity concepts
- ✅ Read fraud reporting guide
- ✅ View leaderboard

## Features Available After Login
- ✅ Take quizzes & track progress
- ✅ Dashboard with stats
- ✅ Report cyber incidents
- ✅ AI chatbot assistance (requires OPENAI_API_KEY)
- ✅ Community leaderboard ranking

## Optional: Enable AI Chatbot
1. Get OpenAI API key from https://platform.openai.com
2. Add to `.env.local`:
   ```
   OPENAI_API_KEY="sk-..."
   ```
3. Restart dev server

## Troubleshooting

**Error: database does not exist**
```bash
createdb cybershield_dev
npm run db:push
```

**Error: connect ECONNREFUSED**
```bash
brew services start postgresql@15
```

**Port 5000 in use**
```bash
PORT=3000 npm run dev
```

**Can't login with demo credentials**
- Make sure `USE_LOCAL_AUTH="true"` is in `.env.local`
- Restart dev server: `npm run dev`
- Check if user was created: `npm run db:push`

## Project Structure
```
cybershield/
├── client/              # React frontend
│   └── src/
│       ├── pages/       # Page components
│       └── components/  # UI components
├── server/              # Express backend
│   ├── localAuth.ts     # Local auth implementation
│   ├── routes.ts        # API endpoints
│   └── seed.ts          # Database initialization
├── shared/
│   └── schema.ts        # Database schema
└── .env.local          # Your secrets (create this)
```

## Key Routes
- `/` - Home / Landing
- `/login` - Login/Register
- `/learn` - Articles library
- `/quiz` - Interactive quiz
- `/dashboard` - Your progress
- `/resources` - Fraud reporting guide
- `/leaderboard` - Community ranking

## For Production Deployment
1. Switch back to Replit Auth (remove `USE_LOCAL_AUTH`)
2. Use bcrypt for password hashing
3. Set strong `SESSION_SECRET`
4. Disable local debug users

That's it! Happy learning! 🚀
