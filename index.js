const express = require('express');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes.js');
const taiwanStockRoutes = require('./routes/taiwanStockRoutes.js');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON request body

// Enable CORS
app.use(cors({
  origin: '*', // Specify allowed origins, or use '*' to allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true // Enable this option if requests require cookies or credentials
}));

// Handle preflight requests (OPTIONS) for all routes
app.options('*', cors());

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for my Express app',
    },
    servers: [
      {
        url: `http://localhost:${port}`, // Base URL
      },
    ],
  },
  apis: ['./routes/*.js'], // Pointing to route files containing comments
};

// Create Swagger documentation
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Use Swagger UI middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/transactions', transactionRoutes);
app.use('/taiwanStock', taiwanStockRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
});