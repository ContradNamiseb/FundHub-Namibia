# 🚀 CrowdFund Hub - Next.js Application

A modern, full-stack crowdfunding platform built with **Next.js 14**, **Supabase**, and **TypeScript**.

## ✨ Features

- 🚀 **Next.js 14** with App Router and Server Components
- 💾 **Supabase** for backend, database, and authentication
- 🎨 **Tailwind CSS** for modern, responsive styling
- 🌙 **Dark Mode** support with system preference detection
- 🔐 **User Authentication** (signup, login, profile management)
- 💳 **Project Funding** system with real-time updates
- 📱 **Responsive Design** - works on all devices
- 🔒 **Row Level Security** for data protection
- ⚡ **TypeScript** for type safety
- 🎯 **SEO Optimized** with server-side rendering

## 🚀 Quick Start

**Get started in 5 minutes!** See [QUICK_START.md](./QUICK_START.md)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables (see QUICK_START.md)
# Create .env.local with your Supabase credentials

# 3. Run development server
npm run dev
```

## 📚 Documentation

- **[Quick Start Guide](./QUICK_START.md)** - Get running in 5 minutes
- **[Setup Guide](./SETUP_GUIDE.md)** - Detailed setup instructions
- **[Migration Notes](./MIGRATION_NOTES.md)** - Changes from HTML version

## 🏗️ Project Structure

```
├── app/                      # Next.js App Router
│   ├── page.tsx             # Homepage
│   ├── about/               # About page
│   ├── campaigns/           # Campaigns listing
│   ├── contact/             # Contact form
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   ├── profile/             # User profile
│   └── api/                 # API routes
├── components/              # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ProjectCard.tsx
├── lib/                     # Utilities
│   ├── supabase/           # Supabase integration
│   └── utils/              # Helper functions
├── supabase/               # Database
│   └── schema.sql          # Database schema
└── middleware.ts           # Auth middleware
```

## 🗄️ Database Schema

The Supabase database includes:

- **profiles** - User profiles (extends auth.users)
- **projects** - Crowdfunding projects
- **pledges** - User pledges to projects
- **categories** - Project categories

All tables have Row Level Security (RLS) enabled.

## 🔐 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

Get these from: Supabase Dashboard → Settings → API

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌐 Pages

- `/` - Homepage with featured projects
- `/about` - About us page
- `/campaigns` - All campaigns with filtering
- `/contact` - Contact form
- `/login` - User login
- `/signup` - User registration
- `/profile` - User profile (protected)

## 🔌 API Endpoints

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a project (auth required)
- `GET /api/pledges` - Get user pledges (auth required)
- `POST /api/pledges` - Create a pledge (auth required)

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repo on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy! 🎉

### Deploy to Other Platforms

The app works on any platform supporting Node.js:
- Netlify
- Railway
- Render
- Digital Ocean

## 🧪 Testing

Test these features:
- ✅ Browse projects on homepage
- ✅ Filter campaigns by category
- ✅ User signup and login
- ✅ View and edit profile
- ✅ Back a project
- ✅ Dark mode toggle
- ✅ Responsive design

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js` and `app/globals.css`

### Add Pages
Create new files in `app/` directory

### Modify Components
Edit files in `components/` directory

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📝 License

This project is open source and available under the MIT License.

## 💬 Support

Need help? Check out:
- [Quick Start Guide](./QUICK_START.md)
- [Setup Guide](./SETUP_GUIDE.md)
- [Migration Notes](./MIGRATION_NOTES.md)

---

Built with ❤️ using Next.js and Supabase

