import path from 'path';
import fs from 'fs';
const root = './ter'
//joining path of directory 
const ownerName = ''
const owners = ['Henok m☻vies']

function goToDirectory(directoryPath) {

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            console.log(err)
        }
        else {
            for (const file of files) {
                const filePath = `${directoryPath}\\${file}`
                fs.stat(filePath, async (err, stats) => {
                    if (err) {

                    } else {
                        if (stats.isFile()) {

                            // replace replace owner name
                            let newFileName = ""
                            if (file.includes(owners[0])) {
                                newFileName = file.replace(owners[0], ownerName)
                            }
                            //add owner name
                            else {
                                const indexOfDot = file.lastIndexOf('.')
                                const afterDot = file.slice(indexOfDot)
                                const beforeDot = file.slice(0, indexOfDot)
                                newFileName = `${beforeDot} ${ownerName}${afterDot}`
                            }
                            try {
                                renameFileName(directoryPath, file, newFileName)

                            } catch (error) {
                                console.log(`\n${error}\n`)
                            }
                        } else if (stats.isDirectory()) {
                            let newFolderName = ""
                             // replace owner name
                            if (file.includes(owners[0])) {
                                newFolderName = file.replace(owners[0], ownerName)
                            }
                            //add owner name
                            else{
                                newFolderName = `${file} ${ownerName}`
                            }
                            try {
                                const folderPath = await renameDirectoryName(directoryPath, file, newFolderName)
                                goToDirectory(folderPath);
                            } catch (error) {
                                console.log(error)
                            }
                        } else {

                        }
                    }
                })

            }
        }
    })

}
goToDirectory('C:\\Users\\deep\\Documents\\## romance');

function renameDirectoryName(folderPath, oldFolderName, newFolderName) {
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

function renameFileName(filePath, oldFileName, newFileName) {
    fs.rename(`${filePath}/${oldFileName}`, `${filePath}/${newFileName}`, err => {
        if (err) {
            console.log(`\nError in renaming ${oldFileName} to :\t ${newFileName}`)
        }

        else {
            console.log(`\nSuccessfully renamed from ${oldFileName} to :\t ${newFileName}`)

        }
    })
}