# Quick Start Guide

Get your CrowdFund Hub up and running in 5 minutes!

## 1️⃣ Install Dependencies

```bash
npm install
```

## 2️⃣ Set Up Supabase

### Option A: Create a New Project
1. Go to [https://supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details
4. Wait for provisioning (~2 minutes)

### Option B: Use Existing Project
Skip to step 3 if you already have a Supabase project

## 3️⃣ Get Your Credentials

1. Go to your project dashboard
2. Click **Settings** (gear icon) → **API**
3. Copy these values:
   - **Project URL**
   - **anon public** key

## 4️⃣ Configure Environment

Create a file named `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

💡 **Tip**: Use `.env.local.template` as a reference

## 5️⃣ Set Up Database

1. In Supabase dashboard, click **SQL Editor**
2. Click **New Query**
3. Open `supabase/schema.sql` in your code editor
4. Copy and paste the entire contents
5. Click **Run** in Supabase

✅ This creates all tables, security policies, and sample data!

## 6️⃣ Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 7️⃣ Test It Out

### Try These Features:
- ✅ Browse the homepage
- ✅ View projects at `/campaigns`
- ✅ Sign up at `/signup`
- ✅ Log in at `/login`
- ✅ View your profile at `/profile`
- ✅ Back a project (click "Back Project" button)

## Troubleshooting

### "Invalid API credentials"
- Check that `.env.local` exists in the root directory
- Verify the credentials are correct (no extra spaces)
- Restart the dev server: stop and run `npm run dev` again

### "Network error" or can't connect to Supabase
- Check your internet connection
- Verify the Supabase URL is correct
- Make sure your Supabase project is active

### Projects not showing from database
- The app shows sample data if the database is empty
- Run the SQL schema from `supabase/schema.sql`
- Check Supabase → Database → Tables to verify

### Can't sign up or log in
- Enable Email auth: Supabase → Authentication → Providers → Email
- Check that environment variables are set
- Clear browser cookies and try again

## What's Next?

📚 **Full documentation**: See `SETUP_GUIDE.md`

🚀 **Deploy to production**: 
```bash
# Push to GitHub, then deploy on Vercel
vercel
```

🎨 **Customize the design**: Edit files in `app/` and `components/`

💾 **Add features**: Use the API routes in `app/api/`

## Project Structure

```
├── app/           # Pages and routes
├── components/    # Reusable components
├── lib/          # Utilities and Supabase
├── supabase/     # Database schema
└── public/       # Static files
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Getting Help

- 📖 [Setup Guide](./SETUP_GUIDE.md) - Detailed setup instructions
- 📝 [Migration Notes](./MIGRATION_NOTES.md) - What changed from HTML
- 🔗 [Next.js Docs](https://nextjs.org/docs)
- 🔗 [Supabase Docs](https://supabase.com/docs)

Happy coding! 🎉

