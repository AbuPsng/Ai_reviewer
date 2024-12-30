import { Document, Schema } from "mongoose";

export interface MessageSchemaType extends Document {
  content: string;
  createdAt: Date;
}

export const MessageSchema: Schema<MessageSchemaType> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
