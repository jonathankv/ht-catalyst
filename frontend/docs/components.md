# Component Documentation

This document provides an overview of the components used in the personal branding website with AI chat integration.

## Core Components

### Navigation
- **Purpose**: Main navigation component for the website
- **Features**: 
  - Responsive design with mobile menu
  - Language switching
  - Theme toggling
  - Authentication links
- **Translation Keys**: Uses `nav.*`, `site.title`
- **Usage Context**: Used in Layout component on all pages

### Hero
- **Purpose**: Hero section for landing pages
- **Features**:
  - Animated text and background effects
  - Call-to-action buttons
- **Translation Keys**: Uses `hero.*`
- **Usage Context**: Used on homepage and landing pages

### Home
- **Purpose**: Main home page component
- **Features**:
  - Combines hero section, featured content, and call-to-action elements
  - Supports image or color-based card layouts
- **Translation Keys**: Uses `nav.*`, `library.section_description`, `blog.description`, etc.
- **Usage Context**: Used on the index page

### ThemeProvider
- **Purpose**: Manages dark/light mode and theme preferences
- **Features**:
  - Persists user theme choice in local storage
  - Respects system preferences
- **Translation Keys**: None directly
- **Usage Context**: Wraps the entire application in _app.js

### LanguageSwitcher
- **Purpose**: Allows users to switch between available languages
- **Features**:
  - Visual indication of current language
  - Smooth transition between languages
- **Translation Keys**: None directly (uses router.locale)
- **Usage Context**: Used in Navigation component

## Page-Specific Components

### Finance Components
- **FinanceTools**: Displays financial calculators and tools
- **AIAssistant**: Provides AI-powered financial advice
- **Translation Keys**: Uses `finance.*`

### Blog Components
- **BlogCard**: Displays blog post preview
- **CategoryFilter**: Filters blog posts by category
- **FeaturedPost**: Highlights a featured blog post
- **Translation Keys**: Uses `blog.*`

## Utility Components

### Newsletter
- **Purpose**: Email newsletter signup form
- **Features**:
  - Form validation
  - Success/error states
- **Translation Keys**: Uses `newsletter.*`
- **Usage Context**: Used on homepage and other landing pages

### FloatingChat
- **Purpose**: Floating AI chat interface
- **Features**:
  - Expandable chat window
  - Integration with Claude API
- **Translation Keys**: Uses `chat.*`
- **Usage Context**: Available on all pages

## Translation Key Patterns

The application follows these translation key patterns:

1. **Page/Section Namespaces**: Keys are organized by page or functional section (e.g., `blog.`, `finance.`, `auth.`)
2. **UI Element Patterns**: Common UI elements follow consistent patterns:
   - Titles: `*.title`
   - Descriptions: `*.description`
   - Buttons: `*.button` or `*.cta.primary`/`*.cta.secondary`
   - Form fields: `*.form.field_name`
3. **Metadata**: SEO metadata uses `meta.page_name.title`/`meta.page_name.description`
4. **Common Elements**: Shared UI text uses `common.*`

## Best Practices

When adding new components:

1. Add JSDoc comments to document the component's purpose and props
2. Use consistent translation key patterns
3. Ensure all user-facing text uses translation keys
4. Test with all supported languages 