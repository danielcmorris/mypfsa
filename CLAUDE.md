# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Revor** is an Angular 20 insurance services agency and broker template built with standalone components, SSR (Server-Side Rendering), and Bootstrap 5. The project name in package.json is "revor" but the repository is named "mypfsa".

## Development Commands

### Development Server
```bash
npm start
# or
ng serve
```
Development server runs at http://localhost:4200/

### Build
```bash
npm run build              # Production build
npm run watch              # Development build with watch mode
```

### Testing
```bash
npm test                   # Run unit tests with Karma
```

### SSR Server
```bash
npm run serve:ssr:revor    # Run the SSR server (requires prior build)
```

### Code Generation
```bash
ng generate component component-name    # Generate new component
ng generate --help                      # See all available schematics
```

## Architecture

### Application Structure

The application follows a component-based architecture with three main organizational patterns:

1. **Demos** (`src/app/demos/`): Complete page layouts for different homepage variations
   - `home-demo-one/`, `home-demo-two/`, `home-demo-three/`
   - Each demo composes multiple reusable common components

2. **Pages** (`src/app/pages/`): Individual route pages for the application
   - Examples: `about-page/`, `agents-page/`, `contact-page/`, `services-page/`
   - Pages compose common components to build their layouts
   - Each page imports `TopHeader`, `Navbar`, `Footer` and relevant content components

3. **Common Components** (`src/app/common/`): Reusable UI components used throughout the app
   - Examples: `navbar/`, `footer/`, `agents/`, `services/`, `feedback/`, `faq/`
   - These are the building blocks that pages and demos compose together

### Component Architecture

All components use Angular's **standalone component** architecture (no NgModules). Components:
- Set `standalone: true`
- Explicitly declare all dependencies in their `imports` array
- Use the naming pattern: `ComponentName` class exported from `component-name.ts`
- Follow structure: `component-name.ts`, `component-name.html`, `component-name.scss`

### Routing

Routes are defined in `src/app/app.routes.ts` using Angular's standalone routing. The catch-all route (`**`) redirects to `ErrorPage` and must remain at the bottom of the routes array.

### Services & Data

**Data Layer:**
- Services live in `src/app/services/`
- Models/interfaces in `src/app/models/`
- Static JSON data in `public/data/` (e.g., `agents.json`, `councils.json`)
- Services use HttpClient to fetch JSON data from `/data/` endpoints

**Key Services:**
- `AgentsService`: Fetches agent data from `/data/agents.json`
- `CouncilDirectoryService`: Fetches council directory data from `/data/councils.json`
- `NavigationService`: Handles navigation state
- `IconService`: Manages icon gallery functionality

### Configuration

**Angular Configuration:**
- Uses `@angular/build:application` builder with Vite
- Default style language: SCSS
- Component prefix: `app`
- SSR enabled via `@angular/ssr`

**Global Styles:**
Multiple CSS libraries included in `angular.json`:
- Bootstrap 5
- Animate.css
- Magnific Popup
- Owl Carousel
- Boxicons
- Font Awesome
- Bootstrap Icons
- Custom Flaticon font

**TypeScript:**
Strict mode enabled with comprehensive compiler checks including:
- `strict: true`
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`
- `strictTemplates: true`

### SSR (Server-Side Rendering)

Application includes SSR support:
- Server configuration: `src/server.ts`
- Server entry point: `src/main.server.ts`
- App config: `src/app/app.config.server.ts`
- Client hydration enabled with event replay

### Scroll Behavior

The root `App` component (`src/app/app.ts`) implements custom scroll-to-top behavior:
- Tracks previous URL to distinguish navigation from refresh
- Only scrolls to top on route changes, not on page refresh
- Uses `ViewportScroller` service

### Tools

Special utility routes for development:
- `/icons/font-awesome` - Font Awesome icon gallery
- `/icons/bootstrap` - Bootstrap icon gallery

## Style Guidelines

- Components use SCSS for styling
- Prettier configured for HTML with Angular parser
- Follow existing component structure when creating new components
- Import and compose existing common components rather than duplicating UI
