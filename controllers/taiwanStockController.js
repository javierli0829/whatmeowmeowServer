const yahooFinance = require('yahoo-finance2').default;

// Controller to fetch stock data from Yahoo Finance API
exports.getStockQuote = async (req, res) => {
  try {
    const stockSymbol = req.params.symbol;

    // Validate the stock symbol
    if (!stockSymbol) {
      return res.status(400).json({ message: 'Stock symbol is required' });
    }

    // Fetch stock data from Yahoo Finance
    const results = await yahooFinance.quote(stockSymbol);

    // Check if results are available
    if (!results) {
      return res.status(404).json({ message: `No data found for stock symbol: ${stockSymbol}` });
    }

    // Respond with the stock data
    res.status(200).json({
      price: results.regularMarketPrice, 
      change: results.regularMarketChange, 
      changePercent: results.regularMarketChangePercent,
      high: results.regularMarketDayHigh,
      low: results.regularMarketDayLow,
      volume: results.regularMarketVolume,
    });
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Error fetching stock data:', error.message);
    res.status(500).json({ message: 'Error fetching stock data', error: error.message });
  }
};