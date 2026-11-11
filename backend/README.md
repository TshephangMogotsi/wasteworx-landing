# WasteWorx backend

Cloudflare Workers backend managed with the project-local Wrangler CLI. The
landing page remains deployed on Vercel; this directory is excluded from its uploads.

## Setup

```sh
cd backend
npm ci
npm run login
npm run account
```

This machine already has a working Cloudflare OAuth login. The intended account
is pinned in `wrangler.jsonc` (`cc5478b1de8b768af15c435ab4fffd42`).
On another machine, approve the OAuth request in your browser and verify the
account with `npm run account`. Do not paste credentials into chat or commit them.

## Work locally

```sh
npm run dev
```

Health endpoint: `http://localhost:8787/api/health`.

## Verify, deploy, and view logs

```sh
npm run check
npm run deploy
npm run logs
```

Deploy publishes `wasteworx-api` to the selected Cloudflare account. No backend
has been deployed merely by installing this scaffold. Database, storage, and
application authentication can be added when the first backend feature is defined.

For local application secrets, create an ignored `.dev.vars` file. Set production
secrets using `npx wrangler secret put NAME` from this directory. Wrangler account
login authorizes developer tooling; it does not add end-user login to the app.
