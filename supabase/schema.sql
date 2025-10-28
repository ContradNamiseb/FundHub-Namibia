-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT DEFAULT '🚀',
    goal NUMERIC(12, 2) NOT NULL CHECK (goal > 0),
    raised NUMERIC(12, 2) DEFAULT 0 CHECK (raised >= 0),
    backers INTEGER DEFAULT 0 CHECK (backers >= 0),
    days_left INTEGER NOT NULL CHECK (days_left >= 0),
    category TEXT,
    creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'funded', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create pledges table
CREATE TABLE IF NOT EXISTS public.pledges (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_creator ON public.projects(creator_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pledges_project ON public.pledges(project_id);
CREATE INDEX IF NOT EXISTS idx_pledges_user ON public.pledges(user_id);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pledges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" 
    ON public.profiles FOR SELECT 
    USING (true);

CREATE POLICY "Users can update own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = id);

-- Projects policies
CREATE POLICY "Projects are viewable by everyone" 
    ON public.projects FOR SELECT 
    USING (true);

CREATE POLICY "Authenticated users can create projects" 
    ON public.projects FOR INSERT 
    WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Project creators can update their own projects" 
    ON public.projects FOR UPDATE 
    USING (auth.uid() = creator_id);

CREATE POLICY "Project creators can delete their own projects" 
    ON public.projects FOR DELETE 
    USING (auth.uid() = creator_id);

-- Pledges policies
CREATE POLICY "Pledges are viewable by project creator and pledge owner" 
    ON public.pledges FOR SELECT 
    USING (
        auth.uid() = user_id 
        OR auth.uid() IN (
            SELECT creator_id FROM public.projects WHERE id = project_id
        )
    );

CREATE POLICY "Authenticated users can create pledges" 
    ON public.pledges FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Categories policies
CREATE POLICY "Categories are viewable by everyone" 
    ON public.categories FOR SELECT 
    USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update project stats when pledge is created
CREATE OR REPLACE FUNCTION update_project_stats()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.projects
    SET 
        raised = raised + NEW.amount,
        backers = backers + 1,
        status = CASE 
            WHEN (raised + NEW.amount) >= goal THEN 'funded'
            ELSE status
        END
    WHERE id = NEW.project_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update project stats on pledge
CREATE TRIGGER on_pledge_created
    AFTER INSERT ON public.pledges
    FOR EACH ROW EXECUTE FUNCTION update_project_stats();

-- Insert sample categories
INSERT INTO public.categories (name, slug) VALUES
    ('Technology', 'technology'),
    ('Design', 'design'),
    ('Art', 'art'),
    ('Music', 'music'),
    ('Film', 'film'),
    ('Games', 'games'),
    ('Food', 'food'),
    ('Fashion', 'fashion')
ON CONFLICT (slug) DO NOTHING;

