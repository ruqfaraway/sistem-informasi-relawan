import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import { getSession } from "@/lib/session";

const prisma = new PrismaClient();

// GET method for fetching user data
export const POST = async (req: NextRequest) => {
 try {
  const session = await getSession();
  const body = await req.json(); // Parsing the JSON body
  const { email, password } = body;

  // Validate if email and password exist
  if (!email || !password) {
   return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  // Find the user by email
  const user = await prisma.user.findFirst({
   where: { email },
  });

  if (!user) {
   return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Compare password with the hashed password
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
   return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // Fetch volunteer unit if the password is valid
  const unit = await prisma.volunteerUnit.findFirst({
   where: { user_id: user.id },
  });

  session.isLoggedIn = true;
  session.user_id = user.id.toString();
  session.superAdmin = user.role_id === 1 ? true : false;
  session.email = user.email;
  session.unit_id = unit?.id;
  session.name = unit?.name;
  await session.save();

  return NextResponse.json({
   success: true,
   message: "Login successful",
   data: {
    ...session,
   }
  });
 } catch (error) {
  console.error("Error in GET request:", error);
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
 } finally {
  await prisma.$disconnect();
 }
};
