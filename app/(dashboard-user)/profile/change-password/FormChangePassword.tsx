"use client";
import CardComps from "@/components/CardComps/CardComps";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import apiHandler from "@/lib/apiHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  new_password: z.string().min(8).max(225),
  old_password: z.string().min(8).max(225),
  confirm_password: z.string().min(8).max(225),
});
const FormChangePassword = ({ userId }: { userId: string }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isView2, setIsView2] = useState(false);
  const [isView3, setIsView3] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    await apiHandler
      .request({
        url: `/api/change-password/${userId}`,
        method: "PATCH",
        data: values,
      })
      .then((data) => {
        if (data) {
          setLoading(false);
          toast({
            title: "Success",
            description: "Password has been changed",
          });
          router.push("/profile");
        }
      })
      .catch((err) => {
        setLoading(false);
        toast({
          title: "Error",
          description: err.response.data.error,
        });
      });
  };

  return (
    <CardComps>
      <div className="flex flex-col gap-4">
        <p className="text-lg font-bold text-gray-600">Form change profile</p>
        <p className="text-md font-normal text-gray-600">Fill this fields...</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="old_password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative w-full">
                      <FormLabel>Old Password :</FormLabel>
                      <Input
                        placeholder="Old Password"
                        type={isView ? "text" : "password"}
                        {...field}
                      />
                      {isView ? (
                        <Eye
                          className="absolute right-4 top-8 z-10 cursor-pointer text-gray-500"
                          onClick={() => {
                            setIsView(!isView);
                          }}
                        />
                      ) : (
                        <EyeOff
                          className="absolute right-4 top-8 z-10 cursor-pointer text-gray-500"
                          onClick={() => setIsView(!isView)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative w-full">
                      <FormLabel>New Password :</FormLabel>
                      <Input
                        placeholder="New Password"
                        type={isView2 ? "text" : "password"}
                        {...field}
                      />
                      {isView2 ? (
                        <Eye
                          className="absolute right-4 top-8 z-10 cursor-pointer text-gray-500"
                          onClick={() => {
                            setIsView2(!isView2);
                          }}
                        />
                      ) : (
                        <EyeOff
                          className="absolute right-4 top-8 z-10 cursor-pointer text-gray-500"
                          onClick={() => setIsView2(!isView2)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative w-full">
                      <FormLabel>Confirm Password :</FormLabel>
                      <Input
                        placeholder="Confirm Password"
                        type={isView3 ? "text" : "password"}
                        {...field}
                      />
                      {isView3 ? (
                        <Eye
                          className="absolute right-4 top-8 z-10 cursor-pointer text-gray-500"
                          onClick={() => {
                            setIsView3(!isView3);
                          }}
                        />
                      ) : (
                        <EyeOff
                          className="absolute right-4 top-8 z-10 cursor-pointer text-gray-500"
                          onClick={() => setIsView3(!isView3)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {loading && <div>Loading...</div>}
            <div className="flex justify-end space-x-4">
              <Button
                variant={"secondary"}
                type="button"
                onClick={() => router.push("/profile")}
              >
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </CardComps>
  );
};

export default FormChangePassword;
