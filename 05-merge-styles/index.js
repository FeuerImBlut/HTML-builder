const fs = require('fs');
const path = require('path');

(async function readDir() {
    const sourcePath = path.resolve(__dirname, 'styles');
    const destinationPath = path.resolve(__dirname, 'project-dist', 'bundle.css');
    const output = fs.createWriteStream(destinationPath, 'utf-8');
    const dir = await fs.promises.readdir(sourcePath, {withFileTypes: true});
    for (const file of dir) {
        if (file.isFile() && path.extname(file.name) == '.css') {
            const filePath = path.resolve(sourcePath, file.name)
            const data = await fs.promises.readFile(filePath, 'utf8');
            output.write(data);
        }
    }
})()