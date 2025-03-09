const axios = require('axios')

const getQuote = async (symbol) => {
    const url = `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/quotes?ticker=${symbol}`
    const options = {
      method: 'GET',
      headers: {
        // 'x-rapidapi-key': 'bd6e6d157amshf36e3d1c4bbb870p1f530ejsnd25bf5616122',
        // 'x-rapidapi-key': '42a6008624msh224c2981b9a51bep18feb0jsnbdace659d65b',
        'x-rapidapi-key': 'f9b3d75535msh5a506f5b6c431b3p1a8884jsn20fc2808b1a4',
        'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com'
      }
    }
  
    try {
      const response = await axios.get(url, options)
      return response.data.body
    } catch (error) {
      console.error('Error fetching data from RapidAPI:', error)
      return []
    }
  }

const getSummary = async  (symbol) => {
    const options = {
        method: 'GET',
        url: 'https://yahoo-finance-api-data.p.rapidapi.com/summary/symbol-profile',
        params: {symbol: symbol},
        headers: {
            'x-rapidapi-key': 'bd6e6d157amshf36e3d1c4bbb870p1f530ejsnd25bf5616122',
            'x-rapidapi-host': 'yahoo-finance-api-data.p.rapidapi.com',
        },
    };

    try {
        const response = await axios.request(options)
        return response.data.data
    } catch (error) {
        console.error('Error fetching data from RapidAPI Summary:', error)
        return {}
    }
}

module.exports = {getQuote, getSummary}