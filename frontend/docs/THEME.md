# Theme System Documentation

## Background Colors

The website uses a centralized theme system for consistent background colors across different sections. Instead of hardcoding background colors in each component, we use CSS variables and utility classes.

### CSS Variables

Background colors are defined as CSS variables in `styles/globals.css`:

```css
/* Light Mode */
--color-bg-hero: theme('colors.primary.25');
--color-bg-main: theme('colors.white');
--color-bg-alt: theme('colors.primary.25');
--color-bg-footer: theme('colors.primary.25');
--color-bg-newsletter: theme('colors.primary.25');
--color-bg-nav: theme('colors.primary.25/80');
--color-bg-nav-scrolled: theme('colors.primary.700');

/* Dark Mode */
--color-bg-hero: theme('colors.neutral.950');
--color-bg-main: theme('colors.neutral.950');
--color-bg-alt: theme('colors.neutral.900');
--color-bg-footer: theme('colors.neutral.900');
--color-bg-newsletter: theme('colors.neutral.950');
--color-bg-nav: theme('colors.neutral.900/80');
--color-bg-nav-scrolled: theme('colors.primary.800');
```

### Utility Classes

These CSS variables are exposed through utility classes:

```css
/* Section Background Classes */
.bg-section-hero { background-color: var(--color-bg-hero); }
.bg-section-main { background-color: var(--color-bg-main); }
.bg-section-alt { background-color: var(--color-bg-alt); }
.bg-section-footer { background-color: var(--color-bg-footer); }
.bg-section-newsletter { background-color: var(--color-bg-newsletter); }

/* Navigation Background Classes */
.bg-nav { 
  background-color: var(--color-bg-nav);
  backdrop-filter: blur(8px);
}
.bg-nav-scrolled { background-color: var(--color-bg-nav-scrolled); }
```

## Usage

Use these utility classes in your components instead of hardcoding background colors:

```jsx
// BEFORE
<section className="bg-primary-25 dark:bg-neutral-950">

// AFTER
<section className="bg-section-hero">
```

## Modifying the Theme

To change the background color of a section across the entire site:

1. Update the corresponding CSS variable in `styles/globals.css`
2. The change will automatically apply to all components using that variable

## Benefits

- **Consistency**: Ensures consistent colors across the site
- **Maintainability**: Makes it easy to update colors in one place
- **Theme Support**: Automatically handles light/dark mode transitions
- **Semantic Naming**: Makes code more readable with descriptive class names 