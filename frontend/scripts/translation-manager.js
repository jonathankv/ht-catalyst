const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Configuration
const LOCALES = ['en', 'vi'];
const NAMESPACES = ['common'];
const LOCALES_DIR = path.join(__dirname, '../public/locales');
const TRANSLATIONS_DIR = path.join(__dirname, '../translations');

if (!fs.existsSync(TRANSLATIONS_DIR)) {
  fs.mkdirSync(TRANSLATIONS_DIR, { recursive: true });
}

const EXCEL_OUTPUT = path.join(TRANSLATIONS_DIR, 'translations.xlsx');

// Helper function to flatten nested objects
function flattenObject(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(acc, flattenObject(obj[k], `${pre}${k}`));
    } else {
      acc[`${pre}${k}`] = obj[k];
    }
    return acc;
  }, {});
}

// Helper function to unflatten objects
function unflattenObject(obj) {
  const result = {};
  
  for (const key in obj) {
    const keys = key.split('.');
    let current = result;
    
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (i === keys.length - 1) {
        current[k] = obj[key];
      } else {
        current[k] = current[k] || {};
        current = current[k];
      }
    }
  }
  
  return result;
}

// Extract translations using i18next-parser
async function extractTranslations() {
  console.log('Extracting translation keys from components...');
  try {
    await execAsync('npx i18next-parser');
    console.log('✅ Translation keys extracted successfully');
  } catch (error) {
    console.error('❌ Error extracting translation keys:', error.message);
    process.exit(1);
  }
}

// Generate Excel file from JSON translation files
async function generateExcel() {
  console.log('Generating Excel file from translations...');
  
  try {
    // Create workbook
    const workbook = XLSX.utils.book_new();
    
    // Process each namespace
    for (const namespace of NAMESPACES) {
      // Get base translations (English)
      const enPath = path.join(LOCALES_DIR, 'en', `${namespace}.json`);
      const enTranslations = JSON.parse(fs.readFileSync(enPath, 'utf8'));
      const flattenedEn = flattenObject(enTranslations);
      
      // Prepare data for Excel
      const data = [];
      
      // Add header row
      const headerRow = ['Key', 'Context', ...LOCALES];
      data.push(headerRow);
      
      // Add translation rows
      for (const key in flattenedEn) {
        const row = [key, ''];  // Key and Context columns
        
        // Add translations for each locale
        for (const locale of LOCALES) {
          const localePath = path.join(LOCALES_DIR, locale, `${namespace}.json`);
          const localeTranslations = JSON.parse(fs.readFileSync(localePath, 'utf8'));
          const flattenedLocale = flattenObject(localeTranslations);
          
          row.push(flattenedLocale[key] || '');
        }
        
        data.push(row);
      }
      
      // Create worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(data);
      
      // Set column widths
      const colWidths = [
        { wch: 40 },  // Key column
        { wch: 30 },  // Context column
        ...LOCALES.map(() => ({ wch: 50 }))  // Translation columns
      ];
      worksheet['!cols'] = colWidths;
      
      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, namespace);
    }
    
    // Write to file
    XLSX.writeFile(workbook, EXCEL_OUTPUT);
    console.log(`✅ Excel file generated: ${EXCEL_OUTPUT}`);
  } catch (error) {
    console.error('❌ Error generating Excel file:', error.message);
    process.exit(1);
  }
}

// Import translations from Excel back to JSON files
async function importFromExcel() {
  console.log('Importing translations from Excel...');
  
  try {
    // Read Excel file
    const workbook = XLSX.readFile(EXCEL_OUTPUT);
    
    // Process each namespace
    for (const namespace of NAMESPACES) {
      // Get worksheet
      const worksheet = workbook.Sheets[namespace];
      if (!worksheet) {
        console.warn(`⚠️ Worksheet for namespace "${namespace}" not found in Excel file`);
        continue;
      }
      
      // Convert to array of arrays
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      // Get header row
      const headerRow = data[0];
      const localeIndices = {};
      
      // Find indices for each locale
      for (const locale of LOCALES) {
        const index = headerRow.indexOf(locale);
        if (index !== -1) {
          localeIndices[locale] = index;
        } else {
          console.warn(`⚠️ Locale "${locale}" not found in Excel header`);
        }
      }
      
      // Process translations for each locale
      for (const locale of LOCALES) {
        if (!localeIndices[locale]) continue;
        
        // Get existing translations
        const localePath = path.join(LOCALES_DIR, locale, `${namespace}.json`);
        const existingTranslations = JSON.parse(fs.readFileSync(localePath, 'utf8'));
        
        // Create new translations object
        const newTranslations = {};
        
        // Add translations from Excel
        for (let i = 1; i < data.length; i++) {
          const row = data[i];
          const key = row[0];
          const translation = row[localeIndices[locale]];
          
          if (key && translation) {
            newTranslations[key] = translation;
          }
        }
        
        // Unflatten and merge with existing translations
        const unflattenedNew = unflattenObject(newTranslations);
        const merged = { ...existingTranslations, ...unflattenedNew };
        
        // Write back to file
        fs.writeFileSync(
          localePath, 
          JSON.stringify(merged, null, 2),
          'utf8'
        );
      }
      
      console.log(`✅ Translations for namespace "${namespace}" imported successfully`);
    }
  } catch (error) {
    console.error('❌ Error importing translations:', error.message);
    process.exit(1);
  }
}

// Validate translations
async function validateTranslations() {
  console.log('Validating translations...');
  
  let hasErrors = false;
  
  // Process each namespace
  for (const namespace of NAMESPACES) {
    // Get base translations (English)
    const enPath = path.join(LOCALES_DIR, 'en', `${namespace}.json`);
    const enTranslations = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    const flattenedEn = flattenObject(enTranslations);
    
    // Check each locale
    for (const locale of LOCALES) {
      if (locale === 'en') continue;
      
      const localePath = path.join(LOCALES_DIR, locale, `${namespace}.json`);
      const localeTranslations = JSON.parse(fs.readFileSync(localePath, 'utf8'));
      const flattenedLocale = flattenObject(localeTranslations);
      
      // Check for missing translations
      for (const key in flattenedEn) {
        if (!flattenedLocale[key]) {
          console.warn(`⚠️ Missing translation for key "${key}" in ${locale}:${namespace}`);
          hasErrors = true;
        }
      }
    }
  }
  
  if (!hasErrors) {
    console.log('✅ All translations are valid');
  }
}

// Main function
async function main() {
  const command = process.argv[2];
  
  switch (command) {
    case 'extract':
      await extractTranslations();
      break;
    case 'generate':
      await generateExcel();
      break;
    case 'import':
      await importFromExcel();
      break;
    case 'validate':
      await validateTranslations();
      break;
    case 'all':
      await extractTranslations();
      await generateExcel();
      break;
    default:
      console.log(`
Translation Manager

Usage:
  node scripts/translation-manager.js [command]

Commands:
  extract   - Extract translation keys from components
  generate  - Generate Excel file from translations
  import    - Import translations from Excel back to JSON files
  validate  - Validate translations for missing keys
  all       - Run extract and generate in sequence
      `);
  }
}

main().catch(console.error); 