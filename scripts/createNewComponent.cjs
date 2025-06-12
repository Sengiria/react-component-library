const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];

if (!componentName) {
  console.error('❌ Please provide a component name.');
  process.exit(1);
}

const basePath = path.join(__dirname, '..', 'src', 'components', componentName);
const variantsPath = path.join(basePath, 'variants');
const testsPath = path.join(basePath, '__tests__');

const filesToCreate = {
  [`${componentName}.tsx`]: `export const ${componentName} = () => {\n  return <div>${componentName}</div>;\n};\n`,
  [`${componentName}.stories.tsx`]: `import { ${componentName} } from './${componentName}';\n\nexport default {\n  title: 'Components/${componentName}',\n  component: ${componentName},\n};\n\nexport const Default = () => <${componentName} />;\n`,
  'constants.ts': `// Constants for ${componentName}\nexport const EXAMPLE_CONSTANT = 'example';\n`,
  'types.ts': `// Types for ${componentName}\nexport type ExampleType = {\n  id: number;\n  name: string;\n};\n`,
};

if (!fs.existsSync(basePath)) {
  fs.mkdirSync(basePath, { recursive: true });
  console.log(`📁 Created folder: ${basePath}`);
} else {
  console.warn('⚠️ Folder already exists.');
}

Object.entries(filesToCreate).forEach(([filename, content]) => {
  const filePath = path.join(basePath, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`📄 Created file: ${filename}`);
  } else {
    console.warn(`⚠️ File already exists: ${filename}`);
  }
});

if (!fs.existsSync(variantsPath)) {
  fs.mkdirSync(variantsPath);
  console.log(`📁 Created subfolder: ${variantsPath}`);
}
if (!fs.existsSync(testsPath)) {
  fs.mkdirSync(testsPath);
  console.log(`📁 Created subfolder: ${testsPath}`);
}