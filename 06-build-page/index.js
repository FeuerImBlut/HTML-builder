const fs = require('fs');
const path = require('path');

async function buildHTML() {
    const destinationPath = path.resolve(__dirname, 'project-dist');
    await fs.promises.mkdir(destinationPath, {recursive: true});
    await copyFolder(dir, 'assets');
}

async function copyFolder(source, destination) {
    const destinationPath = path.resolve(source, destination);
    await fs.promises.mkdir(destinationPath);
    const content = fs.promises.readdir(source, {withFileTypes: yes});
    
}

