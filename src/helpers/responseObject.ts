import { MessageSchemaType } from "@/model/MessageModel";
import { NextResponse } from "next/server";

interface ResponseTypes {
  success: boolean;
  message: string;
  statusCode: number;
  data?: object | [];
  isAcceptingMessage?: boolean;
  messages?: [MessageSchemaType] | [];
}

export function responseObject({
  success,
  message,
  statusCode,
  data,
  isAcceptingMessage,
  messages,
}: ResponseTypes) {
  return NextResponse.json(
    { success, message, data, isAcceptingMessage, messages },
    { status: statusCode }
  );
}
