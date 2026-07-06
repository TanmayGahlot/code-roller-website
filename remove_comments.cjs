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
      if (dirFile.endsWith('.html') || dirFile.endsWith('.js') || dirFile.endsWith('.css') || dirFile.endsWith('.cjs')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const files = walkSync(rootDir);

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const filteredLines = lines.filter(line => !line.match(/(Bug|Medium|Extreme|Hard):\s/i));
  if (lines.length !== filteredLines.length) {
    fs.writeFileSync(file, filteredLines.join('\n'));
    console.log(`Stripped comments from ${file}`);
  }
}
