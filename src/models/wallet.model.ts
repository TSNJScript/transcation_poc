import mongoose, { Document, Schema } from "mongoose";

export interface IWallet extends Document {
  owner: mongoose.Types.ObjectId;
  balance: number;
}

export interface IWalletPayload {
  owner: string;
  balance: number;
}

const WalletSchema = new Schema({
  owner: {
    required: true,
    type: Schema.Types.ObjectId,
    unique: true,
  },
  balance: {
    required: true,
    type: Number,
    default: 0,
  },
});

export default mongoose.model<IWallet>("wallet", WalletSchema);
