const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    amount: { type: Number, required: true, min: 1 },
    type: { type: String, enums: ["Deposit", "Withdraw"], required: true },
  },
  { timestamps: true }
);
const transactionModel = mongoose.model("transaction", transactionSchema);
module.exports = transactionModel;
