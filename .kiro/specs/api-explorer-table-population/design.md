# API Explorer Table Population Design

## Architecture Overview

The feature extends the React/TypeScript/shadcn/ui stack. Data is sourced at **build time** via Vite's `import.meta.glob` to collect markdown front-matter from files in `guides/`. The parsed data is provided by a custom hook `useApiGuides()` and consumed by the `ApiExplorerPage` table component.

```
Guides (.md) ──▶ build-time glob/gray-matter ──▶ apiGuides.ts (static JSON)
                                           ▲
                                           │
                              Vite HMR ----┘
```

## Technical Approach

1. **Build-time Loader**: A script `scripts/build-guides.ts` runs via `pnpm build:guides` pre-build, using `gray-matter` to parse front-matter (title, description, docsLink) and write `src/data/api-guides.json`.
2. **Custom Hook**: `useApiGuides()` fetches this JSON and returns typed data.
3. **Table Component**: `ApiExplorerTable` renders rows with columns: Endpoint, Description, LLMs.txt, Implementation.
4. **Routing**: React Router dynamic route `/api-explorer/:slug` shows `ApiImplementationPage`.
5. **Privy Auth**: `PrivyProvider` wraps the app; `LoginWithPrivyButton` dispatches authentication events.

## Component Design

### build-guides.ts

- **Purpose**: Parse guide markdown and emit JSON.
- **Dependencies**: `fs`, `path`, `gray-matter`.
- **Interface**: CLI script, no runtime import.

### useApiGuides

- **Purpose**: Return array of `ApiGuide` objects.
- **Dependencies**: `api-guides.json` (generated).
- **Interface**: `const { guides } = useApiGuides()`.

### ApiExplorerTable

- **Purpose**: Render data in a `Table` with shadcn/ui cells.
- **Dependencies**: `useApiGuides`, `react-router-dom`.
- **Interface**: `<ApiExplorerTable />`.

### ApiImplementationPage

- **Purpose**: Show example usage per endpoint.
- **Dependencies**: slug param, markdown renderer.

## Data Flow

1. During `pnpm build`, `build-guides.ts` creates `api-guides.json` from markdown front-matter.
2. Application imports JSON; Vite bundles it.
3. `ApiExplorerTable` calls `useApiGuides()` to get array.
4. Clicking Implementation navigates to slug route; page loads markdown via `import()`.

## Technical Considerations

- **Performance**: Pre-build JSON avoids runtime filesystem access.
- **Scalability**: Adding a guide file auto-adds row after rebuild.
- **Accessibility**: Table uses semantic `<table>` elements and keyboard-navigable buttons.
- **Security**: Privy authentication tokens stored securely; environment variables managed via Cloudflare secrets.
- **Maintainability**: Typed interfaces (`ApiGuide`) ensure compile-time safety.
