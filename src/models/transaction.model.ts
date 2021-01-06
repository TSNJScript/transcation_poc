import mongoose, { Document, Schema } from "mongoose";

export interface ITranscationPayload {
  from: string;
  to: string;
  amount: number;
}

export interface ITranscation extends Document {
  from: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
  amount: number;
  state: "pending" | "completed" | "cancel";
}

const TranscationSchema = new Schema(
  {
    from: {
      required: true,
      type: Schema.Types.ObjectId,
    },
    to: {
      required: true,
      type: Schema.Types.ObjectId,
    },
    amount: {
      required: true,
      type: Number,
    },
    state: {
      required: true,
      type: String,
      enum: ["pending", "completed", "cancel"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITranscation>("transcation", TranscationSchema);
