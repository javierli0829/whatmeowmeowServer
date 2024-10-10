const express = require('express');
const taiwanStockController = require('../controllers/taiwanStockController');
const router = express.Router();

/**
 * @swagger
 * /taiwanStock/{symbol}:
 *   get:
 *     summary: Get the real-time quote for a Taiwan stock
 *     description: Fetches the real-time price, high, low, and volume of the specified Taiwan stock.
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         description: Stock symbol (e.g., 2330 for TSMC).
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A JSON object with the stock's quote
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 price:
 *                   type: number
 *                 change:
 *                   type: number
 *                 changePercent:
 *                   type: number
 *                 high:
 *                   type: number
 *                 low:
 *                   type: number
 *                 volume:
 *                   type: number
 *       404:
 *         description: Stock not found
 *       500:
 *         description: Error fetching stock data
 */
router.get('/:symbol', taiwanStockController.getStockQuote);

module.exports = router;