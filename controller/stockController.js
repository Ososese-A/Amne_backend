const { getQuote, getSummary } = require('../helper/fetchFromRapidAPI');
const readAssetsFromFile = require('../helper/readAssetsFromFile');
const { updateNasdaqAssets } = require('../service/assetsUpdateService');
const alpaca = require('../utility/alpacaAuthUtility')

// const getStockList = async (req, res) => {
//     try {
//         const activeAssets = await alpaca.getAssets({status: "active",})
//         const nasdaqAssets = activeAssets.filter(
//                 (asset) => asset.exchange == "NASDAQ"
//                 );
//         // console.log(nasdaqAssets)
//         res.status(200).json({nasdaqAssets})
//     } catch (error) {
//         console.log(error)
//         res.status(500).send(error.message)
//     }
// }


// const getStockList = async (req, res) => {
//     try {
//         const nasdaqAssets = await readAssetsFromFile();


//         //pagination 
//         const page = parseInt(req.query.page) || 1
//         const limit = parseInt(req.query.limit) || 5
//         const startIndex = (page - 1) * limit
//         const ednIndex = page * limit

//         const paginatedAssets = nasdaqAssets.slice(startIndex, ednIndex)

//         //to get the symbols for the paginated asssets
//         const stock = paginatedAssets.map(asset => ({
//             symbol: asset.symbol,
//             name: asset.name
//           }))


//         // console.log(nasdaqAssets)
//         res.status(200).json({
//             page: page,
//             limit: limit,
//             totalAssets: nasdaqAssets.length,
//             // assets: paginatedAssets
//             assets: stock
//             // nasdaqAssets
//         })

//         // updateNasdaqAssets()
//     } catch (error) {
//         console.log(error)
//         res.status(500).send(error.message)
//     }
// }

const getStockList = async (req, res) => {
    try {
        const nasdaqAssets = await readAssetsFromFile();

        //to get the symbols for the paginated asssets
        const shares = nasdaqAssets.map(asset => ({
            symbol: asset.symbol,
            name: asset.name
          }))


        res.status(200).json({
            assets: shares
        })

        // updateNasdaqAssets()
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

setInterval(updateNasdaqAssets, 15 * 60 * 1000)

// const getStockInfo = async (req, res) => {
//     const stock = req.query.stock
//     let stockInfo = {}
//     console.log(stock)
//     try {
//         await alpaca.getAsset(`${stock}`)
//         if (stockCheck.tradable) {
//             console.log(`We can trade ${stock}.`);
//             // console.log(stockCheck);
//             stockInfo = stockCheck
//           }

//           res.status(200).json(stockInfo)
//     } catch (error) {
//         console.log(error)
//         res.status(500).send(error.message)
//     }
// }

const getStockInfo = async (req, res) => {
    const symbol = req.query.symbol
    try {
        const quoteData = await getQuote(symbol)
        const summary = await getSummary(symbol)
        // console.log(quoteData)

        const stockData = {
            name: quoteData[0].longName,
            symbol: quoteData[0].symbol,
            regularMarketChange: quoteData[0].regularMarketChange,
            regularMarketPrice: quoteData[0].regularMarketPrice,
            regularMarketChangePercent: quoteData[0].regularMarketChangePercent,
            regularMarketTime: quoteData[0].regularMarketTime,
            stockInfo: summary.longBusinessSummary
        }
        console.log(stockData)
        res.status(200).json(stockData)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

const getStockNumbers = async (req, res) => {
    const symbol = req.query.symbol
    try {
        const quoteData = await getQuote(symbol)
        // console.log(quoteData)

        const stockData = {
            regularMarketChange: quoteData[0].regularMarketChange,
            regularMarketPrice: quoteData[0].regularMarketPrice,
            regularMarketChangePercent: quoteData[0].regularMarketChangePercent,
            regularMarketTime: quoteData[0].regularMarketTime,
        }
        console.log(stockData)
        res.status(200).json(stockData)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}
module.exports = {getStockList, getStockInfo, getStockNumbers}