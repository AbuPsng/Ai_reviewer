import { getServerSession, User } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/UserModel";
import { responseObject } from "@/helpers/responseObject";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request: Request) {
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

  const userId = user?._id;

  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAcceptingMessages: acceptMessages,
      },
      { new: true }
    );

    if (!updatedUser) {
      return responseObject({
        success: false,
        message: "Failed to update user status to accept messages",
        statusCode: 401,
      });
    }

    return responseObject({
      success: true,
      message: "Message acceptance status updated successfully",
      statusCode: 200,
    });
  } catch (error) {
    console.log("Failed to update user status to accept messages", error);
    responseObject({
      success: false,
      message: "Failed to update user status to accept messages",
      statusCode: 500,
    });
  }
}

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

  const userId = user?._id;

  try {
    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      return responseObject({
        success: false,
        message: "User not found",
        statusCode: 404,
      });
    }

    return responseObject({
      success: true,
      message: "Successfully in getting user isAcceptMessages status",
      statusCode: 200,
      data: { isAcceptingMessages: foundUser.isAcceptingMessages },
    });
  } catch (error) {
    console.log(
      "Failed to getting the status of user accepting message",
      error
    );
    return responseObject({
      success: false,
      message: "Failed to getting the status of user accepting message",
      statusCode: 404,
    });
  }
}
