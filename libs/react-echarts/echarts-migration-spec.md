# ECharts Migration Specification to React Library

This document outlines a phased approach to migrate the line chart functionality from the existing Angular-based echarts library (@[/Users/eddie/iabg/holmes/libs/echarts]) to a new React library in the NX workspace at @[/Users/eddie/eddie/eddie-workspace]. The migration focuses on React 19.2 and includes setting up Storybook, Jest tests, and ensuring lint compliance. Steps are based on modern NX and React best practices. Note: CI/CD integration is deferred and can be added in a future phase if needed.

## Step 1: Pre-Migration Audit

- Review the original echarts library for dependencies, data schemas, and custom logic using commands like `nx dep-graph` to visualize and document dependencies.
- Identify key files (e.g., line-chart.ts) and ensure all necessary elements are captured. Document potential risks, such as dependency conflicts or UI inconsistencies, to plan mitigations.

## Step 2: Scaffold a React Library using NX

- Use the command: `npx nx generate @nx/react:lib react-echarts --reactVersion=19.2.0` to create a new React library.
- Configure with TypeScript strict mode and initial lint settings for better code quality from the start.

## Step 3: Migrate Line Chart from ECharts Library

- **Phased Approach**: Focus on line chart migration initially. Provide examples of adapting Angular code to React, such as using hooks for state and rendering.
- Source Files: Reference specific files like `/Users/eddie/iabg/holmes/libs/echarts/src/lib/service/line/line-chart.ts`.
- Migration Steps:
  - Create a React component (e.g., `LineChart.tsx`) and port logic, handling data schemas and dependencies (e.g., install 'echarts-for-react' or consider D3.js).
  - Address challenges like state management differences with a rollback plan for errors.

## Step 4: Set Up Storybook v10 for the Library

- Use the command: `npx nx generate @storybook/react:storybook-configuration react-echarts --builder=vite --version=10.0.0`.
- Develop sample stories for the line chart to test interactions and visualize components.

## Step 5: Generate Unit Tests and Performance Checks with Vitest

- Use Vitest for testing due to its Vite-based speed and compatibility with React. Run `pnpm add -D vitest @nx/vite` if not installed.
- Add Vitest configuration with `npx nx generate @nx/vite:vitest react-echarts`.
- Create tests using Vitest and React Testing Library, including performance profiling and edge case handling. Add a script to root `package.json`: `"test-affected": "nx affected:test"` for efficient testing of changes.

## Step 6: Ensure No Lint Errors

- Run `nx run react-echarts:lint` and configure ESLint for React. Fix issues promptly to maintain code standards.

## Step 7: Post-Migration Documentation and Verification

- Generate React-specific docs and verify the migration through comparative testing. Plan for expanding to other chart types in future phases.

This enhanced plan reduces risks and improves scalability, with Vitest providing faster test execution for React components.
