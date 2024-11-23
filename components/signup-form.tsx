"use client";
import { signup } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";

export function RegisterForm() {
  const [state, action, pending] = useFormState(signup, undefined);
  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>Please register to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="w-full" action={signup}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Name</Label>
              <Input id="name" placeholder="John Doe" name="name" />
            </div>
            {state?.errors?.name && <p>{state.errors.name}</p>}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" placeholder="m@example.com" />
            </div>
            {state?.errors?.email && <p>{state.errors.email}</p>}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" />
            </div>
            <Button type="submit" className="w-full" disabled={pending}>
              Register
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
