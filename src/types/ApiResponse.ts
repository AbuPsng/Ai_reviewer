import { MessageSchemaType } from "@/model/MessageModel";

export interface MessageReponse extends MessageSchemaType {
  _id: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptingMessages?: boolean;
  messages?: Array<MessageReponse>;
  data?: { isAcceptingMessages: boolean };
}
