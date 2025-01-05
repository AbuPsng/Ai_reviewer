import { responseObject } from "@/helpers/responseObject";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/UserModel";

export async function GET() {
  await dbConnect();
  try {
    const allUsers = await UserModel.find({}).select(
      "-verifyCode -verifyCodeExpiry -isVerified -messages -__v -password"
    );

    if (allUsers.length === 0) {
      return responseObject({
        success: true,
        message: "No user to show",
        statusCode: 200,
      });
    }

    return responseObject({
      success: true,
      message: "All users fetch successfully",
      statusCode: 200,
      data: allUsers,
    });
  } catch (error: any) {
    console.log(error);
    return responseObject({
      success: false,
      message: `Failed to fetch users, error: ${error.message}`,
      statusCode: 500,
    });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username } = await request.json();

    if (username === "") {
      const user = await UserModel.find({}).select(
        "-verifyCode -verifyCodeExpiry -isVerified -messages -__v -password -email"
      );
      return responseObject({
        success: true,
        message: "User successfully",
        statusCode: 200,
        data: user,
      });
    }

    const lowerCaseUsername = username.toLowerCase();
    const user = await UserModel.findOne({
      username: lowerCaseUsername,
    }).select(
      "-verifyCode -verifyCodeExpiry -isVerified -messages -__v -password -email"
    );

    if (!user) {
      return responseObject({
        success: false,
        message: "No user found",
        statusCode: 400,
      });
    }

    return responseObject({
      success: true,
      message: "User successfully",
      statusCode: 200,
      data: user,
    });
  } catch (error: any) {
    console.log(error);
    return responseObject({
      success: false,
      message: `Failed to fetch user, error: ${error.message}`,
      statusCode: 500,
    });
  }
}
