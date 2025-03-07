const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  getData: async (url, tag) => {
    if (!url || !tag) {
      return { msg: 'Invalid URL or tag' };
    }

    try {
    //This is to Ignore SSL errors
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; 

      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }
      });
      const html = response.data;
      const $ = cheerio.load(html);
      const data = [];

      $(tag).each((index, element) => {
        data.push({
          text: $(element).text(),
          html: $(element).html(),
        });
      });

      return data;
    } catch (error) {
      return { message: "Error accessing the URL", error };
    }
  }
};
