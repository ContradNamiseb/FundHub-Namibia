# CrowdFund Hub - Setup Guide

This guide will help you set up and run your Next.js CrowdFund Hub application with Supabase.

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- A Supabase account (free tier works fine)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Supabase

1. Go to [https://supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be provisioned (this may take a few minutes)
3. Once ready, go to **Project Settings** > **API**
4. Copy your:
   - Project URL
   - anon/public key
   - (Optional) service_role key for admin operations

## Step 3: Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

Replace the placeholder values with your actual Supabase credentials.

## Step 4: Set Up Database

1. Go to your Supabase project dashboard
2. Click on **SQL Editor** in the left sidebar
3. Create a new query
4. Copy and paste the contents of `supabase/schema.sql`
5. Click **Run** to execute the SQL

This will create all necessary tables, relationships, security policies, and sample data.

## Step 5: Enable Authentication (Optional)

For the authentication features to work:

1. Go to **Authentication** > **Providers** in your Supabase dashboard
2. Enable **Email** provider
3. (Optional) Enable **Google** or **GitHub** OAuth providers

### Email Configuration

- For development, you can use the built-in email service
- For production, configure your own SMTP settings in **Authentication** > **Email Templates**

## Step 6: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 7: Test the Application

### Test Authentication:
1. Go to `/signup` and create a new account
2. Check your email for verification (in development, check Supabase dashboard > Authentication > Users)
3. Log in at `/login`
4. Visit `/profile` to see your profile

### Test Projects:
1. The homepage will show sample projects if your database is empty
2. You can click "Back Project" to simulate funding
3. Visit `/campaigns` to see all projects with filtering

## Project Structure

```
├── app/                    # Next.js 14 app directory
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── campaigns/         # Campaigns listing
│   ├── contact/           # Contact form
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── profile/           # User profile
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ProjectCard.tsx
├── lib/                   # Utility libraries
│   └── supabase/         # Supabase client setup
│       ├── client.ts     # Browser client
│       ├── server.ts     # Server client
│       └── types.ts      # Database types
├── supabase/             # Database schemas
│   └── schema.sql        # Database schema and migrations
├── middleware.ts         # Next.js middleware for auth
└── package.json          # Dependencies
```

## Features

✅ **User Authentication**
- Email/password signup and login
- Profile management
- Protected routes

✅ **Project Management**
- Browse all campaigns
- Filter by category
- Search functionality
- Project funding simulation

✅ **Responsive Design**
- Mobile-friendly
- Dark mode support
- Modern UI with Tailwind CSS

✅ **Supabase Integration**
- Real-time database
- Row Level Security (RLS)
- Automatic profile creation
- Secure authentication

## Common Issues & Solutions

### Issue: "Invalid API Key" error

**Solution:** Make sure your `.env.local` file is in the root directory and contains the correct Supabase credentials.

### Issue: Projects not loading from database

**Solution:** 
1. Make sure you ran the SQL schema from `supabase/schema.sql`
2. The app will fall back to sample data if the database is empty
3. Check Supabase dashboard > Database > Tables to verify tables were created

### Issue: Authentication not working

**Solution:**
1. Verify Email provider is enabled in Supabase dashboard
2. Check that environment variables are set correctly
3. Clear browser cookies and try again

### Issue: Styling not working

**Solution:**
1. Make sure Tailwind CSS is properly configured
2. Run `npm install` to ensure all dependencies are installed
3. Restart the development server

## Production Deployment

### Deploying to Vercel:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel project settings
5. Deploy!

### Environment Variables for Production:

Make sure to add all three environment variables in your hosting platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Next Steps

- Customize the design to match your brand
- Add payment processing (Stripe, PayPal, etc.)
- Implement project creation functionality
- Add image uploads for projects
- Set up email notifications
- Add analytics

## Support

For issues or questions:
- Check the [Next.js documentation](https://nextjs.org/docs)
- Check the [Supabase documentation](https://supabase.com/docs)
- Review the code comments

## License

This project is open source and available under the MIT License.

