const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController.js');

/**
 * @swagger
 * /transactions/add:
 *   post:
 *     summary: Create a new transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *               timestamp:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       500:
 *         description: Error creating transaction
 */
router.post('/add', transactionController.addTransaction);

/**
 * @swagger
 * /transactions/find:
 *   post:
 *     summary: Find a transaction on a certain date
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               timestamp:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transaction found successfully
 *       500:
 *         description: Error finding transaction
 */
router.post('/find', transactionController.getTrasactions);

module.exports = router;