import WalletService from "./wallets.service";
import TransactionRepo from "../repositories/transactions.repository";

const createTranscation = async (from: string, to: string, amount: number) => {
  const session = await TransactionRepo.getSession();
  session.startTransaction();
  try {
    const fromWallet = await WalletService.deductFromWallet(from, amount, {
      session: session,
    });

    const transaction = await TransactionRepo.save(
      { from: from, to: to, amount: amount },
      session
    );
  } catch (e) {
    session.abortTransaction();
    throw e;
  }

  const result = session.commitTransaction();
  return result;
};

export default {
  createTranscation,
};
