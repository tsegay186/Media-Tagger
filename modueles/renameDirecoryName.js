import fs from 'fs';
export function renameDirectoryName(folderPath, oldFolderName, newFolderName) {
    return new Promise(function (resolve, reject) {
        fs.rename(`${folderPath}\\${oldFolderName}`, `${folderPath}\\${newFolderName}`, err => {
            if (err) {
                console.log(`\nfailure in renaming ${oldFolderName} to :\t ${newFolderName}`)
                reject(err)
            }

            else {
                console.log(`\nSuccessfully renamed from ${oldFolderName} to :\t ${newFolderName}`)
                resolve(`${folderPath}\\${newFolderName}`)
            }
        })
    }).then(result => {
        return result
    }).catch(err => {
        return err
    })
}