# Pre-commit Hook and Documentation Scraping Design

## Architecture Overview

The system consists of two main components: 1) a Git pre-commit hook that enforces code quality through ESLint and Prettier, and 2) a documentation scraping system that retrieves 1inch API documentation for offline use. Both components integrate with the existing project tooling and follow established conventions.

## Technical Approach

The pre-commit hook leverages husky for Git hook management and lint-staged for processing only staged files. ESLint is configured to automatically fix issues and remove unused variables, while Prettier ensures consistent code formatting. The documentation scraping uses Firecrawl MCP tools to retrieve content from the 1inch documentation portal and save it in markdown format.

## Component Design

### Pre-commit Hook Component

- **Purpose**: Automatically clean up and format code before each commit
- **Dependencies**: husky, lint-staged, ESLint, Prettier
- **Interface**: Git pre-commit hook that processes staged files

### Documentation Scraper Component

- **Purpose**: Retrieve and store 1inch API documentation for offline reference
- **Dependencies**: Firecrawl MCP tools
- **Interface**: Script that saves documentation files to the guides directory

## Data Flow

### Pre-commit Hook Flow

1. Developer stages files with `git add`
2. Developer runs `git commit`
3. Husky triggers the pre-commit hook
4. lint-staged identifies staged files
5. ESLint runs with autofix on staged files
6. Prettier formats staged files
7. If all processes succeed, commit proceeds; otherwise, it's blocked

### Documentation Scraping Flow

1. Firecrawl maps URLs from 1inch documentation portal
2. Firecrawl scrapes each URL as markdown
3. Firecrawl generates llms.txt files
4. Content is saved to the guides directory

## Technical Considerations

### Performance

- lint-staged ensures only staged files are processed, minimizing pre-commit time
- Firecrawl caching can be used to avoid re-scraping unchanged documentation

### Security

- No external dependencies are introduced beyond what's already in the project
- File operations are restricted to the project directory

### Maintainability

- Configuration follows existing project conventions
- Package manager fallback mechanism ensures compatibility across environments

### Scalability

- The pre-commit hook system can accommodate additional linting tools
- The documentation scraping can be extended to cover additional APIs

### Cross-platform Compatibility

- Fish shell syntax is used for all shell commands as per project requirements
- Package manager abstraction allows for pnpm/yarn flexibility
