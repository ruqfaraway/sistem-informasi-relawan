'use server'
import { ActionResponseType } from "@/lib/definitions";
import { getSession } from "@/lib/session";
import { ValidateEmail } from "@/lib/validate-email";
import { loginPost } from "@/model/user.data";

interface login {
 email: string;
 password: string;
}

export const PostLogin = async (data: login): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  const checkEmail = ValidateEmail(data.email);
  if (checkEmail) {
   const user = await loginPost(data);
   // console.log(user, "ini user");
   if (user) {
    session.isLoggedIn = true;
    session.user_id = user.id.toString();
    session.superAdmin = user.role_id === 1 ? true : false;
    session.email = user.email;
    session.name = user.name;
    await session.save();
   } else {
    return {
     success: false,
     message: "Email or password is wrong",
    }
   }
  }

 } catch (error) {
  return {
   success: false,
   message: error instanceof Error ? error.message : "Something went wrong",
  }
 }
 return {
  success: true,
  message: "Login success",
 }
}