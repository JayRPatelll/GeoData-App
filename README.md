# frontend-app

A small React + TypeScript app (Vite) that loads recent earthquake CSV data from the USGS feed, visualizes it in a scatter chart, and shows a selectable table. Built with Vite, React Query, Recharts, TanStack Table, Tailwind, and Zustand.

## Quick start

Prerequisites
- Node.js 18+ (or a modern LTS)
- npm (or pnpm/yarn)

Install
```sh
npm install
```

Run dev server
```sh
npm run dev
```

Build
```sh
npm run build
```

Preview production build
```sh
npm run preview
```

(See scripts in [package.json](package.json))

## Project structure

- [index.html](index.html) — Vite entry
- [vite.config.ts](vite.config.ts) — Vite configuration
- [tsconfig.app.json](tsconfig.app.json), [tsconfig.node.json](tsconfig.node.json)
- src/
  - [main.tsx](src/main.tsx) — app bootstrap
  - [App.tsx](src/App.tsx) — top-level app (wraps QueryClientProvider)
  - pages/
    - [Homepage.tsx](src/pages/Homepage.tsx) and [HomePage.tsx](src/pages/HomePage.tsx) — page components (note: there are two similarly named files; see Known issues)
  - components/
    - [`ChartPanel`](src/components/ChartPanel.tsx) — scatter plot using Recharts
    - [`DataPanel`](src/components/DataPanel.tsx) — table using @tanstack/react-table
    - [`DropDown`](src/components/DropDown.tsx) — small select control
    - [`LoadingScreen`](src/components/LoadingScreen.tsx) — spinner
  - hooks/
    - [`useCsvData`](src/hooks/useFetchData.tsx) — fetch & parse CSV via PapaParse + React Query
  - store/
    - [`useDataStore`](src/store/datastore.tsx) and [`EarthquakeData`](src/store/datastore.tsx) — Zustand store & data type

## Data source

The app fetches CSV data from the USGS monthly feed:
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv

Parsing and filtering happens in [`useCsvData`](src/hooks/useFetchData.tsx).

## How it works (overview)

- [`useCsvData`](src/hooks/useFetchData.tsx) downloads and parses the CSV, filters to the last 30 days, sorts by time, and returns data via React Query.
- The Homepage passes the parsed data to:
  - [`ChartPanel`](src/components/ChartPanel.tsx) — renders an interactive scatter chart. Clicking points sets selection in the store.
  - [`DataPanel`](src/components/DataPanel.tsx) — renders a table and auto-scrolls to the selected row.
- Selection state and typed data model are in [`useDataStore`](src/store/datastore.tsx) (exported as default).

## Useful symbols

- [`useCsvData`](src/hooks/useFetchData.tsx) — CSV fetch hook
- [`useDataStore`](src/store/datastore.tsx) — Zustand store
- [`EarthquakeData`](src/store/datastore.tsx) — data interface
- [`ChartPanel`](src/components/ChartPanel.tsx)
- [`DataPanel`](src/components/DataPanel.tsx)
- [`DropDown`](src/components/DropDown.tsx)
- [`LoadingScreen`](src/components/LoadingScreen.tsx)
- [src/main.tsx](src/main.tsx)
- [src/App.tsx](src/App.tsx)
- [package.json](package.json)

## Styling

Tailwind is configured and used via the imported CSS in [src/index.css](src/index.css) and plugin entries in [vite.config.ts](vite.config.ts).

## Contributing

- Follow existing conventions (TypeScript + React).
- Run linter: `npm run lint`.
- Tests: none included currently.

## License

No license specified — add one to the repo root if required.