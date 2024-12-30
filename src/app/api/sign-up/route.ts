import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/UserModel";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();

    const { username, email, password } = body;

    if (username.length < 4) {
      return Response.json(
        {
          success: false,
          message: "Username need atleast 4 character",
        },
        { status: 400 }
      );
    }

    const lowerCaseUsername = username.toLowerCase();

    const existingUserVerifiedByUsername = await UserModel.findOne({
      username: lowerCaseUsername,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    const existingUserVerifiedByEmail = await UserModel.findOne({
      email,
      isVerified: true,
    });

    const verifyCode = Math.floor(100000 + Math.random() * 90000).toString();
    if (existingUserVerifiedByEmail) {
      if (existingUserVerifiedByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exist with this email.",
          },
          { status: 400 }
        );
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUserVerifiedByEmail.password = hashedPassword;
      existingUserVerifiedByEmail.verifyCode = verifyCode;
      existingUserVerifiedByEmail.verifyCodeExpiry = new Date(
        Date.now() + 3600000
      );
      await existingUserVerifiedByEmail.save();
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      await UserModel.create({
        username: lowerCaseUsername,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessages: true,
        messages: [],
      });
    }

    const emailResponse = await sendVerificationEmail(
      email,
      lowerCaseUsername,
      verifyCode
    );

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your email.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error, "Error registering user");
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }
}
