const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Function to convert flat object to nested object
function flatToNested(obj) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const keys = key.split('.');
    let current = result;
    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = current[keys[i]] || {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
  }
  return result;
}

// Function to process translations
function processTranslations() {
  try {
    console.log('🔍 Reading translations file...');
    const excelPath = path.join(__dirname, '../translations/translations.xlsx');
    
    if (!fs.existsSync(excelPath)) {
      console.error('❌ translations.xlsx not found at:', excelPath);
      process.exit(1);
    }

    // Read the Excel file
    const workbook = xlsx.readFile(excelPath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const data = xlsx.utils.sheet_to_json(worksheet);
    console.log(`📖 Found ${data.length} translation entries`);
    
    // Create translation objects
    const en = {};
    const vi = {};
    
    data.forEach(row => {
      if (row.key && row.en) {
        en[row.key] = row.en;
        if (row.vi) {
          vi[row.key] = row.vi;
        } else {
          vi[row.key] = row.en; // Fallback to English if Vietnamese translation is missing
          console.warn(`⚠️  Missing Vietnamese translation for key: ${row.key}`);
        }
      }
    });
    
    // Convert flat objects to nested
    console.log('🔧 Converting to nested structure...');
    const enNested = flatToNested(en);
    const viNested = flatToNested(vi);
    
    // Ensure directories exist
    const localesPath = path.join(__dirname, '../public/locales');
    const enPath = path.join(localesPath, 'en');
    const viPath = path.join(localesPath, 'vi');
    
    [enPath, viPath].forEach(dir => {
      if (!fs.existsSync(dir)) {
        console.log(`📁 Creating directory: ${dir}`);
        fs.mkdirSync(dir, { recursive: true });
      }
    });
    
    // Write JSON files
    console.log('💾 Writing translation files...');
    const enFile = path.join(enPath, 'common.json');
    const viFile = path.join(viPath, 'common.json');

    fs.writeFileSync(
      enFile,
      JSON.stringify(enNested, null, 2),
      'utf8'
    );
    console.log(`✅ English translations written to: ${enFile}`);

    fs.writeFileSync(
      viFile,
      JSON.stringify(viNested, null, 2),
      'utf8'
    );
    console.log(`✅ Vietnamese translations written to: ${viFile}`);
    
    console.log('🎉 Translations updated successfully!');
    
  } catch (error) {
    console.error('❌ Error processing translations:', error);
    process.exit(1);
  }
}

// Run the script
processTranslations(); 