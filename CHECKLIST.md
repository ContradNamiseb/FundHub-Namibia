# ✅ Setup Checklist

Follow this checklist to get your CrowdFund Hub up and running!

## Prerequisites
- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm or yarn installed (`npm --version`)
- [ ] Code editor (VS Code recommended)
- [ ] Git installed (optional, for version control)

## Setup Steps

### 1. Dependencies
- [ ] Run `npm install`
- [ ] Wait for all packages to install
- [ ] Verify no errors in console

### 2. Supabase Account
- [ ] Go to https://supabase.com
- [ ] Sign up / Log in
- [ ] Click "New Project"
- [ ] Fill in project details:
  - [ ] Project name: (e.g., "crowdfund-hub")
  - [ ] Database password: (save this!)
  - [ ] Region: (choose closest to you)
- [ ] Wait for project to provision (~2 minutes)

### 3. Get Supabase Credentials
- [ ] Open your project dashboard
- [ ] Click Settings (gear icon) → API
- [ ] Copy "Project URL"
- [ ] Copy "anon public" key
- [ ] Copy "service_role" key (optional, for admin features)

### 4. Environment Variables
- [ ] Create `.env.local` file in project root
- [ ] Add `NEXT_PUBLIC_SUPABASE_URL=` + your URL
- [ ] Add `NEXT_PUBLIC_SUPABASE_ANON_KEY=` + your anon key
- [ ] Add `SUPABASE_SERVICE_ROLE_KEY=` + your service key
- [ ] Save the file

### 5. Database Setup
- [ ] In Supabase dashboard, click "SQL Editor"
- [ ] Click "New Query"
- [ ] Open `supabase/schema.sql` in your code editor
- [ ] Copy ALL contents of the file
- [ ] Paste into Supabase SQL Editor
- [ ] Click "Run" button
- [ ] Verify "Success" message appears
- [ ] Check Database → Tables to see new tables

### 6. Enable Authentication
- [ ] In Supabase dashboard, go to Authentication
- [ ] Click "Providers"
- [ ] Verify "Email" is enabled (should be by default)
- [ ] (Optional) Enable Google/GitHub OAuth

### 7. Start Development Server
- [ ] Run `npm run dev`
- [ ] Wait for "Ready in X ms"
- [ ] Open http://localhost:3000
- [ ] Verify homepage loads correctly

### 8. Test Features
- [ ] Browse homepage
- [ ] Click "Explore Projects" - should scroll to projects
- [ ] Navigate to different pages using header
- [ ] Check dark mode (if system supports it)
- [ ] Test on mobile (resize browser)

### 9. Test Authentication
- [ ] Go to `/signup`
- [ ] Create a test account
- [ ] Check email for verification (or check Supabase dashboard)
- [ ] Log in at `/login`
- [ ] Visit `/profile`
- [ ] Edit your profile
- [ ] Log out

### 10. Test Project Features
- [ ] On homepage, click "Back Project" on any project
- [ ] Enter an amount (e.g., 50)
- [ ] Click "Confirm Funding"
- [ ] Verify success message
- [ ] Check that project stats updated

### 11. Test Campaigns Page
- [ ] Go to `/campaigns`
- [ ] Try filtering by category
- [ ] Try searching for a project
- [ ] Click on a project card

## Optional: Deploy to Production

### Vercel Deployment
- [ ] Push code to GitHub
- [ ] Go to https://vercel.com
- [ ] Click "Import Project"
- [ ] Connect your GitHub repository
- [ ] Add environment variables:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Visit your live site!

## Customization (Optional)

### Design
- [ ] Change brand colors in `tailwind.config.js`
- [ ] Update logo text in `components/Header.tsx`
- [ ] Customize hero text in `app/page.tsx`
- [ ] Add your own favicon to `public/`

### Content
- [ ] Update about page content
- [ ] Customize contact information
- [ ] Add your company details to footer
- [ ] Update meta tags for SEO

### Features
- [ ] Add payment processing (Stripe/PayPal)
- [ ] Implement project creation form
- [ ] Add image upload for projects
- [ ] Set up email notifications
- [ ] Add social sharing

## Troubleshooting

If something doesn't work:

### Installation Issues
- [ ] Try deleting `node_modules` and run `npm install` again
- [ ] Check Node.js version is 18+
- [ ] Clear npm cache: `npm cache clean --force`

### Supabase Issues
- [ ] Verify `.env.local` exists and has correct values
- [ ] Check no extra spaces in environment variables
- [ ] Restart dev server after changing env vars
- [ ] Verify Supabase project is active

### Database Issues
- [ ] Re-run the SQL from `supabase/schema.sql`
- [ ] Check tables exist in Supabase dashboard
- [ ] Verify RLS policies are enabled
- [ ] Check browser console for errors

### Auth Issues
- [ ] Clear browser cookies
- [ ] Verify Email provider is enabled
- [ ] Check Supabase Auth settings
- [ ] Try incognito/private browsing

## Getting Help

- [ ] Read `QUICK_START.md` for quick setup
- [ ] Check `SETUP_GUIDE.md` for detailed instructions
- [ ] Review `CONVERSION_SUMMARY.md` for overview
- [ ] Look at Next.js docs: https://nextjs.org/docs
- [ ] Check Supabase docs: https://supabase.com/docs

## You're Done! 🎉

When all checkboxes are checked, you're ready to:
- Develop new features
- Customize the design
- Deploy to production
- Share with users

**Happy coding!** 🚀

