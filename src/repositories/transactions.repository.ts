import mongodb from "mongodb";
import mongoose from "mongoose";
import Transcation, { ITranscationPayload } from "../models/transaction.model";

const save = async (
  payload: ITranscationPayload,
  session?: mongodb.ClientSession
) => {
  const currentTranscation = new Transcation();
  currentTranscation.from = mongoose.Types.ObjectId(payload.from);
  currentTranscation.to = mongoose.Types.ObjectId(payload.to);
  currentTranscation.amount = payload.amount;
  return await currentTranscation.save({ session: session });
};

const getSession = async () => {
  return await Transcation.startSession();
};
export default { save, getSession };
