# T-Debt Frontend

Angular frontend for the T-Debt application.

It provides the user interface for authentication, debt management, transaction tracking, balance monitoring, filtering, and pagination. Business data is stored and processed by the separate T-Debt backend.

[Backend repository](https://github.com/panos1924T/tdebt-application-backend)

## Main features

- User registration and login.
- JWT-based authenticated requests.
- Create, view, update, archive, and delete debts.
- Add and correct debt transactions.
- View current balances and transaction history.
- Filter, sort, and paginate application data.
- Display loading, validation, and API error states.

## Tech stack

- Angular
- TypeScript
- HTML and CSS
- npm
- Vitest for unit testing

## Build and run locally

### 1. Prerequisites

Install:

- [Node.js LTS](https://nodejs.org/), which includes npm
- Git

Verify the installations:

```bash
node --version
npm --version
git --version
```

You do not need to install Angular CLI globally. The project uses its local Angular CLI through the npm scripts.

### 2. Clone the repository

```bash
git clone https://github.com/panos1924T/tdebt-application-frontend.git
cd tdebt-application-frontend
```

Run the remaining commands from the project root, where `package.json` is located.

### 3. Install dependencies

```bash
npm install
```

This creates the local `node_modules` directory. Do not commit that directory to Git.

For a clean, reproducible installation in CI or after a fresh clone, when `package-lock.json` is present, you can use:

```bash
npm ci
```

### 4. Configure the backend connection

The frontend needs the T-Debt backend API.

For local development:

1. Configure the frontend API base URL to point to the local backend, normally `http://localhost:8080`.
2. Start the backend and confirm that it runs successfully.
3. Ensure the backend allows the frontend origin `http://localhost:4200` through its CORS configuration.

The exact API URL must match the value used by the Angular services or environment configuration in this repository.

### 5. Start the development server

```bash
npm start
```

Open:

```text
http://localhost:4200
```

The development server watches the source files and reloads the application when you save changes. Stop it with `Ctrl+C`.

## Recommended local startup order

1. Start PostgreSQL.
2. Start the T-Debt backend on `http://localhost:8080`.
3. Start this frontend with `npm start`.
4. Open `http://localhost:4200` in the browser.

## Production build

Create an optimized production build:

```bash
npm run build
```

The generated files are written under `dist/`. The exact subdirectory depends on the Angular build configuration.

This command only creates the static frontend files. A web server or hosting platform must serve those files in production.

## Tests

Run the unit tests:

```bash
npm test
```

Run the production build as an additional verification before committing or deploying:

```bash
npm run build
```

## Frontend and backend communication

The frontend sends HTTP requests to the backend API for authentication and all application data.

Typical request flow:

1. The user performs an action in the Angular interface.
2. An Angular service sends an HTTP request to the backend.
3. The backend validates the request and returns JSON data or an error.
4. The frontend updates the displayed state.

After login, the frontend attaches the JWT access token to protected API requests. The backend remains responsible for authorization, ownership checks, business rules, and persistence.

## Useful commands

| Command | Purpose |
| --- | --- |
| `npm install` | Install or update dependencies |
| `npm ci` | Reinstall exactly from `package-lock.json` |
| `npm start` | Start the local development server |
| `npm test` | Run unit tests |
| `npm run build` | Create a production build |
| `npx ng generate component component-name` | Generate a new Angular component |

## Troubleshooting

### `npm` is not recognized

Install Node.js LTS, restart the terminal, and run `node --version` and `npm --version` again.

### Dependency installation fails

Confirm that your Node.js version is compatible with the Angular version declared in `package.json`. On a clean clone with `package-lock.json`, try:

```bash
npm ci
```

### Port 4200 is already in use

Start the frontend on another port:

```bash
npx ng serve --port 4300
```

Then update the backend CORS configuration to allow `http://localhost:4300`.

### Frontend cannot reach the backend

Check:

- The backend is running.
- The frontend uses the correct backend URL and port.
- The backend CORS configuration allows the frontend origin.
- The browser DevTools **Network** tab for the request URL, status code, and response.

### HTTP 401 or 403

- `401 Unauthorized`: the token is missing, invalid, or expired.
- `403 Forbidden`: the authenticated user does not have permission for the operation.

### Clean reinstall

Delete `node_modules` and run `npm ci` again. Keep `package-lock.json`, because it records the dependency versions used by the project.
