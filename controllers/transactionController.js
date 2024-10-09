const db = require('../config/firebase');

exports.addTransaction = async (req, res) => {
  const { type, amount, description, timestamp } = req.body;
  try {
    const newTransactionRef = db.ref('transactions').push();
    await newTransactionRef.set({ type, amount, description, timestamp });
    res.status(201).json({ id: newTransactionRef.key ,type, amount, description, timestamp });
  }catch (error) {
    res.status(500).json({ message: 'Error creating transaction', error });
  }
};

exports.getTrasactions = async (req, res) => {
  const { timestamp } = req.body;
  try {
    const snapshot = await db.ref('transactions').once('value');
    const transactions = snapshot.val();

    const transactionsArray = transactions ? Object.values(transactions) : [];

    const filteredTransactions = transactionsArray.filter(transaction => {
      return new Date(transaction.timestamp).toLocaleDateString() === new Date(timestamp).toLocaleDateString();
    });

    res.status(200).json(filteredTransactions);
  }catch (error){
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
}