# CyberShield - Cybersecurity Awareness Platform

## Overview
A modern, interactive cybersecurity awareness platform with AI-powered chat, educational content, quizzes, and gamification features. Built with React, TypeScript, Express, and PostgreSQL.

## Project Structure
- **Client**: React + TypeScript with TailwindCSS and shadcn components
- **Server**: Express.js with Drizzle ORM
- **Database**: PostgreSQL with Replit Auth integration
- **Styling**: Dark theme with electric blue/cyan accents, CSS-based 3D effects

## Completed Features

### MVP Features (Completed)
✅ User authentication via Replit Auth  
✅ Educational articles library with 7+ cybersecurity topics  
✅ Interactive quiz system with multiple-choice questions  
✅ User dashboard with progress tracking  
✅ Cyber-themed dark UI with neon accents  
✅ Responsive design for desktop and mobile  
✅ Article detail pages with rich content  
✅ Quiz scoring and feedback  
✅ CyberBackground with 3D effects  

### Latest Features Added
✅ **AI-powered Chatbot** - CyberShield Assistant using OpenAI GPT-3.5-turbo  
✅ **Cyber Fraud Reporting Page** - Links to Indian cyber crime portals with step-by-step guide  
✅ **Cyber Incident Reporting System** - Form-based incident report submission with severity levels  
✅ **Admin Panel** - Dashboard for admins to manage articles, quizzes, and view analytics  
✅ **Progressive Difficulty** - Suggested quizzes based on user performance (beginner→intermediate→advanced)  
✅ **Leaderboard** - Community ranking based on quiz scores and achievements  
✅ **Gamification System** - Badge/Achievement schema and framework (8 badge types)  

## Database Schema
- **users**: Authentication & profile data with admin flag
- **articles**: Cybersecurity educational content  
- **quizzes**: Interactive assessments with multiple-choice questions  
- **quiz_attempts**: Track user quiz submissions and scores  
- **incident_reports**: Cyber incident documentation  
- **badges**: Achievement definitions  
- **user_achievements**: Track earned badges per user  
- **sessions**: Replit Auth session storage  

## Key Pages & Routes
- `/` - Home (authenticated) / Landing (unauthenticated)  
- `/learn` - Articles library with filtering  
- `/article/:slug` - Article detail page  
- `/quiz` - Interactive quiz  
- `/dashboard` - User progress dashboard  
- `/resources` - Report fraud with Indian cyber portals  
- `/report-incident` - Submit incident reports  
- `/leaderboard` - Community rankings  
- `/admin` - Admin dashboard (admin-only)  

## API Endpoints

### Articles
- `GET /api/articles` - List all articles
- `GET /api/articles/:slug` - Get article details

### Quizzes
- `GET /api/quizzes/random` - Get random quiz
- `POST /api/quiz-attempts` - Submit quiz attempt
- `GET /api/quiz-attempts` - Get user's attempts
- `GET /api/quiz/suggested` - Get next recommended quiz

### Chat
- `POST /api/chat` - Send message to AI assistant

### Incidents
- `POST /api/incident-reports` - Submit incident report
- `GET /api/incident-reports` - Get user's reports

### Admin
- `GET /api/admin/stats` - Get platform statistics

### Community
- `GET /api/leaderboard` - Get ranked users

## Technologies Used
- **Frontend**: React 18, TypeScript, TailwindCSS, shadcn UI, Recharts, Lucide Icons
- **Backend**: Express.js, Drizzle ORM, OpenAI API
- **Database**: PostgreSQL with Neon backend
- **Authentication**: Replit Auth (OpenID Connect)
- **Deployment**: Replit (npm run dev)

## User Preferences
- Cybersecurity-focused platform targeting Indian users
- Emphasis on practical security awareness and fraud reporting
- Dark theme with neon accents as primary aesthetic
- Focus on educational content with interactive elements

## Next Phase Ideas
- Email notifications for achievements
- Social sharing of achievements
- Gamification analytics dashboard
- Interactive security simulations
- Company/organization team features
