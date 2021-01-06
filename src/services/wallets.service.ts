import mongodb from "mongodb";
import WalletRepo from "../repositories/wallets.repository";

const deductFromWallet = async (
  ownerId: string,
  amount: number,
  options?: { session?: mongodb.ClientSession }
) => {
  const wallet = await WalletRepo.getWalletByOwner(ownerId);

  if (wallet.balance < amount) {
    throw new Error("service-error/wallet/insufficient-fund");
  }

  wallet.balance -= amount;

  const obj = {
    owner: wallet.owner.toHexString(),
    balance: wallet.balance,
  };

  const result = await WalletRepo.save(obj, options?.session);
  return result;
};

export default {
  deductFromWallet,
};
