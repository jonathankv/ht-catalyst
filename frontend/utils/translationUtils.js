import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

/**
 * Helper function to get translated static props for pages
 * Standardizes the approach to loading translations across pages
 * @param {string} locale - Current locale from getStaticProps
 * @param {Array<string>} [namespaces=['common']] - Translation namespaces to load
 * @param {Object} [additionalProps={}] - Additional props to include
 * @returns {Object} Props object for the page
 */
export const getTranslatedStaticProps = async (locale, namespaces = ['common'], additionalProps = {}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      locale,
      ...additionalProps,
    },
  };
};

/**
 * Checks if a translation key exists in the current translations
 * Useful for conditional rendering based on translation availability
 * @param {Object} t - Translation function from useTranslation
 * @param {string} key - Translation key to check
 * @returns {boolean} Whether the key exists and has a non-empty value
 */
export const hasTranslation = (t, key) => {
  const value = t(key, { defaultValue: '__NOT_FOUND__' });
  return value !== '__NOT_FOUND__' && value !== '';
};

/**
 * Gets a formatted date string based on the current locale
 * @param {Date|string} date - Date to format
 * @param {string} locale - Current locale
 * @param {Object} [options] - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const getLocalizedDate = (date, locale, options = {}) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj);
};

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