# Implementation Plan

- [x] 1. Install React Router Dependencies
  - Install react-router-dom package using pnpm
  - Verify compatibility with existing project dependencies
  - Update package.json with routing dependencies
  - _Requirements: 2.1, 2.2_

- [x] 2. Create HomePage Component
  - Extract existing homepage content from App.tsx into separate HomePage component
  - Implement proper imports for shadcn/ui components and Lucide React icons
  - Add React Router Link import for navigation functionality
  - Maintain all existing homepage features and styling
  - _Requirements: 2.2, 5.2_

- [x] 3. Add Check Balance Navigation Button
  - Insert "Check Balance" button below the project description paragraph
  - Implement green-to-blue gradient styling consistent with DeFi theme
  - Add wallet icon using Lucide React icon library
  - Configure React Router Link to navigate to "/balance" route
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 4. Implement Routing Structure in App Component
  - Import React Router components (BrowserRouter, Routes, Route)
  - Wrap application in Router context while maintaining ThemeProvider and StagewiseToolbar
  - Configure route definitions for "/" (HomePage) and "/balance" (BalancePage)
  - Remove unused imports and clean up App.tsx structure
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 5. Create BalancePage Component Structure
  - Create new BalancePage.tsx component file in src/components directory
  - Implement basic component structure with proper imports
  - Add React Router Link for back navigation to homepage
  - Set up component state management using React hooks
  - _Requirements: 3.1, 5.1_

- [x] 6. Implement Total Portfolio Value Display
  - Create total portfolio value card with aggregated balance calculation
  - Add refresh button with loading state functionality
  - Implement gradient styling consistent with existing design system
  - Display portfolio value with proper currency formatting
  - _Requirements: 3.1, 4.1_

- [x] 7. Build Individual Token Balance Cards
  - Create token balance cards for ETH, USDC, 1INCH, and DAI
  - Display current amounts, USD values, and percentage changes
  - Implement color-coded positive/negative change indicators
  - Add trend arrows (up/down) for visual change representation
  - _Requirements: 3.2, 3.3, 4.2_

- [x] 8. Implement Interactive Refresh Functionality
  - Add refresh button click handler with loading state management
  - Simulate API call delay using setTimeout
  - Generate random balance fluctuations for realistic updates
  - Update balance state with new values and trend calculations
  - _Requirements: 3.4, 4.1, 4.2_

- [x] 9. Create Mock Transaction History Section
  - Build transaction history card with recent activities display
  - Include mock transactions: swaps, liquidity additions, reward claims
  - Format transaction data with proper timestamps and amounts
  - Style transaction items with consistent design patterns
  - _Requirements: 4.3, 4.4_

- [x] 10. Implement Navigation and UX Features
  - Add "Back to Home" button with proper React Router navigation
  - Ensure responsive design across all screen sizes
  - Verify dark mode support throughout all balance page components
  - Test navigation flow between homepage and balance checker
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 11. Quality Assurance and Testing
  - Test all navigation paths and button interactions
  - Verify responsive design on different screen sizes
  - Confirm dark mode functionality across all components
  - Validate proper loading states and error handling
  - _Requirements: 2.4, 5.3, 5.4_

- [x] 12. Code Cleanup and Optimization
  - Remove unused imports from all component files
  - Optimize component structure and eliminate redundant code
  - Ensure TypeScript compatibility and proper type definitions
  - Verify consistent code formatting and style guidelines
  - _Requirements: 2.4, 5.2_
