var fs = require('fs');
var path = require('path');

var envFile = '.env';
if (!fs.existsSync(envFile)) {
  console.error('ERROR: No existe ' + envFile + '. Copia .env.example a .env y completa los valores.');
  process.exit(1);
}

var env = {};
fs.readFileSync(envFile, 'utf8').split('\n').forEach(function(line) {
  line = line.trim();
  if (!line || line.startsWith('#')) return;
  var idx = line.indexOf('=');
  if (idx === -1) return;
  env[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
});

var srcDir = 'src';
var outDir = 'public';

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(path.join(outDir, 'admin'))) fs.mkdirSync(path.join(outDir, 'admin'), { recursive: true });

var files = [
  { src: 'index.template.html', out: 'index.html' },
  { src: path.join('admin', 'index.template.html'), out: path.join('admin', 'index.html') }
];

files.forEach(function(f) {
  var srcPath = path.join(srcDir, f.src);
  if (!fs.existsSync(srcPath)) {
    console.warn('WARN: No existe ' + srcPath + ', se omite');
    return;
  }
  var content = fs.readFileSync(srcPath, 'utf8');
  content = content.replace(/__FIREBASE_API_KEY__/g, env.FIREBASE_API_KEY || '')
                   .replace(/__FIREBASE_AUTH_DOMAIN__/g, env.FIREBASE_AUTH_DOMAIN || '')
                   .replace(/__FIREBASE_DATABASE_URL__/g, env.FIREBASE_DATABASE_URL || '')
                   .replace(/__FIREBASE_PROJECT_ID__/g, env.FIREBASE_PROJECT_ID || '')
                   .replace(/__FIREBASE_STORAGE_BUCKET__/g, env.FIREBASE_STORAGE_BUCKET || '')
                   .replace(/__FIREBASE_MESSAGING_SENDER_ID__/g, env.FIREBASE_MESSAGING_SENDER_ID || '')
                   .replace(/__FIREBASE_APP_ID__/g, env.FIREBASE_APP_ID || '')
                   .replace(/__ADMIN_EMAIL__/g, env.ADMIN_EMAIL || 'admin@cudibi.es');
  var outPath = path.join(outDir, f.out);
  fs.writeFileSync(outPath, content, 'utf8');
  console.log('✓ Generado: ' + outPath);
});

console.log('Build completo. Abre public/index.html en tu navegador.');
