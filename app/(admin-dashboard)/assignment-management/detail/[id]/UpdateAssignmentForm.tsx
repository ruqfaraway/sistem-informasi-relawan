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
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { UpdateAssignmentData } from "../../actions";
import { Textarea } from "@/components/ui/textarea";
import { NewDatePicker } from "@/components/NewDatePicker/NewDatePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MainLoaderComps from "@/components/MainLoaderComps/MainLoaderComps";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  volunteer_id: z.string().min(2).max(50),
  assignment_type_id: z.string().min(2).max(50),
  start_date: z.date(),
  end_date: z.date(),
  description: z.string().min(2).max(50),
});

const UpdateAssignmentForm = ({
  initialValues,
  volunteerList,
  assignmentTypeList,
}: {
  initialValues: {
    volunteer_id: string;
    assignment_type_id: string;
    start_date: Date;
    end_date: Date;
    description: string;
  };
  volunteerList: { id: string; name: string }[];
  assignmentTypeList: { id: string; name: string }[];
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const id = params.id as string;
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    await UpdateAssignmentData(id, {
      volunteer_id: values.volunteer_id,
      assignment_type_id: values.assignment_type_id,
      start_date: values.start_date,
      end_date: values.end_date,
      description: values.description,
    })
      .then((res) => {
        if (res.success) {
          form.reset();
        }
        toast({
          title: res.message,
          description: res.success ? "Assignment updated successfully" : "",
        });
        router.push("/assignment-management");
      })
      .catch((error) => {
        console.log(error, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      {loading && <MainLoaderComps />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="volunteer_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Volunteer :</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select volunteer!" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {volunteerList.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="assignment_type_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Education :</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignment type!" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {assignmentTypeList.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem className="grid grid-rows-1">
                <FormLabel>Start Date :</FormLabel>
                <FormControl>
                  <NewDatePicker field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem className="grid grid-rows-1">
                <FormLabel>End Date :</FormLabel>
                <FormControl>
                  <NewDatePicker field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descriptions :</FormLabel>
                <FormControl>
                  <Textarea placeholder="Descriptions" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end space-x-4">
            <Button
              variant={"secondary"}
              onClick={() => router.push("/assignment-management")}
            >
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default UpdateAssignmentForm;
