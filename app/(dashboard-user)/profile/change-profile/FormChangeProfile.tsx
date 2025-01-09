"use client";
import { Unit } from "@/app/(admin-dashboard)/unit/comp/columns";
import CardComps from "@/components/CardComps/CardComps";
import { NewDatePicker } from "@/components/NewDatePicker/NewDatePicker";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UnitData {
  id: string;
  name: string;
  builder: string;
  birth_date: string;
  address: string;
  phone: string;
  unit_number: string;
  instagram: string;
  website: string;
}

const formSchema = z.object({
  name: z.string().min(2).max(225),
  builder: z.string().min(2).max(225),
  birth_date: z.date(),
  address: z.string().min(2).max(225),
  phone: z.string().min(2).max(13),
  unit_number: z.string().min(2).max(50),
  instagram: z.string().min(2).max(50),
  website: z.string().min(2).max(50),
});

const FormChangeProfile = ({ initialValues }: { initialValues: UnitData }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      ...initialValues,
      birth_date: new Date(initialValues.birth_date),
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const body = {
      ...values,
      birth_date: values.birth_date.toISOString(),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/change-profile/detail/${initialValues.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to save data");
      }
      toast({
        title: "Success",
        description: "Data has been saved!",
      });
      router.push("/profile");
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setLoading(false);
    }
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name :</FormLabel>
                  <Input placeholder="Volunteer" {...field} />
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
                  <Input placeholder="Builder" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="grid grid-rows-1">
                  <FormLabel>Address :</FormLabel>
                  <Input placeholder="Address" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birth_date"
              render={({ field }) => (
                <FormItem className="grid grid-rows-1">
                  <FormLabel>Birth Date :</FormLabel>
                  <FormControl>
                    <NewDatePicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone :</FormLabel>
                  <Input placeholder="Phone" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Number :</FormLabel>
                  <Input placeholder="Unit Number" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram :</FormLabel>
                  <Input placeholder="Instagram" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website :</FormLabel>
                  <Input placeholder="Website" {...field} />
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

export default FormChangeProfile;
