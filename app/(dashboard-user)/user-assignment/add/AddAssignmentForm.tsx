"use client";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useRouter } from "next/navigation";
import { PostAssignmentData } from "../actions";
import { NewDatePicker } from "@/components/NewDatePicker/NewDatePicker";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  volunteer_id: z.string().min(2).max(50),
  assignment_type_id: z.string().min(2).max(50),
  start_date: z.date(),
  end_date: z.date(),
  description: z.string().min(2).max(50),
});

type VolunteerDropdown = {
  id: string;
  name: string;
};

type AssignmentTypeDropdown = {
  id: string;
  name: string;
  code: string;
};

const AddAssignmentForm = ({
  volunteerList,
  assignmentTypeList,
}: {
  volunteerList: VolunteerDropdown[];
  assignmentTypeList: AssignmentTypeDropdown[];
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toBeSubmitted = {
      volunteer_id: values.volunteer_id,
      assignment_type_id: values.assignment_type_id,
      start_date: values.start_date,
      end_date: values.end_date,
      description: values.description,
    };

    setLoading(true);
    await PostAssignmentData(toBeSubmitted)
      .then((res) => {
        if (res.success) {
          form.reset();
        }
        toast({
          title: res.message,
          description: res.success ? "Assignment added successfully" : "Error",
        });
        router.push("/user-assignment");
      })
      .catch((error) => {
        console.log(error);
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
          name="volunteer_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Volunteer :</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        {loading && <div>Loading...</div>}
        <div className="flex justify-end space-x-4">
          <Button
            variant={"secondary"}
            onClick={() => router.push("/user-assignment")}
          >
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddAssignmentForm;
