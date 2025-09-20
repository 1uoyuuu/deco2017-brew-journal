// Supabase configuration using environment variables
import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks
const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || 'https://pcvsoorcldhtykxmejkn.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjdnNvb3JjbGRodHlreG1lamtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNzA4NDEsImV4cCI6MjA3Mzk0Njg0MX0.OmSWtXNS3Y5L_K9WW8zPVKFgT8FQv0GUC5WbI5i0M9U';


// Initialize Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Database table names
export const TABLES = {
  COFFEES: 'coffees',
  DRIPPERS: 'drippers', 
  GRINDERS: 'grinders',
  BREWS: 'brews'
};

// Use database by default - no localStorage fallback
export const USE_DATABASE = true;
