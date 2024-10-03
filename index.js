const express = require('express');
const userRoutes = require('./routes/userRoutes.js');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = process.env.PORT || 3000;

// Swagger 設定
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // 使用 OpenAPI 3.0.0
    info: {
      title: 'My API', // API 標題
      version: '1.0.0', // API 版本
      description: 'API documentation for my Express app', // 描述
    },
    servers: [
      {
        url: `http://localhost:${port}/api`, // 基本 URL
      },
    ],
  },
  apis: ['./routes/*.js'], // 指向包含註解的路由文件
};

// 創建 Swagger 文檔
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// 使用 Swagger UI 中介軟體
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(express.json()); // 解析 JSON 請求體

// Routes
app.use('/api/users', userRoutes);

// 啟動服務
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
});