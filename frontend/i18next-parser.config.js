module.exports = {
  contextSeparator: '_',
  keySeparator: '.',
  namespaceSeparator: ':',
  pluralSeparator: '_',
  
  // Save the old catalogs to see what has changed
  createOldCatalogs: true,
  
  // Keep keys ordered
  sort: true,
  
  // Add new keys to locale files
  keepRemoved: true,
  
  // Files/directories to parse
  input: [
    'components/**/*.{js,jsx}',
    'pages/**/*.{js,jsx}',
    'contexts/**/*.{js,jsx}',
    'utils/**/*.{js,jsx}'
  ],
  
  // Output format and location
  output: 'public/locales/$LOCALE/$NAMESPACE.json',
  
  // Supported locales
  locales: ['en', 'vi'],
  
  // Default namespace
  defaultNamespace: 'common',
  
  // Lexers for different file types
  lexers: {
    js: ['JsxLexer'],
    jsx: ['JsxLexer'],
    default: ['JavascriptLexer'],
  },
  
  // Add comments for translators
  lineEnding: 'auto',
  
  // Don't write empty json files
  skipDefaultValues: false,
  
  // Don't create a file for each namespace
  useKeysAsDefaultValue: false,
  
  // Don't add namespace to the translation key
  resetDefaultValueLocale: null,
  
  // Verbose output
  verbose: false
} 