// Purpose: Node.js script for exporting project as ZIP
const fs = require('fs');
const path = require('path');

// Check if archiver is installed
let archiver;
try {
    archiver = require('archiver');
} catch (e) {
    console.log('Installing archiver...');
    require('child_process').execSync('npm install archiver --save-dev', { stdio: 'inherit' });
    archiver = require('archiver');
}

const projectName = 'probfixora';
const outputPath = path.join(__dirname, '..', `${projectName}.zip`);

console.log(`\n📦 Creating ${projectName}.zip...\n`);

const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', {
    zlib: { level: 9 } // Maximum compression
});

output.on('close', () => {
    const size = (archive.pointer() / 1024).toFixed(2);
    console.log(`\n✅ Successfully created ${projectName}.zip`);
    console.log(`   Size: ${size} KB`);
    console.log(`   Location: ${outputPath}\n`);
});

output.on('end', () => {
    console.log('Data has been drained');
});

archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
        console.warn('Warning:', err);
    } else {
        throw err;
    }
});

archive.on('error', (err) => {
    throw err;
});

archive.pipe(output);

// Files and directories to include
const projectRoot = path.join(__dirname, '..');

// Add specific files
const filesToInclude = [
    'package.json',
    'package-lock.json',
    'tsconfig.json',
    'tsconfig.node.json',
    'vite.config.ts',
    'vitest.config.ts',
    'tailwind.config.js',
    'postcss.config.js',
    'index.html',
    'README.md',
    'LICENSE',
    '.eslintrc.cjs',
    '.gitignore',
    '.env.example',
];

filesToInclude.forEach(file => {
    const filePath = path.join(projectRoot, file);
    if (fs.existsSync(filePath)) {
        archive.file(filePath, { name: file });
        console.log(`  Added: ${file}`);
    }
});

// Add directories
const dirsToInclude = [
    'src',
    'public',
    '.github',
];

dirsToInclude.forEach(dir => {
    const dirPath = path.join(projectRoot, dir);
    if (fs.existsSync(dirPath)) {
        archive.directory(dirPath, dir);
        console.log(`  Added: ${dir}/`);
    }
});

archive.finalize();
