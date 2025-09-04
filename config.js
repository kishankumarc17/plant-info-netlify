// config.js

// 🔹 Replace these with your actual Supabase values
const SUPABASE_URL = "https://https://ntvcmqvcwkzrgsexpnip.supabase.co";   // paste your project URL here
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50dmNtcXZjd2t6cmdzZXhwbmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MDk4MDAsImV4cCI6MjA3MjM4NTgwMH0.uVbUY27Lgkj7QGDliGPlWiE3QAhbzG3DiCiPOFYUWrI";   // paste your anon key here

// Create Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
