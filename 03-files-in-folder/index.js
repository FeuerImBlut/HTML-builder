const fs = require('fs');
const path = require('path');

(async function readDir() {
    const folderPath = path.resolve(__dirname, 'secret-folder');
    try {
        const dir = await fs.promises.readdir(folderPath, { withFileTypes: true });
        for await (const dirObj of dir) {
            if (dirObj.isFile()) {
                let extName = path.extname(dirObj.name);
                let fileName = path.basename(dirObj.name, extName);
                const fileStat = await fs.promises.stat(path.resolve(folderPath, dirObj.name));
                console.log(`${fileName} - ${extName.slice(1)} - ${fileStat.size}`);
                
            }
        }
    }
    catch (err) {
        console.log(err);
    }
    return;
})()