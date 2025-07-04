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

Runs Vitest in watch mode (use `npm run test -- --coverage` for a coverage report).

### Run Accessibility

`````bash
npm run lint
```
Or:
```bash
npx eslint src
```
To fix:
````bash
npm run lint:fix
```

### Format Code

```bash
npm run format
`````

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
| Cart.jsx        | ✅ Yes            |
| Home.jsx        | ✅ Yes            |
| Product.jsx     | ✅ Yes            |
| api.js          | ✅ Yes            |
| cart.js         | ✅ Yes            |

#### Posible improvements in the future:

- `i18n` to handle languages
  - organize the text in `.json` so it can be divided by languages
- Animation library
