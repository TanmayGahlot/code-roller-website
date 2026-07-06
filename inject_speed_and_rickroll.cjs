const fs = require('fs');
const path = require('path');

const speedGif = "https://www.gifcen.com/wp-content/uploads/2025/11/ishowspeed-gif-6.gif";

const rickrollCode = `
// Anti-Debug System
setInterval(function() {
    const start = Date.now();
    debugger;
    if (Date.now() - start > 100) {
        window.location.href = "https://youtu.be/dQw4w9WgXcQ?si=L7I2IfOlj-sExq8z";
    }
}, 1000);

let devtoolsOpen = false;
setInterval(() => {
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;
    if (widthThreshold || heightThreshold) {
        if (!devtoolsOpen) {
            devtoolsOpen = true;
            window.location.href = "https://youtu.be/dQw4w9WgXcQ?si=L7I2IfOlj-sExq8z";
        }
    }
}, 500);
`;

// Append Rickroll to polyfills.js so it runs everywhere
fs.appendFileSync(path.join(__dirname, 'src/polyfills.js'), rickrollCode);
console.log("Injected Rickroll DevTools detector into src/polyfills.js");

// Randomly inject IShowSpeed gifs
const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      if (!dirFile.includes('node_modules') && !dirFile.includes('.git') && !dirFile.includes('dist')) {
        filelist = walkSync(dirFile, filelist);
      }
    } else {
      if (dirFile.endsWith('.html') || dirFile.endsWith('.js') || dirFile.endsWith('.css')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const files = walkSync(__dirname);

files.forEach(file => {
    // Only inject randomly (30% chance per file)
    if (Math.random() < 0.3) {
        let content = fs.readFileSync(file, 'utf8');
        
        let injection = "";
        if (file.endsWith('.html')) injection = `<!-- ${speedGif} -->\n`;
        else if (file.endsWith('.js')) injection = `// ${speedGif}\n`;
        else if (file.endsWith('.css')) injection = `/* ${speedGif} */\n`;

        // Inject at random line
        let lines = content.split('\n');
        const randomLine = Math.floor(Math.random() * lines.length);
        lines.splice(randomLine, 0, injection);

        fs.writeFileSync(file, lines.join('\n'));
        console.log(`Injected IShowSpeed GIF into ${file} at line ${randomLine}`);
    }
});
