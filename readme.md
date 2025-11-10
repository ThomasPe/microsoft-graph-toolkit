<h1 align="center">
  <a href="#"><img height="120" src="https://github.com/microsoftgraph/microsoft-graph-toolkit/raw/main/assets/graff.png" title="Graff the Giraffe"></a>
  <br>
  Graph Toolkit React
</h1>

<h4 align="center">Modern React Components for <a href="https://graph.microsoft.com">Microsoft Graph</a> powered by <a href="https://react.fluentui.dev/">Fluent UI</a></h4>

<p align="center">
  <img src="https://img.shields.io/badge/alpha-0.1.0-orange" alt="Alpha Release">
  <img src="https://img.shields.io/badge/React-18.2-blue" alt="React 18.2">
  <img src="https://img.shields.io/badge/Fluent_UI-9.72-purple" alt="Fluent UI 9">
  <img src="https://img.shields.io/badge/TypeScript-5.3-blue" alt="TypeScript 5.3">
</p>

<h3 align="center">
  <a href="#getting-started">Get Started</a> • 
  <a href="#storybook">Storybook</a> • 
  <a href="#contribute">Contribute</a>
</h3>

## 🎯 Project Vision

This project reimagines the Microsoft Graph Toolkit as a **modern, React-first component library** built on top of Fluent UI. After Microsoft deprecated the original Microsoft Graph Toolkit, this fork was created to continue providing React developers with high-quality components for Microsoft Graph integration.

### Why This Fork Exists

The original Microsoft Graph Toolkit has been **deprecated by Microsoft**. Rather than let this valuable resource disappear, this fork takes the opportunity to reimagine the toolkit with a focused, modern approach:

1. **React-First Architecture**: Built specifically for React applications, not framework-agnostic web components
2. **Fluent UI Native**: Leverages official Fluent UI v9 components instead of custom implementations
3. **Simplified Maintenance**: Single package instead of a complex 10+ package monorepo
4. **Modern Tooling**: TypeScript 5, Vite, Vitest, and Storybook 7
5. **Community Driven**: Open source development focused on developer experience

### Key Principles

- **React-First**: Built specifically for React applications, not framework-agnostic web components
- **Fluent UI Native**: Uses official Fluent UI v9 components instead of custom implementations
- **Single Package**: One cohesive npm package instead of a complex monorepo
- **Modern Stack**: TypeScript 5, Vite, Vitest, and Storybook 7
- **Developer Experience**: Simple API, excellent TypeScript support, comprehensive documentation

### Design Philosophy

Instead of maintaining the original web component approach, this fork:

1. **Leverages Fluent UI**: Uses the official `Persona` component from Fluent UI instead of custom Avatar/Text components
2. **Embraces React Patterns**: Components designed for React's patterns (hooks, context) from the ground up
3. **Reduces Complexity**: Smaller codebase enables quicker development and easier maintenance
4. **Focuses on Quality**: Fewer components, better implementation, comprehensive documentation

## 📦 Package

```bash
npm install @medienstudio/graph-toolkit-react
```

| Package | Version | Description |
| ------- | ------- | ----------- |
| `@medienstudio/graph-toolkit-react` | `0.1.0-alpha.1` | React components for Microsoft Graph powered by Fluent UI |

## 🎨 Components

Currently available in alpha:

### Person Component
A flexible component for displaying user information from Microsoft Graph.

```tsx
import { Person } from '@medienstudio/graph-toolkit-react';

<Person 
  userId="user@contoso.com"
  view="twoLines"
  showPresence
  textAlignment="center"
  onClick={() => console.log('Clicked!')}
/>
```

**Features:**
- Multiple display modes: avatar-only, one-line, two-lines, three-lines
- Presence indicators (available, busy, away, etc.)
- Text alignment and positioning options
- Custom sizing (small, medium, large, extra-large, or numeric pixels)
- Click handlers for interactive scenarios
- Loading states
- Direct data mode (bypass Graph API)

### Coming Soon
- **PeoplePicker** - Multi-user selection with search
- **PersonCard** - Expandable contact card with full profile
- **Login** - Authentication control with Microsoft identity
- **FileList** - OneDrive/SharePoint file browsing
- **And more...**

## 🚀 Getting Started

### Prerequisites

```json
{
  "react": "^17.0.0 || ^18.0.0",
  "react-dom": "^17.0.0 || ^18.0.0",
  "@fluentui/react-components": "^9.0.0"
}
```

### Installation

```bash
npm install @medienstudio/graph-toolkit-react @fluentui/react-components react react-dom
```

### Quick Start

