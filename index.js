const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const port = 3000;

// Middleware to parse JSON request body
app.use(express.json());

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Simple Express API',
      version: '1.0.0',
      description: 'A simple Express API documented with Swagger',
      contact: {
        name: 'Developer',
      },
      servers: [{ url: 'http://localhost:3000' }],
    },
  },
  apis: ['./index.js'], // Files containing annotations for API documentation
};

// Initialize swagger-jsdoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Setup the swagger UI
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// A simple route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Get a simple message from the API
 *     responses:
 *       200:
 *         description: A JSON object with a message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
app.get('/api', (req, res) => {
  res.json({ message: 'This is your first API route!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});