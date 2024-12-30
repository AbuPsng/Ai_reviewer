import { getServerSession, User } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/UserModel";
import { responseObject } from "@/helpers/responseObject";
import mongoose from "mongoose";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return responseObject({
      success: false,
      message: "Not Authenticated",
      statusCode: 401,
    });
  }

  const userId = new mongoose.Types.ObjectId(user._id);
  try {
    const userMessages = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAT": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);

    if (!userMessages || userMessages.length === 0) {
      return responseObject({
        success: true,
        message: "You don't have any messages",
        statusCode: 200,
        messages: [],
      });
    }
    return responseObject({
      success: true,
      message: "Message shown successfully",
      statusCode: 200,
      messages: userMessages[0].messages,
    });
  } catch (error) {
    console.log("", error);
    return responseObject({
      success: false,
      message: "Error while getting user messages",
      statusCode: 401,
    });
  }
}
