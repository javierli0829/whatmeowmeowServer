const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // 解析 JSON 請求體

// 啟用 CORS
app.use(cors({
  origin: 'http://localhost:4200', // 指定允許的來源，或使用 '*' 允許所有來源
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 允許的 HTTP 方法
  allowedHeaders: ['Content-Type', 'Authorization'], // 允許的標頭
  credentials: true // 如果請求需要 cookie 或憑證，啟用此選項
}));

// 處理所有路由的預檢請求（OPTIONS）
app.options('*', cors());

// Swagger 設定
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

// Routes
app.use('/api/users', userRoutes);

// 啟動服務
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
});