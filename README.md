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

Results come from Google's **Programmable Search Element** (`src/search/googleElement.tsx`), which
needs no API key. Browse uses engine `61de32450a25e4731` unless `VITE_GOOGLE_CSE_ID` names another.
Browse draws the results in its own style, hides any that lead to AI chat products, and links every
search to Google's web-only results page (`udm=14`, no AI Overview).

In the Programmable Search control panel (programmablesearchengine.google.com):

- Under **Sites to search**, list the sites the engine covers. Engines made since January 2026 can
  list up to 50 sites; older engines may still have **Search the entire web**, until 1 January 2027.
- Turn **Image search** on for the Images tab, and set **SafeSearch** as you like (Browse can
  turn it on per search).

**The Custom Search JSON API** (the `browse-search` edge function) is the other way in. Google has
closed it to new customers and ends it on 1 January 2027. If you already have a key: in Supabase >
Edge Functions > Secrets, add `GOOGLE_SEARCH_KEY` and `GOOGLE_SEARCH_CX`, then build with
`VITE_GOOGLE_CSE_ID` set empty. The key never reaches the browser, and each address is limited to
300 searches an hour.

## ELUM Docs

`/docs` is ELUM's starting page, and `/docs/write`, `/docs/type`, `/docs/make`, `/docs/browse` and
`/docs/account` start you off with each app. The words are in `src/docs/content.ts`.

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
