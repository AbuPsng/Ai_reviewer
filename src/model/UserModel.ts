import mongoose, { Document, Schema } from "mongoose";
import { MessageSchema, MessageSchemaType } from "./MessageModel";

export interface UserSchemaType extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: MessageSchemaType[];
}

const UserSchema: Schema<UserSchemaType> = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    password: { type: String, required: [true, "Password is required"] },
    verifyCode: { type: String, required: [true, "Verify Code is required"] },
    verifyCodeExpiry: {
      type: Date,
      required: [true, "Verify Code expiry is required"],
    },
    isVerified: { type: Boolean, default: false },
    isAcceptingMessages: { type: Boolean, default: true },
    messages: {
      type: [MessageSchema],
      default: [],
    },
  },
  { strict: true }
);

const UserModel =
  mongoose.models.user || mongoose.model<UserSchemaType>("user", UserSchema);

export default UserModel;
