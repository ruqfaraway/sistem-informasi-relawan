"use client";
// import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, LockIcon, MailIcon } from "lucide-react";
import { PostLogin } from "./action";
import { useToast } from "@/hooks/use-toast";

export function FormLogin() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const FormSchema = z.object({
    email: z.string().min(6, {
      message: "Email is required",
    }),
    password: z.string().min(6, {
      message: "Password min 8 character",
    }),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    await PostLogin(data).then((res) => {
      if (!res.success) {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: res.message,
        });
        return res;
      } else {
        setLoading(false);
        toast({
          title: "Login Success",
          description: "Welcome back",
        });
        router.push("/");
      }
    });
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>SIlahkan masuk untuk melanjutkan</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
              autoComplete="off"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4 flex flex-col">
                    <div className="flex items-center gap-3">
                      <MailIcon />
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-4 flex flex-col">
                    <div className="flex items-center gap-3">
                      <LockIcon />
                      <FormControl>
                        <Input
                          required
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />
              <Button disabled={loading} className="w-full" type="submit">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sign In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
