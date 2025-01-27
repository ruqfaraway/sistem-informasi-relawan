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
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  builder: z.string().min(2).max(50),
  birth_date: z.date(),
  address: z.string().min(2).max(250),
  phone: z.string().min(2).max(50),
  website: z.string().min(2).max(50),
  instagram: z.string().min(2).max(50),
  unit_number: z.string().min(2).max(50),
});
const UpdateUnitVolunteer = ({
  initialValues,
}: {
  initialValues: {
    id: string;
    name: string;
    builder: string;
    birth_date: Date;
    address: string;
    unit_number: string;
    phone?: string;
    photo?: string;
    instagram?: string;
    website?: string;
  };
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues.name,
      builder: initialValues.builder,
      birth_date: new Date(initialValues.birth_date),
      address: initialValues.address,
      phone: initialValues.phone,
      unit_number: initialValues.unit_number,
      website: initialValues.website,
      instagram: initialValues.instagram,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    await axios
      .request({
        url: `/api/admin/unit/detail/${initialValues.id}`,
        method: "PATCH",
        data: values,
      })
      .then((res) => {
        if (res.status === 200) {
          router.push("/unit");
          toast({
            title: "Unit Updated",
            description: "Unit Volunteer was updated successfully",
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
                <FormLabel>Nama :</FormLabel>
                <FormControl>
                  <Input placeholder="Nama" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unit_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No SK :</FormLabel>
                <FormControl>
                  <Input placeholder="no SK Unit" {...field} />
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
                <FormLabel>Pembina :</FormLabel>
                <FormControl>
                  <Input placeholder="Pembina" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat :</FormLabel>
                <FormControl>
                  <Input placeholder="Alamat" {...field} />
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
                <FormLabel>No Hp :</FormLabel>
                <FormControl>
                  <Input placeholder="No Hp" {...field} />
                </FormControl>
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
                <FormControl>
                  <Input placeholder="website" {...field} />
                </FormControl>
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
                <FormControl>
                  <Input placeholder="instagram" {...field} />
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
          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button" onClick={() => router.push("/unit")}>
              Cancel
            </Button>
            <Button type="submit">
              {loading ? <Loader2 className="animate-spin" /> : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default UpdateUnitVolunteer;
