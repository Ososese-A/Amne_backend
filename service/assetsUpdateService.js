const writeAssetsToFile = require('../helper/writeAssetsToFile')
const alpaca = require('../utility/alpacaAuthUtility')

module.exports = {
    updateNasdaqAssets: async () => {
        try {
            const activeAssets = await alpaca.getAssets({ status: 'active' })
            const nasdaqAssets = activeAssets.filter((asset) => asset.exchange == 'NASDAQ')
            //write asstest to file
            writeAssetsToFile(nasdaqAssets)
        } catch (error) {
            console.log('Error updating assets', error)
        }
    }
}