'use server'
import { ActionResponseType } from "@/lib/definitions";
import { getSession } from "@/lib/session";
import { ValidateEmail } from "@/lib/validate-email";
import { loginPost } from "@/model/user.data";
import { redirect } from "next/navigation";



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
   if (user) {
    session.isLoggedIn = true;
    session.user_id = user.id.toString();
    session.superAdmin = user.role_id === 1 ? true : false;
    session.email = user.email;
    session.unit_id = user.unit_id;
    session.name = user.name;
    await session.save();
    return {
     success: true,
     message: "Login success",
    }
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

export const PostLogout = async (url?: string) => {
 const session = await getSession();
 session.destroy();
 if (url) redirect(url);
 redirect("/login");
};