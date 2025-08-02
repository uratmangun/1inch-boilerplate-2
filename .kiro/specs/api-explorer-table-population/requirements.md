# API Explorer Table Population Requirements

## Introduction

The API Explorer feature provides developers with an interactive overview of available 1inch API endpoints, enriched with Privy authentication and direct links to implementation examples. The table MUST be populated automatically from the markdown guides within `guides/`.

## Requirements

### Requirement 1: API Explorer Page

**User Story:** As a developer, I want to access a dedicated API Explorer page, so that I can view all available 1inch API endpoints and related information in one place.

#### Acceptance Criteria

1. WHEN a user navigates to `/api-explorer` THEN the system SHALL display a responsive table of 1inch API endpoints.
2. WHEN the viewport changes THEN the table SHALL remain readable and scrollable.
3. WHEN dark mode is active THEN the table SHALL conform to the application's dark theme colours.

### Requirement 2: Automated Data Population

**User Story:** As a developer, I want the table to be populated from existing guides, so that the information stays up-to-date without manual duplication.

#### Acceptance Criteria

1. WHEN the project is built THEN the system SHALL parse markdown files in `guides/` to generate table rows.
2. WHEN a guide file is updated THEN rebuilding SHALL reflect the changes in the API Explorer table.
3. WHEN no guide exists for an endpoint THEN the system SHALL omit that endpoint.

### Requirement 3: Implementation Links

**User Story:** As a developer, I want to click an implementation button in each row, so that I can see example code for that endpoint.

#### Acceptance Criteria

1. WHEN the implementation button is clicked THEN the system SHALL navigate to `/api-explorer/[slug]` showing the endpoint implementation page.
2. WHEN an implementation page is not yet created THEN the system SHALL display an informative placeholder.
3. WHEN the user presses back THEN they SHALL return to the API Explorer list state.

### Requirement 4: Privy Authentication Integration

**User Story:** As an end-user, I want to log in with Privy from the API Explorer, so that I can perform authenticated API calls.

#### Acceptance Criteria

1. WHEN the "Login with Privy" button is clicked THEN the Privy auth modal SHALL appear.
2. WHEN authentication succeeds THEN the user's address SHALL be available in application state.
3. WHEN the user is authenticated THEN the login button SHALL display the connected wallet address.

### Requirement 5: Deployment & Environment

**User Story:** As a maintainer, I want environment variables and CI/CD workflows updated, so that Privy works in all environments.

#### Acceptance Criteria

1. WHEN running locally THEN the `.env` file SHALL include `VITE_PRIVY_APP_ID`.
2. WHEN deploying to Cloudflare Pages THEN the workflow SHALL pass the Privy variable.
3. WHEN new contributors read `DEPLOYMENT_SECRETS.md` THEN they SHALL find instructions for setting Privy secrets.
