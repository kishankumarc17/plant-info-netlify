# Smart Campus Plant Info — Netlify Frontend (Supabase backend)

This is a **ready-to-deploy frontend** for your QR-based plant information system.

## How it works
- **Netlify** hosts these static files (index.html, plant.html, CSS, JS).
- **Supabase** (free Postgres DB) stores plant records and images.
- The site fetches plant data using Supabase's JS client.
- **Age** is calculated on the fly from `date_of_planting`.

## Steps (10–15 minutes)
1) Create a free project at https://supabase.com → get your **Project URL** and **Anon public key**.
2) In Supabase → create table `plants` with columns:
```
id (int8, primary key) 
common_name (text)
scientific_name (text)
date_of_planting (date)
max_height (text)
origin (text)
water_requirement (text)
seasonal_flowering (text)
medicinal_value (text)
quantitative_data (text)
image_url (text)
location (text)
```
3) Enable **RLS** and add a **SELECT policy** allowing anonymous read:
   - Table editor → `plants` → Policies → New Policy → Template: "Enable read access for all users" → Apply to `SELECT`.
   - (You can keep INSERT/UPDATE locked for safety; add later for an admin UI.)
4) Insert some rows (Table Editor → Insert row or Import CSV).
5) Open `config.js` and paste your **SUPABASE_URL** and **SUPABASE_ANON_KEY**.
6) Push this folder to a **GitHub** repo.
7) Go to **Netlify → New site from Git → Connect GitHub** → pick your repo → Deploy.
8) Your site goes live at `https://YOUR-SITE.netlify.app`.
9) Generate QR codes pointing to `https://YOUR-SITE.netlify.app/plant.html?id=1` etc.

## Bulk import (CSV)
Create a CSV with headers exactly matching the column names above. Import in Supabase Table Editor.

## Notes
- The anon key is safe for public **read-only** access when you keep RLS and policies strict.
- Images are loaded via `image_url` (host on Drive/Imgur/your server).

Good luck! 🌿
