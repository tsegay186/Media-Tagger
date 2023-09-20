import fs from 'fs';
import { renameFileName } from './renameFileName.js';
import { renameDirectoryName } from './renameDirecoryName.js';
import {ownerName} from './names.js'
import {owners} from './names.js'

export function goToDirectory(directoryPath) {
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