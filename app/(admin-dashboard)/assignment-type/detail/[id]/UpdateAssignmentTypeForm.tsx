"use client";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { UpdateAssignmentTypeData } from "../../actions";

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

const UpdateAssignmentTypeForm = ({
  initialValues,
}: {
  initialValues: {
    name: string;
    code: string;
  };
}) => {
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
    await UpdateAssignmentTypeData(id, {
      name: values.name,
      code: values.code.toLowerCase(),
    })
      .then((res) => {
        if (res.success) {
          form.reset();
        }
        router.push("/assignment-type");
      })
      .catch((error) => {
        console.log(error, "error");
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
              <FormMessage />
            </FormItem>
          )}
        />
        {/* {loading && <div>Loading...</div>} */}
        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default UpdateAssignmentTypeForm;