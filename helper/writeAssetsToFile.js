const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'exchanges')
const filePath = path.join(directoryPath, 'nasdaqAssets.json');

if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, {recursive: true})
}

const writeAssetsToFile = (assets) => {
    fs.writeFile(filePath, JSON.stringify(assets), (err) => {
      if (err) {
        console.log('Error writing to file', err)
      } else {
        console.log('Assets written to file successfully')
      }
    })
  }

module.exports = writeAssetsToFile