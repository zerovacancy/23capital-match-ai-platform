# LG Development Capital Match AI Platform

## Project Overview

This project is a consulting pitch for LG Development (lg-group.com), a Chicago-based real estate developer. The platform demonstrates an AI-powered solution to streamline their LP (Limited Partner) relationship management, deal pipeline, and capital raising processes.

## Strategic Alignment

The Capital Match AI Platform directly aligns with LG Development's strategic goals:

- **Revenue Growth**: Supporting growth from $4.6M (2025) to $48M (2034) at 30% YOY
- **Market Expansion**: Facilitating expansion into Denver, Charlotte, Raleigh, Nashville
- **Project Focus**: Optimizing capital raise for Build-to-Rent, Mid-Rise and High-Rise Multifamily developments
- **Capital Goals**: Accelerating access to $5M discretionary capital by Q2
- **Deal Pipeline**: Supporting 4 new deals/year and >8 deals reviewed monthly

## Codebase Analysis

### Current State

The project is built with a modern React + TypeScript stack, leveraging:
- Vite for fast development and building
- TailwindCSS with shadcn/ui component library
- React Router for navigation
- TanStack Query for data management

The existing codebase includes:
- Comprehensive documentation covering architecture, strategic alignment, and prototype plans
- Landing page components (Hero, Capabilities, Architecture sections, etc.)
- Complete UI component library from shadcn/ui
- Basic application structure and routing

### Implementation Gaps

Based on thorough analysis, the following components need to be implemented:

1. **LP Profile Engine**: Functionality to view comprehensive LP profiles with investment criteria
2. **Deal Analysis Engine**: Component to analyze and standardize deal metrics
3. **Matching Algorithm Visualization**: UI to demonstrate LP-deal compatibility scoring
4. **Capital Raise Dashboard**: Tracking interface for monitoring fundraising progress

The prototype directories exist but currently lack implementation of the core demo components required for the presentation.

## Implementation Strategy

### Phase 1: Core Components (Day 1-2)
- Implement the four main prototype components with static sample data
- Focus on visual representation of the key features
- Ensure proper styling and layout

### Phase 2: Unified Dashboard (Day 3-4)
- Create a prototype dashboard page with tabbed navigation
- Update routes to include the demo page
- Connect components to provide a cohesive experience

### Phase 3: Enhanced Interactivity (Day 5-6)
- Add animations for data transitions
- Implement interactive features (filtering, sorting)
- Polish UI for presentation quality

### Phase 4: Quality Assurance (Day 7)
- Test all components and interactions
- Optimize for the presentation environment
- Prepare backup materials

## Key Components to Implement

1. **LP Profile Viewer**
   - Investment criteria visualization
   - Geographic preference mapping
   - Relationship strength indicators
   - Communication preference display

2. **Deal Analysis Component**
   - Financial metrics visualization
   - Strategic alignment indicators
   - Capital requirement breakdown
   - Risk assessment display

3. **Matching Algorithm Visualization**
   - LP-deal match scoring
   - Confidence rating visualization
   - Matching factor breakdown
   - Outreach recommendation generation

4. **Capital Raise Tracker**
   - Progress towards $5M Q2 goal
   - Monthly velocity metrics
   - Pipeline visualization
   - Forecast completion timeline

## Presentation Approach

The demo should follow a narrative flow that demonstrates how the platform addresses LG Development's specific challenges:

1. Begin with executive dashboard overview
2. Drill down into LP profile examples
3. Show deal analysis capabilities
4. Demonstrate matching algorithm in action
5. Return to dashboard to show impact on KPIs

## Development Notes

- Use realistic data that reflects LG Development's target markets and project types
- Emphasize connections to KPIs in the strategic plan
- Showcase integration points with existing systems (HubSpot, MS Teams, etc.)
- Highlight the platform's direct impact on their $5M discretionary capital goal

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Social Media Sharing

The project includes OpenGraph meta tags and dynamic image generation for optimal social media sharing:

- **OpenGraph Image**: Automatically generated during build process using Puppeteer
- **Image Location**: `/public/assets/images/social/og-image.png`
- **Image Template**: Can be edited at `/public/assets/images/social/og-template.html`

You can manually regenerate the OpenGraph image with:
```bash
npm run generate-og
```

The build process automatically:
1. Generates the OpenGraph image from the HTML template
2. Updates relative URLs to absolute URLs for production deployment
3. Ensures proper metadata for LinkedIn, Twitter, and Facebook sharing

## Demo Access

The interactive prototype is available at:
- Local development: http://localhost:5173/prototype
