import { z } from "zod";

export const userNameValidation = z
  .string()
  .min(4, "Username must be atleast 4 character")
  .max(20, "Username must not exceed 20 character")
  .regex(
    /^[a-zA-Z0-9]+$/,
    "Username must not include specail character (eg @, |, %, $)"
  );

export const signUpSchema = z.object({
  username: userNameValidation,
  email: z.string().email({ message: "Invaild email address" }),
  password: z
    .string()
    .min(6, { message: "Password must atleast 6 characters" }),
});
