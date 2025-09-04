// config.js
// Supabase project credentials (hardcoded for plain HTML/JS setup)
const SUPABASE_URL = "https://ntvcmqvcwkzrgsexpnip.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // full anon key

// Create client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
