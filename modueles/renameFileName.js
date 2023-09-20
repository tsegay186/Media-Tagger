import fs from 'fs';
export function renameFileName(filePath, oldFileName, newFileName) {
    fs.rename(`${filePath}/${oldFileName}`, `${filePath}/${newFileName}`, err => {
        if (err) {
            console.log(`\nError in renaming ${oldFileName} to :\t ${newFileName}`)
        }

        else {
            console.log(`\nSuccessfully renamed from ${oldFileName} to :\t ${newFileName}`)

        }
    })
}