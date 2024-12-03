"use client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { NewDatePicker } from "@/components/NewDatePicker/NewDatePicker";
import { createVolunteerUnit } from "../actions";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  builder: z
    .string()
    .min(2, { message: "Code must be at least 2 characters." })
    .max(50),
  birth_date: z.date(),
  email: z.string().email(),
});

const AddUnitVolunteer = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      builder: "",
      birth_date: new Date(),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    await createVolunteerUnit(values)
      .then((res) => {
        if (res.success) {
          router.push("/unit");
          toast({
            title: "Unit Volunteer & User Added",
            description:
              "Unit Volunteer and new account has been added successfully",
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
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
            name="builder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Builder :</FormLabel>
                <FormControl>
                  <Input placeholder="Builder" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email :</FormLabel>
                <FormControl>
                  <Input placeholder="Email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birth_date"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Birth Date :</FormLabel>
                <FormControl>
                  <NewDatePicker field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {loading ? <Loader2 className="animate-spin" /> : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddUnitVolunteer;
