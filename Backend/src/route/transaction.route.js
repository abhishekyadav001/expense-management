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
      console.log(users);
    }
    res.status(201).send({ msg: "Transaction Successfull" });
  } catch (error) {
    res.status(401).send(error.message);
  }
});
module.exports = transactionRouter;
