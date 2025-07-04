# Design decisions:
The file structure is organized to clearly separate, services, hooks, components for better maintainability and clarity
- The API layer is through a service module. `src/services/api.js` it centralizes requests and has environment variables (`VITE_API_BASE_URL` and `VITE_API_KEY`) so that the app can target different backends without code changes.
- Custom hooks for shared logic. Making the functionality more abstract.
	- `useProducts` Fetches data and filters duplicates because the API is returning repeated items.
	- I created `useIsMobile` to have cleaner code in `Cart.jsx`. The use is to have the desired responsive design.
	- `useCartCount` and `useCartSync` keep cart data synchronized across components by listening for a custom `cartUpdated` event, which is sent when items are added or removed.
- Debounced search input. In `Home.jsx` delays API calls to avoid excessive fetches when typing.
- The project uses `vitest` for testing, because it integrates well with Vite and offers faster performance compared to `jest`.
- ESLint is configured to catch errors early and have code consistency in the project.

---

## Prerequisites

- Node.js v16+
- npm

## Installation

```bash
# 1. Clone the repo
git clone https://github.com/ElDuartte/Reto-tecnico.git
cd Reto-tecnico

# 2. Install dependencies
npm install
```

### Before launching the app make sure you have `.env` in the root of the project
```
VITE_API_BASE_URL=__url__
VITE_API_KEY=__key__
```

## Available Scripts

Start Development Server

```bash
npm run dev
```

Starts Vite’s dev server at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Bundles your app into `dist/.`

### Preview Production Build

```bash
npm run preview
```

Locally serves the production build at `http://localhost:4173`

### Run Tests

```bash
npm run test
```
if you want to see the coverage
```bash
npm run test:coverage
```

Or: `npm run test --coverage`

### Run Accessibility

```bash
npm run lint
```
Or:
```bash
npx eslint src
```
To fix:
```bash
npm run lint:fix
```

### Format Code

```bash
npm run format
```

Auto-formats all files with Prettier.
(Optional) Check formatting without writing:

```bash
npm run format:check
```

#### Test

- I didn't test `main.jsx` because it's just responsible for bootstrapping the app relies on browser specific APIs.
- It's better to test `App.jsx` because is where the logic and routing is happening

#### Test coverage:

| File            | Covered by Tests? |
| --------------- | ----------------- |
| App.jsx         | ✅ Yes            |
| main.jsx        | ❌ No             |
| Navbar.jsx      | ✅ Yes            |
| ProductCard.jsx | ✅ Yes            |
| useCartCount.js | ✅ Yes            |
| useProducts.js  | ✅ Yes            |
| useCartSync.js  | ✅ Yes            |
| useIsMobile.js  | ✅ Yes            |
| Cart.jsx        | ✅ Yes            |
| Home.jsx        | ✅ Yes            |
| Product.jsx     | ✅ Yes            |
| api.js          | ✅ Yes            |
| cart.js         | ✅ Yes            |

#### Posible improvements in the future:

- `i18n` to handle languages
  - organize the text in `.json` so it can be divided by languages
- Animation library
