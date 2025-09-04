// config.js
// Supabase project credentials
const SUPABASE_URL = "https://ntvcmqvcwkzrgsexpnip.supabase.co"; 
const SUPABASE_ANON_KEY = "PASTE_YOUR_FULL_ANON_KEY_HERE";  

// Create client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
