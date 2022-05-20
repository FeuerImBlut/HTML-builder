const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const filePath = path.resolve(__dirname, 'text.txt');
const output = fs.createWriteStream(filePath, 'utf-8');

stdout.write('Enter text to add in the file:');

process.on('SIGINT', () => {
    stdout.write('\nSee you next time.');
    process.exit();
})

stdin.on('data', (data) => {
    // console.log(data.toString());
    if (data.includes('exit')) {
        output.write(data.toString().slice(0,-6));
        process.emit('SIGINT');
    }
    else output.write(data);
});