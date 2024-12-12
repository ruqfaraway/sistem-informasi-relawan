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
// import { createOccupation } from "../actions";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewDatePicker } from "@/components/NewDatePicker/NewDatePicker";
import { UpdateVolunteerFromUser } from "../../actions";

const formSchema = z.object({
  volunteer_id: z.string().min(10).max(20),
  volunteer_type_id: z.string().min(2).max(50),
  religion_id: z.string().min(2).max(50),
  education_id: z.string().min(2).max(50),
  occupation_id: z.string().min(2).max(50),
  position_id: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  born_place: z.string().min(2).max(50),
  birth_date: z.date(),
  gender: z.string(),
  blood_type: z.string(),
  address: z.string().min(2).max(50),
  phone: z.string().min(2).max(50),
  email: z.string().min(2).max(50).email({ message: "Invalid email" }),
  join_date: z.date(),
  period: z.string().min(2).max(50),
  status: z.boolean(),
  isOfficer: z.boolean(),
});

interface educationList {
  id: string;
  education: string;
}

interface occupationList {
  id: string;
  occupation: string;
}

interface positionList {
  id: string;
  position: string;
}

interface volunteerTypeList {
  id: string;
  volunteer_type: string;
}

interface religionList {
  id: string;
  religion: string;
}

type Gender = "M" | "F";
type BloodType = "A" | "B" | "AB" | "O" | "Unknown";
type Status = "active" | "inactive";

interface VolunteerData {
  volunteer_id: string;
  volunteer_type_id: string;
  religion_id: string;
  education_id: string;
  occupation_id: string;
  position_id: string;
  name: string;
  born_place: string;
  birth_date: Date;
  gender: Gender;
  blood_type: BloodType;
  address: string;
  phone: string;
  email: string;
  join_date: Date;
  photo?: string;
  period?: string | undefined;
  isOfficer: boolean;
  status: Status;
}

const UpdateUserVolunteerForm = ({
  initialValues,
  educationList,
  occupationList,
  positionList,
  volunteerTypeList,
  religionList,
}: {
  initialValues: VolunteerData;
  educationList: educationList[];
  occupationList: occupationList[];
  positionList: positionList[];
  volunteerTypeList: volunteerTypeList[];
  religionList: religionList[];
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
      ...initialValues,
      status: initialValues.status === "active" ? true : false,
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const toBeSubmitted = {
      volunteer_id: values.volunteer_id,
      volunteer_type_id: values.volunteer_type_id,
      religion_id: values.religion_id,
      education_id: values.education_id,
      occupation_id: values.occupation_id,
      position_id: values.position_id,
      name: values.name,
      born_place: values.born_place,
      birth_date: values.birth_date,
      gender: values.gender,
      blood_type: values.blood_type,
      address: values.address,
      phone: values.phone,
      email: values.email,
      status: values.status ? "active" : "inactive",
      join_date: values.join_date,
      period: values.period,
      isOfficer: values.isOfficer,
    } as VolunteerData;
    await UpdateVolunteerFromUser({ id, data: toBeSubmitted })
      .then((res) => {
        if (res.success) {
          toast({
            title: "Success",
            description: "Volunteer updated successfully",
          });
          form.reset();
          router.push("/user-volunteer");
        }
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <h1 className="text-2xl font-semibold">Form add volunteer</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Volunteer Profile</CardTitle>
              <CardDescription>
                Please fill this form to add a new volunteer.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid w-full gap-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="volunteer_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NRP :</FormLabel>
                      <FormControl>
                        <Input placeholder="NRP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address :</FormLabel>
                      <FormControl>
                        <Input placeholder="Address" {...field} />
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
                      <FormControl>
                        <Input placeholder="Phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email :</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="religion_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Religion :</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your religion!" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {religionList.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.religion}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="born_place"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Born Place :</FormLabel>
                      <FormControl>
                        <Input placeholder="Born Place" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birth_date"
                  render={({ field }) => (
                    <FormItem className="grid grid-rows-1">
                      <FormLabel>Birthdate :</FormLabel>
                      <FormControl>
                        <NewDatePicker field={field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="education_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Education :</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your education!" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {educationList?.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.education}
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
                  name="occupation_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occupation :</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your occupation!" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {occupationList.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.occupation}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender :</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your gender!" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="M">Male</SelectItem>
                          <SelectItem value="F">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="blood_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Type :</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your blood type!" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="A">A</SelectItem>
                          <SelectItem value="B">B</SelectItem>
                          <SelectItem value="O">O</SelectItem>
                          <SelectItem value="AB">AB</SelectItem>
                          <SelectItem value="Unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Volunteer Details</CardTitle>
              <CardDescription>
                Please fill this form with your volunteer information.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid w-full gap-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="period"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Period :</FormLabel>
                      <FormControl>
                        <Input placeholder="Period" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="position_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position :</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your position!" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {positionList.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.position}
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
                  name="volunteer_type_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Volunteer Type :</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your volunteer type!" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {volunteerTypeList.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.volunteer_type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="join_date"
                  render={({ field }) => (
                    <FormItem className="grid grid-rows-1">
                      <FormLabel>Join Date : </FormLabel>
                      <FormControl>
                        <NewDatePicker field={field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Status Keanggotaan
                        </FormLabel>
                        <FormDescription>
                          Apakah anggota ini merupakan anggota aktif?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isOfficer"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Status Petugas
                        </FormLabel>
                        <FormDescription>
                          Apakah anggota ini adalah petugas posko?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-4 justify-end w-full">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.push("/volunteer-management")}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {loading ? <Loader2 className="animate-spin" /> : "Update"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default UpdateUserVolunteerForm;
