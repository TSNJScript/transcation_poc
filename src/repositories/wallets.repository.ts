import mongodb from "mongodb";
import mongoose from "mongoose";
import Wallet, { IWalletPayload } from "../models/wallet.model";

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
  return await wallet.save();
};

const getWalletByOwner = async (id: string) => {
  const owner = mongoose.Types.ObjectId(id);
  const result = await Wallet.findOne({ owner });
  return result?.toJSON();
};
export default { save, getWalletByOwner };
