# 🌱 VESTA — Carbon Tracker (Frontend)

[![My skills](https://skillicons.dev/icons?i=git,js,vuejs,mysql)](https://skillicons.dev)

A mobile-first web app that lets users track and visualize their daily carbon footprint.

Project available here: https://sae401.mmi24c16.mmi-troyes.fr/. 

---

## Tech Stack

- **Vue 3** (Composition API) + **Vite**
- **Pinia** — state management
- **Vue Router** — routing with multilingual support (`/fr`, `/en`)
- **Vue I18n** — FR / EN internationalization
- **Chart.js** + **vue-chartjs** — data visualizations (Line, Doughnut, Bar, Pie)
- **SCSS** — styles with centralized design tokens

---

## Features

- Authentication (sign up / sign in)
- Activity logging across 3 categories: **Journey**, **Food**, **Shopping**
- Dashboard with stats, activity calendar and streak tracking
- Stats page with charts (pie, bar, line)
- Editable user profile
- Dynamic language switching

---

## Getting Started

```bash
npm install
npm run dev
```

> The backend API is expected at `http://localhost:8000` (configurable in `src/config/config.js`).

---

## Project Structure

```
src/
├── components/     # UI components (forms, layout, icons)
├── views/          # Pages (Dashboard, Stats, Profile, Auth…)
├── services/       # API (HttpClient, ActivityApi, AuthApi) + Pinia stores
├── i18n/           # FR / EN translations
├── config/         # App & activity config
└── assets/         # SCSS styles + JSON simulation data
```

---

## Configuration

| File | Purpose |
|---|---|
| `src/config/config.js` | API base URL |
| `src/config/activity.js` | Form categories and steps |

## Tests

| File | Purpose |
|---|---|
| `src/assets/json-simulation-api/` | Mock data for stats |