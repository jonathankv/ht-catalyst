# Translation System Guide

## Overview

This project uses a structured translation system with the following components:
- JSON translation files for English and Vietnamese in `frontend/public/locales/{en,vi}/common.json`
- React components using the `useTranslation` hook from `react-i18next`
- Utility functions for consistent implementation
- Hard reload approach for language switching to ensure proper translation loading

## Key Components

### 1. Translation Files

Translations are stored in JSON files:
- English: `/frontend/public/locales/en/common.json`
- Vietnamese: `/frontend/public/locales/vi/common.json`

These files use a hierarchical structure for organization:

```json
{
  "site": {
    "title": "PM Jonathan",
    "description": "Discover insights on technology, personal growth, and making a positive impact"
  },
  "auth": {
    "login": {
      "title": "Sign in to your account",
      "email_label": "Email address"
    }
  }
}
```

### 2. Core Files

#### LanguageContext.js

The `LanguageContext.js` file provides a React context for managing language state:

```javascript
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Implementation details...
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
```

#### LanguageSwitcher.js

The `LanguageSwitcher.js` component provides a UI for switching languages:

```javascript
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageSwitcher({ isScrolled }) {
  const router = useRouter();
  const { changeLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLocale = router.locale === 'en' ? 'vi' : 'en';
    changeLanguage(newLocale);
  };

  // Component JSX...
}
```

#### translationUtils.js

The `translationUtils.js` file provides utility functions for working with translations:

```javascript
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getTranslatedStaticProps(locale, namespaces = ['common'], additionalProps = {}) {
  // Implementation details...
}

export async function getTranslatedServerSideProps(locale, namespaces = ['common'], additionalProps = {}) {
  // Implementation details...
}

export function formatLocalizedDate(date, locale = 'en', options = {}) {
  // Implementation details...
}
```

## Implementation in Pages

### 1. Basic Page Structure

```javascript
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { getTranslatedStaticProps } from '../utils/translationUtils';

export default function MyPage({ locale }) {
  const { t } = useTranslation('common');
  
  return (
    <>
      <Head>
        <title>{t('page.title')} | {t('site.title')}</title>
        <meta name="description" content={t('page.description')} />
      </Head>
      
      <main>
        <h1>{t('page.heading')}</h1>
        <p>{t('page.content')}</p>
        
        {/* Pass locale to child components */}
        <MyComponent locale={locale} />
      </main>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return getTranslatedStaticProps(locale);
}
```

### 2. Using Translations in Components

```javascript
import { useTranslation } from 'next-i18next';

export default function MyComponent({ locale }) {
  const { t } = useTranslation('common');
  
  return (
    <div>
      <h2>{t('component.title')}</h2>
      <p>{t('component.description')}</p>
      
      {/* For dynamic values */}
      <p>{t('component.welcome', { name: 'John' })}</p>
      
      {/* For pluralization */}
      <p>{t('component.items', { count: 5 })}</p>
    </div>
  );
}
```

## Best Practices

### 1. Always Use Static Generation When Possible

Use `getStaticProps` instead of `getServerSideProps` for better performance:

```javascript
export async function getStaticProps({ locale }) {
  return getTranslatedStaticProps(locale);
}
```

### 2. Pass the Locale Prop to Child Components

Always pass the `locale` prop to child components:

```javascript
<MyComponent locale={locale} />
```

### 3. Use Proper Head Tags

Include translated meta tags for SEO:

```javascript
<Head>
  <title>{t('page.title')} | {t('site.title')}</title>
  <meta name="description" content={t('page.description')} />
</Head>
```

### 4. Use Hierarchical Translation Keys

Organize translation keys in a hierarchical structure:

```javascript
// Good
t('auth.login.title')

// Avoid
t('authLoginTitle')
```

### 5. Handle Dynamic Content

For dynamic content, use placeholders:

```javascript
// In translation file
{
  "welcome": "Welcome, {{name}}!"
}

// In component
t('welcome', { name: 'John' })
```

## Troubleshooting

### 1. Translations Not Showing Up

If translations aren't showing up:

1. Check that you're using the correct namespace: `useTranslation('common')`
2. Verify that the translation key exists in both language files
3. Make sure you're using `getTranslatedStaticProps` or `getTranslatedServerSideProps`
4. Check that the locale is being passed to child components

### 2. Language Switch Not Working

If language switching isn't working:

1. Check that the `LanguageContext` is properly set up
2. Verify that `localStorage` is being updated with the new language
3. Ensure the hard reload is working correctly

## Adding New Translations

1. Add the new key to both language files:
   - `frontend/public/locales/en/common.json`
   - `frontend/public/locales/vi/common.json`
2. Use the same hierarchical structure in both files
3. Use the translation in your component: `t('new.translation.key')`

## Adding a New Language

1. Create a new folder in `frontend/public/locales/` with the language code (e.g., `fr` for French)
2. Copy the structure from an existing language file
3. Translate all values
4. Update the `languages` object in `LanguageContext.js`
5. Update the language switcher UI to include the new language 