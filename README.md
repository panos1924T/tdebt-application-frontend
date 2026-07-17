# TDebt Application Frontend

The **TDebt Application Frontend** is the client-side web application for the TDebt platform.  
It provides users with a clean interface to create, manage, and monitor debts, repayments, and financial obligations in real time.

---

## Business Model Summary

**TDebt** is a debt-management platform designed to make debt tracking transparent, simple, and actionable.

### Problem
People, shared households, and small teams often manage debts informally (chat messages, notes, spreadsheets), which leads to confusion, disputes, and delayed repayments.

### Value Proposition
TDebt provides a single source of truth for debt records, repayment status, and history, reducing friction and improving trust between parties.

### Target Users
- Individuals managing personal debts
- Groups splitting costs (roommates, friends, trips)
- Small teams/businesses tracking lightweight receivables/payables

---

## Tech Stack

- **Angular CLI** `21.2.19`
- **TypeScript**
- **Node.js** (LTS recommended)
- **Vitest** (unit testing)

---

## Prerequisites

Install the following before running the app:

- [Node.js (LTS)](https://nodejs.org/)
- npm (bundled with Node.js)
- Git

Check installed versions:

```bash
node -v
npm -v
git --version
```

---

## Getting Started (from clone)

### 1) Clone repository

```bash
git clone https://github.com/panos1924T/tdebt-application-frontend.git
cd tdebt-application-frontend
```

### 2) Install dependencies

```bash
npm install
```

For CI or reproducible installs:

```bash
npm ci
```

### 3) Configure environment

Update Angular environment configuration files (typically under `src/environments/`) with the correct API base URL(s).

Common setup pattern:
- `environment.ts` → local development backend
- `environment.prod.ts` → production backend

If your project uses `.env` files, copy template values first:

```bash
cp .env.example .env
```

### 4) Start development server

```bash
ng serve
```

Or (if configured in `package.json`):

```bash
npm run start
```

Open: `http://localhost:4200/`

---

## Build

Create a production build:

```bash
ng build
```

Or:

```bash
npm run build
```

Build artifacts are generated in:

`dist/`

---

## Testing

### Unit tests

```bash
ng test
```

Or:

```bash
npm run test
```

### End-to-end tests

```bash
ng e2e
```

> Note: Angular CLI does not include an e2e framework by default.  
> Use your team’s configured framework (e.g., Cypress or Playwright).

---

## Frontend ↔ Backend Integration

The frontend is a presentation and interaction layer that depends on the TDebt backend APIs for business data and operations.

## Link of the backend: https://github.com/panos1924T/tdebt-application-backend

### How they connect

1. The frontend reads the backend base URL from environment configuration.
2. Angular services (e.g., `AuthService`, `DebtService`, etc.) send HTTP requests to backend endpoints.
3. The backend validates requests, executes business logic, and returns JSON responses.
4. The frontend updates UI state based on API responses (success, errors, loading states).

### Typical request flow

- User action in UI (create debt/transaction, fetch debts/transactions, login, register)
- Frontend service sends HTTP request (`HttpClient`)
- Backend API processes request
- Frontend receives response and renders updated data

### Authentication flow (typical)

- User logs in from frontend
- Backend returns an access token/session
- Frontend stores token securely 
- Token is attached to subsequent API requests (via HTTP interceptor)

### CORS and local development

For local development, ensure backend CORS allows requests from your frontend origin, usually:

- `http://localhost:4200`

If not configured, browser requests will fail before reaching your API logic.

### Minimal backend requirements for local run

- Backend server is running
- API base URL in frontend environment points to correct backend host/port
- Required auth/database services are available
- CORS is enabled for frontend origin

---

## Useful Angular Commands

Generate a component:

```bash
ng generate component component-name
```

List available schematics:

```bash
ng generate --help
```

---

## Suggested Development Workflow

1. Create a feature branch:
   ```bash
   git checkout -b feature/my-feature
   ```
2. Implement your changes
3. Run tests and build locally
4. Commit with a clear message:
   ```bash
   git commit -m "feat: add debt summary widget"
   ```
5. Push branch and open a Pull Request

---

## Troubleshooting

### Port 4200 already in use

```bash
ng serve --port 4300
```

### Dependency issues (clean reinstall)

```bash
rm -rf node_modules package-lock.json
npm install
```

### Angular CLI command not found

```bash
npx ng serve
```

### Backend connection errors (4xx/5xx/network)

- Verify backend is running
- Verify API URL in environment files
- Check browser DevTools Network tab
- Confirm CORS settings on backend

---

## Additional Resources

- Angular CLI docs: https://angular.dev/tools/cli
- Vitest docs: https://vitest.dev/
