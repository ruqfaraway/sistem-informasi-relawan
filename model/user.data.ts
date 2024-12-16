import prisma from "@/lib/prisma";
// import { Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";

interface loginData {
  email: string;
  password: string;
}
export const loginPost = async (data: loginData) => {
  const user = await prisma.user.findFirst({
    where: { email: data.email },
  });
  if (!user) return false;
  const checkPassword = await bcrypt.compare(data.password, user.password);
  if (checkPassword) {
    const unit = await prisma.volunteerUnit.findFirst({
      where: { user_id: user.id },
    });
    return { ...user, unit_id: unit?.id };
  } else {
    return false;
  }
};

// export const updateUser = async (id: string, data: loginData) => {
//   try {
//     const checkuser = await prisma.user.findFirst({ where: { id: id } });
//     let pass = checkuser?.password;
//     if (data.password != checkuser?.password) {
//       const newPassword = await bcrypt.hash(data.password, 10);
//       pass = newPassword;
//     }
//     const user: Prisma.userUncheckedUpdateInput = {
//       email: data.username,
//       password: pass,
//     };
//     return await prisma.user.update({ where: { id: id }, data: user });
//   } catch (error) {
//     throw error;
//   }
// };

export const getUserById = async (id: string) => {
  return await prisma.user.findFirst({ where: { id: id } });
};
