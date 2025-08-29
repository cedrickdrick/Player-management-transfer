# Player Transfer System — React + Vite + Tailwind (No Next.js)

This is a cleaned, Next-free version of your app. It uses **React + Vite + TailwindCSS** only.

## Quick start

```bash
pnpm i   # or npm i / yarn
pnpm dev # or npm run dev / yarn dev
```

Visit http://localhost:3000
```

## Notes
- I removed all Next.js files and scripts.
- Routing uses `react-router-dom` and lives in `src/App.jsx`.
- Tailwind is already configured in `index.html`, `postcss.config.js`, and `tailwind.config.js`.
- Firebase config reads from **Vite env variables** (see `.env.example`).

## Environment Variables
Create a `.env` file in the project root:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```
