import { responseObject } from "@/helpers/responseObject";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/UserModel";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ messageid: string }>;
  }
) {
  const message = await params;
  const { messageid: messageId } = message;
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
  try {
    const updateResult = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: messageId } } }
    );

    if (updateResult.modifiedCount === 0) {
      return responseObject({
        success: false,
        message: "Message not found or already deleted",
        statusCode: 404,
      });
    }

    return responseObject({
      success: true,
      message: "Message deleted successfully",
      statusCode: 201,
    });
  } catch (error) {
    console.log("Error while deleting message", error);
    responseObject({
      success: false,
      message: "Error while deleting message",
      statusCode: 500,
    });
  }
}
