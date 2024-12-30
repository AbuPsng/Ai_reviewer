import { responseObject } from "@/helpers/responseObject";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/UserModel";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return responseObject({
        success: false,
        message: "User not found",
        statusCode: 404,
      });
    }

    if (!user.isAcceptingMessages) {
      return responseObject({
        success: false,
        message: "User is not the accepting messages",
        statusCode: 403,
      });
    }

    const newMessage = { content, createdAt: new Date() };

    user.messages.push(newMessage);
    await user.save();
    return responseObject({
      success: true,
      message: "Message sent successfully",
      statusCode: 200,
    });
  } catch (error) {
    console.log("Error while sending messages", error);
    return responseObject({
      success: false,
      message: "Error while sending messages",
      statusCode: 401,
    });
  }
}
