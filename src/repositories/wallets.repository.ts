import mongodb from "mongodb";
import mongoose from "mongoose";
import Wallet, { IWallet, IWalletPayload } from "../models/wallet.model";

const save = async (
  payload: IWalletPayload,
  session?: mongodb.ClientSession
) => {
  const owner = mongoose.Types.ObjectId(payload.owner);
  let wallet = await Wallet.findOne({ owner: owner });

  if (!wallet) {
    wallet = new Wallet();
    wallet.owner = owner;
  }

  wallet.balance = payload.balance;
  return await wallet.save({ session: session });
};

const getWalletByOwner = async (id: string) => {
  const owner = mongoose.Types.ObjectId(id);
  const result = await Wallet.findOne({ owner });
  if (!result) {
    throw new Error("repository-error/wallets/wallet-not-found");
  }
  return result.toObject();
};

const getSession = async () => {
  return await Wallet.startSession();
};
export default { save, getWalletByOwner, getSession };
