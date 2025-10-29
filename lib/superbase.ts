import { createBrowserClient } from '@supabase/ssr';  // For client-side
import { createServerClient } from '@supabase/ssr';  // For server-side
import { cookies } from 'next/headers';              // For session cookies

export const createClient = () => createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const createServerClient = () => createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      get(name: string) {
        return cookies().get(name)?.value;
      },
      set(name: string, value: string, options?: any) {
        cookies().set({ name, value, ...options });
      },
      remove(name: string, options?: any) {
        cookies().delete({ name, ...options });
      },
    },
  },
);