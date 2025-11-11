# React Code Editor Migration Plan

## Overview

This document outlines the migration plan for converting the Angular-based Holmes Code Editor library to a React library within the Nx workspace. The Angular library is a powerful CodeMirror-based Python code editor with syntax highlighting, execution capabilities, and output management.

## Source Analysis

### Current Angular Library Features

- **CodeMirror Integration**: Python syntax highlighting and editing
- **Theme Support**: Light/dark themes with custom styling
- **Execution Capabilities**: Server-side Python code execution
- **Output Management**: stdout/stderr panels with execution timing
- **Library Information**: Display of available Python modules
- **Toolbar**: Run button and info button with FontAwesome icons
- **Accessibility**: ARIA labels and keyboard navigation

### Key Components

- `CodeEditorComponent`: Main editor component using CodeMirror
- `LibraryInfoComponent`: Displays available Python libraries
- Custom themes and syntax highlighting
- Execution state management and output handling

### Dependencies

- `@codemirror/state`, `@codemirror/view`, `@codemirror/lang-python`
- `@fortawesome/angular-fontawesome`
- Custom theme definitions

## Migration Plan

### Phase 1: Library Setup & Dependencies ✅ **COMPLETE**

#### 1.1 Scaffold React Library ✅ **COMPLETE**

- Generate `react-code-editor` library using Nx ✅ **DONE**
- Configure TypeScript strict mode ✅ **DONE**
- Set up Vitest for testing ✅ **DONE**
- Configure ESLint rules ✅ **DONE**

#### 1.2 Dependency Analysis & Installation

- Identify React equivalents for Angular dependencies
- Install CodeMirror React packages:
  - `@codemirror/state`
  - `@codemirror/view`
  - `@codemirror/lang-python`
  - `@codemirror/language`
  - `@codemirror/commands`
  - `@codemirror/highlight`
  - `@uiw/react-codemirror` (React wrapper)
- Install icon library: `react-icons` or `@fortawesome/react-fontawesome`
- Install theming utilities

#### 1.3 Project Configuration ✅ **COMPLETE**

- Update `tsconfig.base.json` with proper paths
- Configure Storybook for component documentation
- Add npm scripts to root `package.json` ✅ **DONE**

### Phase 2: Core Editor Component Migration (Weeks 2-3)

#### 2.1 Basic Editor Setup ✅ **COMPLETE**

- Create `CodeEditor` React component ✅ **DONE**
- Implement CodeMirror integration using `@uiw/react-codemirror` ✅ **DONE**
- Set up basic Python syntax highlighting ✅ **DONE**
- Add editor state management with React hooks ✅ **DONE**

#### 2.2 Props & API Design ✅ **COMPLETE**

Convert Angular inputs/outputs to React props/callbacks:

```typescript
interface CodeEditorProps {
  initialCode?: string;
  theme?: 'light' | 'dark';
  enableRunButton?: boolean;
  onCodeChange?: (code: string) => void;
  onRun?: (code: string) => void;
  // Execution state props
  endExecution?: boolean | null;
  appendStdout?: string | null;
  appendStderr?: string | null;
}
```

#### 2.3 Toolbar Implementation ✅ **COMPLETE**

- Create run button with icon ✅ **DONE**
- Add library info button ✅ **DONE**
- Implement toolbar styling ✅ **DONE**
- Add click handlers and accessibility ✅ **DONE**

#### 2.4 Output Panels ✅ **COMPLETE**

- Implement stdout/stderr panels ✅ **DONE**
- Add execution timing display ✅ **DONE**
- Handle output state management ✅ **DONE**
- Style output containers ✅ **DONE**

### Phase 3: Advanced Features & Execution (Week 4)

#### 3.1 Execution State Management ✅ **COMPLETE**

- Implement execution start/end timing ✅ **DONE**
- Handle stdout/stderr appending ✅ **DONE**
- Add execution success/error states ✅ **DONE**
- Manage execution lifecycle ✅ **DONE**

#### 3.2 Library Information Component ✅ **COMPLETE**

- Create `LibraryInfo` React component ✅ **DONE**
- Display available Python modules ✅ **DONE**
- Implement popup/modal behavior ✅ **DONE**
- Add library version information ✅ **DONE**

#### 3.3 Theme System

- Convert Angular theme objects to React theme definitions
- Implement light/dark theme switching
- Add custom theme support
- Ensure theme persistence

#### 3.4 Keyboard Shortcuts & Advanced Editing

- Implement custom keybindings (comment, indent, fold)
- Add code folding functionality
- Support advanced editing features
- Maintain keyboard accessibility

### Phase 4: Testing, Documentation & Polish (Week 5)

#### 4.1 Comprehensive Testing ✅ **CORE COMPLETE - MOCKING NEEDED**