```tsx
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { GraphProvider, MockProvider, Person } from '@medienstudio/graph-toolkit-react';

function App() {
  const provider = new MockProvider(); // Use MockProvider for development
  
  return (
    <FluentProvider theme={webLightTheme}>
      <GraphProvider provider={provider}>
        <Person userId="AdeleV@contoso.com" view="twoLines" showPresence />
      </GraphProvider>
    </FluentProvider>
  );
}
```

### Authentication Providers

The library uses a provider pattern for authentication:

- **MockProvider**: Returns mock data (Adele Vance) without API calls - perfect for development
- **Custom Providers**: Implement `IProvider` interface to integrate with MSAL, Auth0, etc.

```tsx
import { IProvider, ProviderState } from '@medienstudio/graph-toolkit-react';

class MyAuthProvider implements IProvider {
  state = ProviderState.SignedOut;
  
  async login(): Promise<void> { /* ... */ }
  async logout(): Promise<void> { /* ... */ }
  async getAccessToken(): Promise<string> { /* ... */ }
}
```

## 📚 Storybook

Explore all components interactively in our Storybook documentation:

**[View Storybook →](https://thomaspe.github.io/microsoft-graph-toolkit/)** _(Deployed to GitHub Pages on every main branch update)_

Run locally:
```bash
npm run storybook
```
npm run storybook
```

## 🛠️ Development

### Tech Stack

- **Build**: Vite 5.1 (ESM + CJS output)
- **Language**: TypeScript 5.3
- **Testing**: Vitest 1.3 + Testing Library
- **Documentation**: Storybook 7.6
- **UI Framework**: Fluent UI v9 (React Components)
- **Graph SDK**: @microsoft/microsoft-graph-client 3.0

### Build & Test

```bash
# Install dependencies
npm install

# Type check
npm run type-check

# Lint
npm run lint

# Build library
npm run build

# Run tests
npm run test

# Run Storybook
npm run storybook

# Build Storybook for deployment
npm run build-storybook
```

### Project Structure

```
src/
├── components/
│   └── Person/
│       ├── Person.tsx          # Component implementation
│       ├── Person.types.ts     # TypeScript definitions
│       └── __tests__/          # Component tests
├── providers/
│   ├── IProvider.ts            # Provider interface
│   ├── MockProvider.ts         # Development provider
│   └── ProviderContext.tsx     # React context
├── hooks/
│   ├── useGraphClient.ts       # Graph client hook
│   ├── usePersonData.ts        # Person data fetching
│   └── useProvider.ts          # Provider access
└── index.ts                    # Public API

stories/
└── Person.stories.tsx          # Storybook stories (19 examples)
```

## 🎯 Current Status

**Phase 3 Complete** ✅

- ✅ Repository restructured from monorepo to single package
- ✅ Provider infrastructure with MockProvider for development
- ✅ Person component using Fluent UI Persona
- ✅ Full Persona configuration support (textAlignment, textPosition, sizing)
- ✅ Build system (ESM + CJS + TypeScript declarations)
- ✅ Storybook documentation with 19 interactive examples
- ✅ CI/CD with GitHub Actions
- ✅ Automatic Storybook deployment to GitHub Pages

**Next Steps**:
- Phase 4: Additional components (PeoplePicker, PersonCard, Login)
- Production-ready providers (MSAL2, custom integrations)
- Comprehensive test coverage
- First stable release (1.0.0)

## 🤝 Contribute

After the deprecation of the original Microsoft Graph Toolkit, this **community-driven fork** continues to provide React developers with components for Microsoft Graph. Contributions are welcome!

### Guidelines

1. Follow the existing code style (TypeScript, ESLint, Prettier)
2. Use Fluent UI components whenever possible
3. Write tests for new components
4. Add Storybook stories demonstrating all component features
5. Update documentation

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

This project is a fork of [microsoft-graph-toolkit](https://github.com/microsoftgraph/microsoft-graph-toolkit) by Microsoft (now deprecated), which was also MIT licensed.

## 🙏 Acknowledgments

- **Microsoft Graph Toolkit Team**: For creating the original toolkit and making it open source before deprecation
- **Fluent UI Team**: For the excellent React component library
- **Microsoft Graph**: For the powerful API that makes this all possible
- **Community Contributors**: For keeping this project alive and improving it

---

**Note**: This is an alpha release under active development. APIs may change. Not recommended for production use yet.

> ⚠️ **About the Original Project**: The original Microsoft Graph Toolkit by Microsoft has been deprecated. This fork is a community effort to continue providing React components for Microsoft Graph integration with a modern, focused approach.

## 🔗 Links

- **Original Project** (deprecated): [Microsoft Graph Toolkit](https://github.com/microsoftgraph/microsoft-graph-toolkit)
- **Fluent UI**: [react.fluentui.dev](https://react.fluentui.dev/)
- **Microsoft Graph**: [graph.microsoft.com](https://graph.microsoft.com)

