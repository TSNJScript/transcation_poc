import mongoose, { Document, Schema } from "mongoose";

export interface IUserPayload {
  name: string;
}
export interface IUser extends Document {
  name: string;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IUser>("user", UserSchema);
