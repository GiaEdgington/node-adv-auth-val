const fs = require('fs');

const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.log('not erased');
            throw (err);
        }
    });
}

exports.deleteFile = deleteFile;