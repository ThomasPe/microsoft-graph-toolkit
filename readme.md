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

## Packages

## 🔗 Links

- **Original Project**: [Microsoft Graph Toolkit](https://github.com/microsoftgraph/microsoft-graph-toolkit)
- **Fluent UI**: [react.fluentui.dev](https://react.fluentui.dev/)
- **Microsoft Graph**: [graph.microsoft.com](https://graph.microsoft.com)


### Preview packages

In addition to the `@next` preview packages, we also ship packages under several other preview tags with various features in progress:

| Tag             | Description                                                              |
| --------------- | ------------------------------------------------------------------------ |
| `next`          | Next release - updated on each commit to `main`                          |

To install these packages, use the tag as the version in your `npm i` command. Ex: `npm i @microsoft/mgt-element@next`. Make sure to install the same version for all mgt packages to avoid any conflicts. Keep in mind, these are features in preview and are not recommended for production use.


## Components

You can explore components and samples with the [playground](https://mgt.dev) powered by storybook.

The Toolkit currently includes the following components:

* [mgt-agenda](https://learn.microsoft.com/graph/toolkit/components/agenda)
* [mgt-file](https://learn.microsoft.com/graph/toolkit/components/file)
* [mgt-file-list](https://learn.microsoft.com/graph/toolkit/components/file-list)
* [mgt-get](https://learn.microsoft.com/graph/toolkit/components/get)
* [mgt-login](https://learn.microsoft.com/graph/toolkit/components/login)
* [mgt-people](https://learn.microsoft.com/graph/toolkit/components/people)
* [mgt-people-picker](https://learn.microsoft.com/graph/toolkit/components/people-picker)
* [mgt-person](https://learn.microsoft.com/graph/toolkit/components/person)
* [mgt-person-card](https://learn.microsoft.com/graph/toolkit/components/person-card)
* [mgt-picker](https://learn.microsoft.com/en-us/graph/toolkit/components/picker)
* [mgt-search-box](https://learn.microsoft.com/graph/toolkit/components/person-box)
* [mgt-search-results](https://learn.microsoft.com/graph/toolkit/components/search-results)
* [mgt-tasks](https://learn.microsoft.com/graph/toolkit/components/tasks)
* [mgt-taxonomy-picker](https://learn.microsoft.com/graph/toolkit/components/taxonomy-picker)
* [mgt-teams-channel-picker](https://learn.microsoft.com/graph/toolkit/components/teams-channel-picker)
* [mgt-theme-toggle](https://learn.microsoft.com/graph/toolkit/components/theme-toggle)
* [mgt-todo](https://learn.microsoft.com/graph/toolkit/components/todo)


All web components are also available as React component - see [@microsoft/mgt-react documentation](https://learn.microsoft.com/graph/toolkit/get-started/mgt-react).

## Providers

[Providers](https://learn.microsoft.com/graph/toolkit/providers/providers) enable authentication and provide the implementation for acquiring access tokens on various platforms. The providers also expose a Microsoft Graph Client for calling the Microsoft Graph APIs. The components work best when used with a provider, but the providers can be used on their own as well.

* [Msal2Provider](https://learn.microsoft.com/graph/toolkit/providers/msal2)
* [SharePointProvider](https://learn.microsoft.com/graph/toolkit/providers/sharepoint)
* [TeamsFxProvider](https://learn.microsoft.com/graph/toolkit/providers/teamsfx)
* [ProxyProvider](https://learn.microsoft.com/graph/toolkit/providers/proxy)
* [SimpleProvider](https://learn.microsoft.com/graph/toolkit/providers/custom)
* [ElectronProvider](https://learn.microsoft.com/graph/toolkit/providers/electron)

You can also create your own providers by extending the [IProvider](https://learn.microsoft.com/graph/toolkit/providers/custom) abstract class.

[View the full documentation](https://learn.microsoft.com/graph/toolkit/overview)

## Getting Started

The following guides are available to help you get started with the Toolkit:
* [Build a web application (JavaScript)](https://learn.microsoft.com/graph/toolkit/get-started/build-a-web-app)
* [Build a SharePoint web part Part](https://learn.microsoft.com/graph/toolkit/get-started/build-a-sharepoint-web-part)
* [Build a Microsoft Teams tab](https://learn.microsoft.com/graph/toolkit/get-started/build-a-microsoft-teams-tab)
* [Build an Electron app](https://learn.microsoft.com/en-us/graph/toolkit/get-started/build-an-electron-app)
* [Use the Toolkit with React](https://learn.microsoft.com/graph/toolkit/get-started/use-toolkit-with-react)
* [Use the Toolkit with Angular](https://learn.microsoft.com/graph/toolkit/get-started/use-toolkit-with-angular)
* [Build a productivity hub app](https://learn.microsoft.com/en-us/graph/toolkit/get-started/building-one-productivity-hub)

You can use the components by installing the npm package or importing them from a CDN (unpkg).

### Use via NPM:

The benefits of using MGT through NPM is that you have full control of the bundling process and you can bundle only the code you need for your site. First, add the npm package:

```bash
npm install @microsoft/mgt-components
npm install @microsoft/mgt-msal2-provider
```

Now you can reference all components and providers at the page you are using:

```html
<script type="module">
  import { Providers } from 'node_modules/@microsoft/mgt-element/dist/es6/index.js';
  import { Msal2Provider } from 'node_modules/@microsoft/mgt-msal2-provider/dist/es6/index.js';
  import { registerMgtLoginComponent, registerMgtAgendaComponent } from 'node_modules/@microsoft/mgt-components/dist/es6/index.js';
  
  Providers.globalProvider = new Msal2Provider({clientId: '[CLIENT-ID]'});
  
  registerMgtLoginComponent();
  registerMgtAgendaComponent();
</script>

<mgt-login></mgt-login>
<mgt-agenda></mgt-agenda>
```

### Use via CDN:

The following script tag downloads the code from the CDN, configures an MSAL2 provider, and makes all the components available for use in the web page.

```html
<script type="module">
  import { registerMgtComponents, Providers, Msal2Provider } from 'https://unpkg.com/@microsoft/mgt@4';
  Providers.globalProvider = new Msal2Provider({clientId: '[CLIENT-ID]'});
  registerMgtComponents();
</script>
<mgt-login></mgt-login>
<mgt-agenda></mgt-agenda>
```

> NOTE: This link will load the highest available version of @microsoft/mgt in the range `>= 4.0.0 < 5.0.0`, omitting the `@4` fragment from the url results in loading the latest version. This could result in loading a new major version and breaking the application.

> NOTE: MSAL requires the page to be hosted in a web server for the authentication redirects. If you are just getting started and want to play around, the quickest way is to use something like [live server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in vscode.

## Using our samples

We, in collaboration with the community, are providing different samples to help you with different scenarios to leverage the Microsoft Graph Toolkit. Our samples are hosted in another repo and is also fully open-source! Head over to the [Microsoft Graph Toolkit Samples Repository](https://aka.ms/mgt/samples) and you will find all sorts of samples to get you started quickly!

## Contribute

We enthusiastically welcome contributions and feedback. Please read our [wiki](https://github.com/microsoftgraph/microsoft-graph-toolkit/wiki) and the [contributing guide](CONTRIBUTING.md) before you begin.

## Feedback and Requests

For general questions and support, please use [Stack Overflow](https://stackoverflow.com/questions/tagged/microsoft-graph-toolkit) where questions should be tagged with `microsoft-graph-toolkit`

Please use [GitHub Issues](https://github.com/microsoftgraph/microsoft-graph-toolkit/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) for bug reports and feature requests. We highly recommend you browse existing issues before opening new issues.

## License

All files in this GitHub repository are subject to the [MIT license](https://github.com/microsoftgraph/microsoft-graph-toolkit/blob/main/LICENSE). This project also references fonts and icons from a CDN, which are subject to a separate [asset license](https://static2.sharepointonline.com/files/fabric/assets/license.txt).

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
