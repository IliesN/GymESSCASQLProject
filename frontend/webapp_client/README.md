# APEX Gym — Web Client

This repository contains the frontend web client for the APEX Gym project. It's built with Vue 3 and Vite and includes a landing page and a simple (mock-data) staff management dashboard.

## Features
- Landing page (marketing) with hero, features, pricing and CTA.
- Temporary staff login and management dashboard (mocked data).
- Uses Tailwind-style utility classes; project includes Tailwind in devDependencies.

## Temporary staff login
- Username: `admin`
- Password: `root`

This is a temporary, client-side-only auth for development/demo purposes. Do NOT use this in production.

## Quick start
You'll need Node.js (recommended 20.x or later) and npm.

1. Install dependencies

```cmd
cd /d d:\projetgym\Gym_Project\frontend\webapp_client
npm install
```

2. Start development server

```cmd
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173).

3. Build for production

```cmd
npm run build
npm run preview
```

## Notable files
- `src/components/Landing.vue` — landing page UI
- `src/components/Login.vue` — temporary login page (admin/root)
- `src/components/AdminDashboard.vue` — management dashboard (mock data)
- `src/index.css` — global CSS + Tailwind directives
- `postcss.config.cjs`, `tailwind.config.cjs` — build config

## Dependencies
The client uses the following packages (from `package.json`):

- runtime
  - `vue` ^3.5
  - `lucide-vue-next` (icons)

- dev
  - `vite`
  - `@vitejs/plugin-vue`
  - `tailwindcss` (dev)
  - `postcss`
  - `autoprefixer`
  - `vite-plugin-vue-devtools`

If you encounter errors related to PostCSS/Tailwind (there was a known message about `@tailwindcss/postcss`), the current repo contains a working `postcss.config.cjs` and `tailwind.config.cjs`. If you prefer not to run Tailwind build-time processing, you can remove the `@tailwind` directives from `src/index.css` and use the Tailwind CDN for development.

## Development notes
- The staff dashboard uses mock data inside the component for now.
- Authentication is implemented client-side only (localStorage flag). Replace with backend auth for production.
- Consider adding `vue-router` and proper route guards if you'll expand the app.

## License & authors
This project is part of a school/team project. See repository owner for license and attribution.
# webapp_client

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
