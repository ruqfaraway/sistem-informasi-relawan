"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import apiHandler from "@/lib/apiHandler";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  code: z
    .string()
    .min(2, { message: "Code must be at least 2 characters." })
    .max(50)
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Only alphanumeric characters are allowed.",
    }),
});

const AddEducationForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      code: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toBeSubmitted = {
      name: values.name,
      code: values.code.toLowerCase(),
    };
    setLoading(true);
    await apiHandler
      .request({
        method: "POST",
        url: "/api/admin/education/add",
        data: toBeSubmitted,
      })
      .then((res) => {
        if ([200, 201].includes(res.status)) {
          setLoading(false);
          toast({
            title: "Success",
            description: res.data.message,
          });
          router.push("/education");
        }
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.response.data.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name :</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code :</FormLabel>
              <FormControl>
                <Input placeholder="Code" {...field} />
              </FormControl>
              <FormDescription>
                Examples : SD, SMP, SMA, SMK, S1, S2.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 justify-end w-full">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/education")}
          >
            Cancel
          </Button>
          <Button type="submit">
            {loading ? <Loader2 className="animate-spin" /> : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddEducationForm;
