const fs = require('fs');
const path = require('path');

const sourcePath = path.resolve(__dirname, 'files');
const destinationPath = path.resolve(__dirname, 'files-copy');

fs.mkdir(destinationPath, { recursive: true }, error => {
    if (error) throw error;
});

(async function copyFile() {
    const content = await fs.promises.readdir(sourcePath, { withFileTypes: true })
    for (file of content) {
        const filePath = path.resolve(sourcePath, file.name);
        const copyPath = path.resolve(destinationPath, file.name);
        fs.promises.copyFile(filePath, copyPath, fs.constants.COPYFILE_FICLONE);
    }
})()

// fs.promises.copyFile();