const db = require('../config/firebase');

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Error creating user
 */
exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUserRef = db.ref('users').push(); // 創建一個新的用戶參考
    await newUserRef.set({ name, email }); // 將數據寫入 Realtime Database
    res.status(201).json({ id: newUserRef.key, name, email });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *       500:
 *         description: Error fetching users
 */
exports.getAllUsers = async (req, res) => {
  try {
    const snapshot = await db.ref('users').once('value'); // 獲取所有用戶
    const users = snapshot.val();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};