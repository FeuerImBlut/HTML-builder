const fs = require('fs');
const path = require('path');

(async function copyFile() {
    const sourcePath = path.resolve(__dirname, 'files');
    const destinationPath = path.resolve(__dirname, 'files-copy');
    try {
        await fs.promises.stat(destinationPath);
        await fs.promises.rm(destinationPath, { recursive: true });
        await fs.promises.mkdir(destinationPath, { recursive: true });
    }
    catch (err) {
        await fs.promises.mkdir(destinationPath, { recursive: true });
    }

    await fs.promises.mkdir(destinationPath, { recursive: true }, error => {
        if (error) console.log(error);
    });
    const content = await fs.promises.readdir(sourcePath, { withFileTypes: true })
    for (file of content) {
        const filePath = path.resolve(sourcePath, file.name);
        const copyPath = path.resolve(destinationPath, file.name);
        fs.promises.copyFile(filePath, copyPath, fs.constants.COPYFILE_FICLONE);
    }
})()