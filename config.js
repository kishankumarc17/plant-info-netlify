// config.js

// 🔹 Replace these with your actual Supabase values
const SUPABASE_URL = "https://xxxx.supabase.co";   // paste your project URL here
const SUPABASE_ANON_KEY = "your-anon-key-here";   // paste your anon key here

// Create Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
