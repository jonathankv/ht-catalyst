const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

function flattenObject(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
}

// Read existing translations from JSON files
const enPath = path.join(__dirname, '../public/locales/en/common.json');
const viPath = path.join(__dirname, '../public/locales/vi/common.json');

try {
  // Read and parse JSON files
  const enTranslations = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const viTranslations = JSON.parse(fs.readFileSync(viPath, 'utf8'));

  // Flatten nested objects
  const flatEn = flattenObject(enTranslations);
  const flatVi = flattenObject(viTranslations);

  // Create array of translations
  const translations = Object.keys(flatEn).map(key => ({
    key,
    en: flatEn[key],
    vi: flatVi[key] || flatEn[key] // Fallback to English if Vietnamese translation is missing
  }));

  // Create a new workbook
  const workbook = xlsx.utils.book_new();

  // Convert data to worksheet
  const worksheet = xlsx.utils.json_to_sheet(translations);

  // Set column widths
  const colWidths = [
    { wch: 30 },  // key column
    { wch: 50 },  // en column
    { wch: 50 }   // vi column
  ];
  worksheet['!cols'] = colWidths;

  // Add the worksheet to the workbook
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Translations');

  // Write to file
  const filePath = path.join(__dirname, '../translations/translations.xlsx');
  xlsx.writeFile(workbook, filePath);

  console.log('✅ Translation template created successfully!');
} catch (error) {
  console.error('❌ Error creating translation template:', error);
  process.exit(1);
} 