- Unit tests for component rendering ✅ **DONE**
- Theme switching tests ✅ **DONE**
- Execution state tests ✅ **DONE**
- Keyboard shortcut tests ⏳ **PENDING**
- Accessibility tests ⏳ **PENDING**
- **CodeMirror mocking required for full test suite** 🔄 **IN PROGRESS**

#### 4.2 Storybook Documentation

- Create stories for different themes
- Document execution states
- Add interaction examples
- Include accessibility documentation

#### 4.3 Performance Optimization

- Implement React.memo for performance
- Optimize re-renders
- Add proper cleanup in useEffect
- Bundle size optimization

#### 4.4 Accessibility & Polish

- WCAG 2.1 AA compliance
- Screen reader support
- Keyboard navigation
- Error boundaries
- Loading states

## Technical Challenges & Solutions

### CodeMirror Integration

**Challenge**: Converting Angular CodeMirror setup to React
**Solution**: Use `@uiw/react-codemirror` wrapper with custom extensions

### State Management

**Challenge**: Converting Angular signals to React state
**Solution**: Use `useState`, `useEffect`, and `useCallback` hooks

### Execution Lifecycle

**Challenge**: Managing complex execution states and timing
**Solution**: Custom hooks for execution management

### Theme System

**Challenge**: Converting Angular theme objects to React
**Solution**: TypeScript interfaces with theme objects

## Success Metrics

### Functional Parity (100%)

- ✅ Python code editing with syntax highlighting
- ✅ Light/dark theme support
- ✅ Code execution with timing
- ✅ stdout/stderr output management
- ✅ Library information display
- ✅ Keyboard shortcuts and folding
- ✅ Accessibility compliance

### Code Quality (100%)

- ✅ TypeScript strict mode
- ✅ ESLint compliance
- ✅ Comprehensive test coverage
- ✅ Storybook documentation
- ✅ Performance optimized

### Developer Experience (100%)

- ✅ Clear API and prop interface
- ✅ TypeScript definitions
- ✅ Storybook stories
- ✅ Migration documentation
- ✅ Example usage guides

## Timeline & Milestones

| Phase | Duration | Deliverables | Status |
|-------|----------|--------------|--------|
| **Phase 1** | Week 1 | Library setup, dependencies, configuration | ✅ **COMPLETE** |
| **Phase 2** | Weeks 2-3 | Core editor, props API, toolbar, output panels | ✅ **COMPLETE** |
| **Phase 3** | Week 4 | Execution management, library info, themes, keyboard | 🔄 **IN PROGRESS (75%)** |
| **Phase 4** | Week 5 | Testing, documentation, optimization, accessibility | 🔄 **IN PROGRESS (25%)** |

## Risk Mitigation

### Technical Risks

- **CodeMirror React Integration**: Use established `@uiw/react-codemirror` package
- **Theme Compatibility**: Test thoroughly with both light/dark themes
- **Execution State Complexity**: Implement step-by-step with comprehensive testing

### Timeline Risks

- **Complex State Management**: Allocate extra time for execution lifecycle
- **Testing Coverage**: Plan for comprehensive test suite from start
- **Accessibility Requirements**: Include accessibility testing throughout

## Dependencies & Environment

### Required Packages

```json
{
  "@codemirror/state": "^6.4.1",
  "@codemirror/view": "^6.28.1",
  "@codemirror/lang-python": "^6.1.6",
  "@codemirror/language": "^6.10.2",
  "@codemirror/commands": "^6.6.0",
  "@codemirror/highlight": "^0.19.8",
  "@uiw/react-codemirror": "^4.21.25",
  "react-icons": "^5.2.1",
  "@types/react": "^19.0.0",
  "@types/react-dom": "^19.0.0"
}
```

### Development Environment

- Node.js 18+
- React 19+
- Nx 22+
- TypeScript 5.9+
- Vitest for testing
- Storybook for documentation

## Migration Validation

### Feature Testing Checklist

- [ ] Python syntax highlighting works
- [ ] Light/dark theme switching
- [ ] Code execution triggers properly
- [ ] stdout/stderr display correctly
- [ ] Execution timing shows
- [ ] Library info popup works
- [ ] Keyboard shortcuts function
- [ ] Code folding works
- [ ] Accessibility compliance

### Quality Assurance

- [ ] All TypeScript errors resolved
- [ ] ESLint passes with no warnings
- [ ] Test coverage > 80%
- [ ] Storybook stories complete
- [ ] Performance benchmarks met
- [ ] Bundle size optimized

## Conclusion

This migration plan provides a comprehensive roadmap for converting the Angular Code Editor to React while maintaining all functionality and improving the developer experience. The phased approach ensures quality and minimizes risks.
