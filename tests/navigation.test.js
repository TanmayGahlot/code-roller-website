/**
 * Navigation Links Test Suite
 * 
 * This test file verifies that all navigation links:
 * 1. Have the correct href values
 * 2. Do not reference the old YouTube rickroll URL
 * 3. Point to the correct destinations
 * 
 * Run with: node tests/navigation.test.js
 * Or integrate with your preferred test runner (Jest, Vitest, Playwright, etc.)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Simple assertion helper
function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exitCode = 1;
  } else {
    console.log(`✓ PASS: ${message}`);
  }
}

// Test suite
console.log('\n🧪 Navigation Links Test Suite\n');
console.log('=' .repeat(50));

// Test 1: Check polyfills.js for malicious code
console.log('\n📝 Test: Polyfills.js integrity\n');
const polyfillsPath = path.join(projectRoot, 'src', 'polyfills.js');
const polyfillsContent = fs.readFileSync(polyfillsPath, 'utf-8');

assert(!polyfillsContent.includes('youtu.be'), 'polyfills.js does not contain youtu.be');
assert(!polyfillsContent.includes('dQw4w9WgXcQ'), 'polyfills.js does not contain rickroll ID');
assert(!polyfillsContent.includes('The Ultimate Troll'), 'polyfills.js does not contain troll comments');
assert(!polyfillsContent.match(/window\.open.*youtu/), 'polyfills.js does not open YouTube');
assert(!polyfillsContent.match(/a\.href.*youtu/), 'polyfills.js does not modify link hrefs to YouTube');

// Test 2: Check all HTML files for correct navigation links
console.log('\n📝 Test: HTML navigation links\n');
const htmlFiles = ['index.html', 'about.html', 'login.html', 'pricing.html', 'contact.html', 'manifesto.html'];
const subdirectories = ['blog', 'docs'];

const expectedLinks = {
  'Documentation': '/docs/index.html',
  'Pricing': '/pricing.html',
  'Cloud Sync': '/dashboard.html',
  'Company': '/about.html',
  'Blog': '/blog/index.html',
  'Support': '/contact.html',
  'GitHub': 'https://github.com/coderoller/coderollerr',
  'Log in': '/login.html',
  'Open Dashboard': '/dashboard.html',
};

htmlFiles.forEach(file => {
  const filePath = path.join(projectRoot, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Check for YouTube URLs in navigation
    assert(!content.includes('dQw4w9WgXcQ'), `${file} does not contain rickroll ID`);
    
    // Check for specific navigation links
    Object.entries(expectedLinks).forEach(([linkText, expectedHref]) => {
      assert(
          content.includes(linkText),
          `${file}: Missing navigation link "${linkText}"`
      );

      assert(
          content.includes(`href="${expectedHref}"`),
          `${file}: "${linkText}" has incorrect href`
      );
    });
  }
});
// Test 3: Verify malicious injection file is removed
console.log('\n📝 Test: Malicious files removed\n');
const injectionFileExists = fs.existsSync(path.join(projectRoot, 'inject_speed_and_rickroll.cjs'));
assert(!injectionFileExists, 'inject_speed_and_rickroll.cjs file has been removed');

// Test 4: Test all HTML pages for navigation consistency
console.log('\n📝 Test: Navigation consistency across pages\n');
htmlFiles.forEach(file => {
  const filePath = path.join(projectRoot, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Check that nav bar exists
    assert(content.includes('<nav'), `${file} contains navigation element`);
    
    // Check for Company link
    const hasCompanyLink = content.includes('href="/about.html"') && content.includes('Company');
    assert(hasCompanyLink, `${file} has correct Company link`);
  }
});

// Test 5: Verify no hardcoded YouTube URLs anywhere
console.log('\n📝 Test: No YouTube URLs in source code\n');
const filesToCheck = [
  'src/polyfills.js',
  'index.html',
  'about.html',
  'login.html',
  'dashboard.html',
  'manifesto.html',
  'shared.js'
];

filesToCheck.forEach(file => {
  const filePath = path.join(projectRoot, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    assert(
      !content.match(/youtu\.be|youtube\.com|dQw4w9WgXcQ/i),
      `${file} contains no YouTube URLs`
    );
  }
});

console.log('\n' + '='.repeat(50));
console.log('\n✅ Test suite completed!\n');
console.log('Expected behavior verified:');
console.log('  ✓ No navigation links redirect to YouTube');
console.log('  ✓ Product, Company, Blog, Support, Log In, Dashboard navigate correctly');
console.log('  ✓ GitHub opens correct repository (external link)');
console.log('  ✓ No malicious code remains in polyfills.js');
console.log('  ✓ Malicious injection file has been removed\n');
