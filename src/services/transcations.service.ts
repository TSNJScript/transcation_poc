import Transaction from "../models/transaction.model";
import Wallet from "../models/wallet.model";
import mongodb from "mongodb";

const createTranscation = async (from: string, to: string, amount: number) => {
  const session = await Wallet.startSession();

  try {
    session.startTransaction();

    await Wallet.updateOne(
      { owner: from },
      { $inc: { balance: -Math.abs(amount) } },
      { session: session }
    );

    const senderWallet = await Wallet.findOne({ owner: from }).session(session);

    if (!senderWallet || senderWallet.balance < 0) {
      throw new Error("service-error/insufficient-fund");
    }

    await Wallet.updateOne(
      { owner: to },
      { $inc: { balance: Math.abs(amount) } },
      { session: session }
    );

    const transaction = await Transaction.create({
      from: from,
      to: to,
      amount: amount,
    });

    if (!transaction) {
      throw new Error("service-error/failed-to-create-transaction");
    }

    await session.commitTransaction();
  } catch (e) {
    await session.abortTransaction();
    console.error(e);
  }
  session.endSession();
};

export default {
  createTranscation,
};
