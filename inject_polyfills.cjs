const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      if (!dirFile.includes('node_modules') && !dirFile.includes('.git') && !dirFile.includes('dist')) {
        filelist = walkSync(dirFile, filelist);
      }
    } else {
      if (dirFile.endsWith('.html')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const htmlFiles = walkSync(rootDir);

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('polyfills.js')) {
    content = content.replace('</head>', '  <script src="/src/polyfills.js"></script>\n</head>');
    fs.writeFileSync(file, content);
    console.log(`Injected polyfill into ${file}`);
  }
}
