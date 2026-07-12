import { execFileSync, execSync } from 'child_process';
import { existsSync, rmSync, mkdirSync, cpSync, copyFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');

function step(label, fn) {
  process.stdout.write(`- ${label}... `);
  fn();
  console.log('ok');
}

try {
  step('Installing dependencies', () => {
    execSync('npm install', { cwd: __dirname, stdio: 'pipe' });
  });

  step('Checking server.js syntax', () => {
    execFileSync(process.execPath, ['--check', path.join(__dirname, 'server.js')], { stdio: 'pipe' });
  });

  step('Checking res/script.js syntax', () => {
    execFileSync(process.execPath, ['--check', path.join(__dirname, 'res', 'script.js')], { stdio: 'pipe' });
  });

  step('Verifying static assets exist', () => {
    for (const file of ['res/index.html', 'res/style.css', 'res/script.js']) {
      if (!existsSync(path.join(__dirname, file))) {
        throw new Error(`Missing required file: ${file}`);
      }
    }
  });

  step('Creating dist/', () => {
    rmSync(distDir, { recursive: true, force: true });
    mkdirSync(distDir);
    copyFileSync(path.join(__dirname, 'server.js'), path.join(distDir, 'server.js'));
    copyFileSync(path.join(__dirname, 'package.json'), path.join(distDir, 'package.json'));
    if (existsSync(path.join(__dirname, 'package-lock.json'))) {
      copyFileSync(path.join(__dirname, 'package-lock.json'), path.join(distDir, 'package-lock.json'));
    }
    cpSync(path.join(__dirname, 'res'), path.join(distDir, 'res'), { recursive: true });
  });

  console.log(`\nBuild passed. Deployable output at ${distDir}`);
} catch (err) {
  console.log('FAILED');
  console.error(err.message);
  process.exit(1);
}
