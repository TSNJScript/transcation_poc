import mongodb from "mongodb";
import User, { IUserPayload } from "../models/user.model";

const saveUser = async (
  payload: IUserPayload,
  session?: mongodb.ClientSession
) => {
  const user = new User(payload);
  const result = await user.save();
  return result.toObject();
};

export default {
  saveUser,
};
