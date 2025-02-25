import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

/**
 * Helper function to get static props with translations
 * @param {string} locale - The current locale
 * @param {Array} namespaces - Array of translation namespaces to load
 * @param {Object} additionalProps - Additional props to include
 * @returns {Object} Props object for getStaticProps
 */
export async function getTranslatedStaticProps(locale, namespaces = ['common'], additionalProps = {}) {
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, namespaces)),
      ...additionalProps,
    },
  };
}

/**
 * Helper function to get server-side props with translations
 * Only use this when you absolutely need server-side rendering
 * @param {string} locale - The current locale
 * @param {Array} namespaces - Array of translation namespaces to load
 * @param {Object} additionalProps - Additional props to include
 * @returns {Object} Props object for getServerSideProps
 */
export async function getTranslatedServerSideProps(locale, namespaces = ['common'], additionalProps = {}) {
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, namespaces)),
      ...additionalProps,
    },
  };
}

/**
 * Format a date according to the current locale
 * @param {Date|string} date - Date to format
 * @param {string} locale - Current locale
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export function formatLocalizedDate(date, locale = 'en', options = {}) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  return new Intl.DateTimeFormat(
    locale === 'en' ? 'en-US' : 'vi-VN', 
    defaultOptions
  ).format(dateObj);
} 