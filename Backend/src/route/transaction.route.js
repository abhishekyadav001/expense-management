const express = require("express");
const transactionModel = require("../model/transaction.model");
const authMiddleware = require("../middleware/auth.middleware");
const userModel = require("../model/users.model");

const transactionRouter = express.Router();
transactionRouter.use(authMiddleware);
transactionRouter.get("/", async (req, res) => {
  const { userID } = req.body;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;
  const totaltransaction = await transactionModel.countDocuments({ userID });

  const totalPages = Math.ceil(totaltransaction / limit);

  try {
    const alltransactions = await transactionModel.find({ userID }).skip(skip).limit(limit).exec();
    res.status(201).send({ msg: "all trasaction history available now", alltransactions, totalPages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

transactionRouter.post("/", async (req, res) => {
  try {
    const { userID, amount, type } = req.body;

    const transaction = await transactionModel.create({ userID, amount, type });
    const currentAmount = await userModel.findById(userID);

    const currentBalance = currentAmount.balance;

    if (type == "Deposit") {
      const newAmount = currentBalance + amount;
      const users = await userModel.findByIdAndUpdate(userID, { $set: { balance: newAmount } });
    } else {
      const newAmount = currentBalance - amount;
      const users = await userModel.findByIdAndUpdate(
        userID,
        { balance: newAmount },
        { new: true, runValidators: true }
      );
      // console.log(users);
    }
    res.status(201).send({ msg: "Transaction Successfull" });
  } catch (error) {
    res.status(401).send(error.message);
  }
});

transactionRouter.put("/:transactionId", async (req, res) => {
  try {
    const { transactionId } = req.params;

    // Check if transactionId is valid
    if (!transactionId || transactionId === "undefined") {
      return res.status(400).json({ message: "Invalid or missing transaction ID" });
    }

    // Find and update the transaction
    const updatedTransaction = await transactionModel.findByIdAndUpdate(transactionId, req.body, { new: true });
    // console.log("updatedTransaction", updatedTransaction);
    const currentAmount = await userModel.findById(userID);

    const currentBalance = currentAmount.balance;

    if (type == "Deposit") {
      const newAmount = currentBalance + amount;
      const users = await userModel.findByIdAndUpdate(userID, { $set: { balance: newAmount } });
    } else {
      const newAmount = currentBalance - amount;
      const users = await userModel.findByIdAndUpdate(
        userID,
        { balance: newAmount },
        { new: true, runValidators: true }
      );
      // console.log(users);
    }
    // Handle case where transaction isn't found
    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: "Error editing transaction", error });
  }
});

transactionRouter.delete("/:transactionId", async (req, res) => {
  try {
    const { transactionId } = req.params;
    await transactionModel.findByIdAndDelete(transactionId);
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction", error });
  }
});

module.exports = transactionRouter;
