# EddieWorkspace - React Portfolio

This repository showcases my expertise in modern web development through the migration of four Angular libraries to React. As a full-stack developer specializing in frontend technologies, I've demonstrated proficiency in component migration, state management, and cross-framework compatibility.

## 🎯 Project Overview

This Nx monorepo contains four React libraries that were originally implemented in Angular. Each library represents a complete migration effort, including:

- **Component Architecture**: Converting Angular components to React functional components with hooks
- **Type Safety**: Maintaining TypeScript strict mode throughout the migration
- **Testing**: Comprehensive unit tests using Vitest and React Testing Library
- **Documentation**: Interactive Storybook stories for component demonstration
- **Build System**: Nx-based build and development workflows

## 📚 Libraries

### 1. React ECharts Library (`react-echarts`)
A React wrapper for ECharts focusing on data visualization components.

**Key Features:**

- Line chart components with customizable themes
- React integration with ECharts ecosystem
- TypeScript support for chart configurations
- Responsive design patterns

**Original:** Angular-based ECharts library from a previous internal project
**Migration Focus:** Line chart functionality with React hooks

### 2. React Code Editor (`react-code-editor`)
A powerful CodeMirror-based code editor specialized for Python development.

**Key Features:**

- Python syntax highlighting and editing
- Code execution capabilities with output management
- Light/dark theme support
- Toolbar with run and info buttons
- Library information display

**Original:** Angular Code Editor from a previous internal IDE project
**Migration Focus:** Complete editor functionality with React state management

### 3. React Graphics Editor (`react-graphics-editor`)
A vector graphics editor built with Paper.js for canvas-based drawing.

*Note: This library is currently in development and not yet fully implemented.*

**Key Features:**

- Shape creation and manipulation
- Drag-and-drop file support (SVG, images)
- Property panel for styling controls
- Command pattern for undo/redo operations
- Selection and transformation tools

**Original:** Angular Graphics Editor component
**Migration Focus:** Canvas interactions and Paper.js integration

### 4. React Media Player (`react-media-player`)
A comprehensive media player supporting multiple streaming formats.

**Key Features:**

- DASH, HLS, and MP4 playback
- DRM support (Widevine, PlayReady, FairPlay)
- Streaming statistics and monitoring
- Internationalization (i18n) support
- Error boundaries and fallback handling

**Original:** Angular Media Player library
**Migration Focus:** Shaka Player integration with React lifecycle

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm package manager
- Nx CLI

### Installation

```bash
pnpm install
```

### Development

#### Running Storybooks
Each library includes interactive Storybook stories for component demonstration:

```bash
# React ECharts
pnpm run storybook:react-echarts

# React Code Editor
pnpm run storybook:react-code-editor

# React Graphics Editor
pnpm run storybook:react-graphics-editor

# React Media Player
pnpm run storybook:react-media-player
```

#### Running Tests
All libraries include comprehensive test suites:

```bash
# Run all tests
pnpm test

# Run specific library tests
pnpm run test:react-echarts
pnpm run test:react-code-editor
pnpm run test:react-graphics-editor
pnpm run test:react-media-player

# Run affected tests (for development)
pnpm run test:affected
```

#### Code Quality

```bash
# Lint all libraries
pnpm run lint

# Lint specific library
pnpm run lint:react-echarts
```

## 🛠️ Technical Stack

- **Framework:** React 19 with TypeScript
- **Build System:** Nx 22 with Vite
- **Testing:** Vitest + React Testing Library
- **Documentation:** Storybook 10
- **Linting:** ESLint with React rules
- **Package Manager:** pnpm

## 🏗️ Technology Choices

This project demonstrates strategic technology selection for modern React development:

### Package Management: pnpm over npm

- **Performance**: pnpm's efficient disk usage and faster installs (up to 3x faster than npm)
- **Disk Efficiency**: Single instance of packages in global store, saving ~60-80% disk space
- **Monorepo Optimization**: Better handling of workspace dependencies in Nx monorepos
- **Strictness**: Prevents accidental installation of non-declared dependencies

### Testing: Vitest over Jest

- **Performance**: Native ESM support and faster test execution (2-3x faster than Jest)
- **Developer Experience**: Built-in TypeScript support without additional configuration
- **Modern Architecture**: Uses Vite's fast bundling for test environment
- **Compatibility**: Drop-in replacement for Jest with similar API but better performance

### Build Tool: Vite over Webpack

- **Speed**: Near-instant hot module replacement and fast cold starts
- **Modern Standards**: Native ESM support and optimized for modern browsers
- **Simplicity**: Zero-config setup with sensible defaults for React projects
- **Nx Integration**: Excellent support within Nx workspace for library builds

### Framework: React 19 with TypeScript

- **Latest Features**: Access to React 19's compiler optimizations and new features
- **Type Safety**: Full TypeScript integration ensuring runtime reliability
- **Ecosystem Maturity**: Comprehensive tooling and community support
- **Future-Proofing**: Staying current with React's evolution

### Development Workflow: Nx Monorepo

- **Scalability**: Efficiently manage multiple related libraries in one workspace
- **Caching**: Smart caching of build and test results for faster CI/CD
- **Code Generation**: Automated scaffolding for consistent project structure
- **Dependency Management**: Clear boundaries between libraries with proper dependency graphs

## 📈 Migration Approach

Each library migration followed a systematic approach:

1. **Analysis Phase**: Review original Angular implementation and dependencies
2. **Scaffolding**: Generate React library with Nx generators
3. **Component Migration**: Convert Angular components to React with hooks
4. **Testing Setup**: Implement Vitest with React Testing Library
5. **Storybook Integration**: Create interactive component stories
6. **Quality Assurance**: ESLint compliance and comprehensive testing

## 🔐 Security and Confidentiality

This repository contains no company secrets or proprietary code. It includes:

- No internal credentials, tokens, or API keys
- No confidential business logic or trade secrets
- Only code authored by me or derived from publicly available/open-source examples

If you spot anything that appears sensitive, please open an issue and I will remediate immediately.

## 📞 Contact

This portfolio demonstrates my ability to:
- Migrate complex frontend applications between frameworks
- Maintain code quality and type safety
- Implement modern React patterns and best practices
- Work with enterprise-scale build systems and tooling

For job opportunities or collaborations, please reach out!
