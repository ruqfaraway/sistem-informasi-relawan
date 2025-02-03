"use client";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import apiHandler from "@/lib/apiHandler";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

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

const UpdateEducationForm = ({
  initialValues,
}: {
  initialValues: {
    name: string;
    code: string;
  };
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const id = params.id as string;
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues.name,
      code: initialValues.code,
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    await apiHandler
      .request({
        method: "PATCH",
        url: `/api/admin/education/detail/${id}`,
        data: values,
      })
      .then((res) => {
        if ([200, 201].includes(res.status)) {
          toast({
            title: "Education Updated",
            description: "Education  was updated successfully",
          });
          router.push("/education");
        }
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.response.data.message,
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

export default UpdateEducationForm;
