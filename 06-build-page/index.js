const fs = require('fs');
const path = require('path');

(async function buildHTML() {
    const destinationPath = path.resolve(__dirname, 'project-dist');
    try { await fs.promises.stat(destinationPath); }
    catch (err) {
        await fs.promises.mkdir(destinationPath, { recursive: true });
    }
    copyFolder(path.resolve(__dirname, 'assets'), path.resolve(destinationPath, 'assets'));
    mergeFiles(path.resolve(__dirname, 'styles'), destinationPath);
    placeTags(__dirname, path.resolve(__dirname, 'components'), destinationPath);
})()

async function copyFolder(source, destination) {
    try { await fs.promises.stat(destination) }
    catch (err) {
        await fs.promises.mkdir(destination);
    }
    const content = await fs.promises.readdir(source, { withFileTypes: true });
    for await (const file of content) {
        if (!file.isFile()) {
            copyFolder(path.resolve(source, file.name), path.resolve(destination, file.name));
        }
        else {
            const sourceFile = path.resolve(source, file.name);
            const destinationFile = path.resolve(destination, file.name);
            await fs.promises.copyFile(sourceFile, destinationFile, fs.constants.COPYFILE_FICLONE);
        }
    }
}

async function mergeFiles(source, destination) {
    const destinationFile = path.resolve(destination, 'style.css');
    const output = fs.createWriteStream(destinationFile, 'utf-8');
    const files = await fs.promises.readdir(source, { withFileTypes: true });
    for await (const file of files) {
        if (file.isFile() && path.extname(file.name) == '.css') {
            const data = await fs.promises.readFile(path.resolve(source, file.name), 'utf-8');
            output.write(data);
        }
    }
}

async function placeTags(template, components, destination) {
    const destinationFile = path.resolve(destination, 'index.html');
    let data = await fs.promises.readFile(path.resolve(__dirname, 'template.html'), 'utf8');
    const output = fs.createWriteStream(destinationFile, 'utf-8');
    const files = await fs.promises.readdir(path.resolve(__dirname, components), { withFileTypes: true });
    for await (const file of files) {
        if (file.isFile() && path.extname(file.name) == '.html') {
            const replaceData = await fs.promises.readFile(path.resolve(components, file.name), 'utf-8');
            let tag = path.basename(file.name, path.extname(file.name));
            data = data.replace(`{{${tag}}}`, replaceData);
            
        }
    }
    output.write(data);
}