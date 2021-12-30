# Darkentity

This is my personal page [https://darkentity.net](https://darkentity.net) built using Angular & Cloudflare Pages' functions.

# Running project
### Only frontend
1. Clone this repo
2. `npm install`
3. `npm start`

### Full stack
1. Clone repo
2. `npm install`
3. `npx ng build`
   > Note: You can use `npm run build` but it won't work as you would like it to run
4. Create .env file with content:
   ```env
      SECURITY_TOKEN=WHATEVER_TBH_ONLY_LOCAL_USE
      API_URL=http://localhost:8788/api
   ```
5. `npx wrangler@beta pages dev ./dist/darkentity -k DB -b SECURITY_TOKEN=WHATEVER_TBH_ONLY_LOCAL_USE`
6. Deploy content to emulated KV database: `node scripts/build-and-publish-posts`
7. Go to `http://localhost:8788/` and ya got da page.

# License
All files inside `blog` directory are copyrighted ScuroGuardiano. All rights reserved.

Everything else is on AGPLv3 license :purple_heart: :blush:
