const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

['dist', 'public'].forEach(folder => {
  const targetDir = path.join(__dirname, folder);
  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
  }
  fs.mkdirSync(targetDir, { recursive: true });
  fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(targetDir, 'index.html'));
  copyDir(path.join(__dirname, 'assets'), path.join(targetDir, 'assets'));
  console.log(`Generated ${folder}/ directory with index.html and assets.`);
});

console.log('Build complete! Both dist/ and public/ are ready.');

