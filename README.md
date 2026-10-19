# ELUM Browse

Search the web from the ELUM family. Results come from Google, without AI answers: no AI
Overviews, no Gemini, and results that lead to AI chat products are left out. Built by people.
Runs without AI.

Browse is one of the ELUM apps (with Write, Type, Make and ELUM Account). Every ELUM app shares
one Supabase project and one account. Searching needs no account; signing in adds the bell, the
account menu and sign-in approvals.

## What Browse does

- **Web and image results** from Google's Programmable Search (the Custom Search JSON API). That
  API returns plain results: there is no AI Overview or AI Mode in it to remove.
- **No AI products.** `supabase/functions/_shared/search.ts` leaves out results on Gemini, AI
  Studio, NotebookLM and Google Labs, and Google's AI Mode links. Browse says how many it left out.
  Add more hosts with the `BROWSE_BLOCKED_HOSTS` secret.
- **"See this search on Google"** links to Google with `udm=14`, Google's web-only results, so even
  Google's own page has no AI Overview.
- **Private.** ELUM does not store searches. Recent searches stay in this browser, and can be
  paused or cleared. Pages are served with `Referrer-Policy: no-referrer`.
- **SafeSearch** on unless turned off; **Images** tab; **More results** paging (Google allows the
  first 100); spelling suggestions; `/` jumps to the search box.
- **Add to your browser:** `/opensearch.xml` lets Chrome, Firefox and Edge use ELUM Browse as a
  search engine (`/search?q=…`).

## Connect Google search

Browse works before this step: it then offers Google's web-only results page for each search.

1. In the Google Cloud console, create (or pick) a project and enable the **Custom Search API**.
   Create an **API key** and restrict it to that API.
2. At programmablesearchengine.google.com, create a search engine set to **Search the entire web**,
   and copy its **Search engine ID**.
3. In Supabase > Edge Functions > Secrets, add `GOOGLE_SEARCH_KEY` (the key) and
   `GOOGLE_SEARCH_CX` (the engine ID).

The key never reaches the browser: the `browse-search` edge function calls Google. Google gives
100 searches a day free and charges beyond that; the function also limits each address to 300
searches an hour.

## Run it

```sh
npm install
cp .env.example .env.local   # then fill in VITE_SUPABASE_ANON_KEY
npm run dev                  # http://localhost:5177
npm test
npm run typecheck
npm run build
```

## Deploy

**Website (Netlify).** Create a site from this repository (suggested name `elumbrowse`), and set
`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for all deploy contexts. `netlify.toml` has the
build, the single-page routing (so `/search?q=…` links and refreshes work) and the privacy headers.
Set `VITE_ELUM_BROWSE_URL` if Browse lives somewhere other than https://elumbrowse.netlify.app.

**Search function (Supabase).** `supabase/functions/browse-search`, deployed with JWT
verification off (searching needs no account):

```sh
supabase functions deploy browse-search --no-verify-jwt
```

## What's new

`src/whatsnew/releases.ts` lists what changed, newest first. When an update ships, add a release at
the top with a new id: everyone gets a short animated tour of it the next time they open Browse.
