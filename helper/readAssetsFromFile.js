const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'exchanges')
const filePath = path.join(directoryPath, 'nasdaqAssets.json');

if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, {recursive: true})
}

const readAssetsFromFile = () => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject('Error reading from file: ' + err)
        } else {
          try {
            const parsedData = JSON.parse(data)
            resolve(parsedData)
          } catch (parseErr) {
            reject('Error parsing JSON data: ' + parseErr)
          }
        }
      })
    })
  }

module.exports = readAssetsFromFile