# Implementation Plan

- [x] 1. Generate guides JSON
  - Create `scripts/build-guides.ts` to parse markdown front-matter from `guides/*.md` using `gray-matter` and output `src/data/api-guides.json`.
  - Add npm script `build:guides` and hook into `prebuild`.
  - _Requirements: 2.1, 2.2_

- [x] 2. Add dependencies
  - `pnpm add -D gray-matter`.
  - _Requirements: 2.1_

- [x] 3. Create `useApiGuides` hook
  - Fetch data from generated JSON and return typed array.
  - Write unit tests validating data shape.
  - _Requirements: 2.1_

- [x] 4. Build ApiExplorerTable component
  - Use shadcn/ui `Table` components to render columns.
  - Ensure responsive styles and dark mode.
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 5. Wire route `/api-explorer`
  - Add entry to React Router in `App.tsx`.
  - Render API Explorer page scaffold containing table.
  - _Requirements: 1.1_

- [x] 6. Add Implementation button navigation
  - Create `ApiImplementationPage` dynamic route.
  - Display markdown content via `react-markdown`.
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 7. Add PrivyProvider and Login button
  - Configure `PrivyProvider` with env var.
  - Place `LoginWithPrivyButton` beside "See All" button.
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 8. Update `.env.example`
  - Add `VITE_PRIVY_APP_ID` placeholder.
  - _Requirements: 5.1_

- [x] 9. Update Cloudflare Pages workflow
  - Inject secret ENV variable.
  - _Requirements: 5.2_

- [x] 10. Update `DEPLOYMENT_SECRETS.md`
  - Document Privy variable setup.
  - _Requirements: 5.3_

- [x] 11. QA & responsive tests
  - Verify table renders correctly across breakpoints.
  - Test navigation flows and Privy auth.
  - _Requirements: 1.2, 1.3_

- [x] 12. Code optimization & linting
  - Ensure ESLint/Prettier pass.
  - Optimize bundle size by code-splitting routes.
  - _Requirements: 2.2, 1.1_
