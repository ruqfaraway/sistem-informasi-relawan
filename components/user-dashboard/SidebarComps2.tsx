"use client";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar2 } from "../app-sidebar-user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";
export const SidebarComps2 = ({
  children,
  name = "Unit",
}: {
  children: React.ReactNode;
  name: string;
}) => {
  const router = useRouter();
  return (
    <>
      <SidebarProvider>
        <AppSidebar2 />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb></Breadcrumb>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm flex flex-col items-end">
                Unit : <span className="text-sm font-bold">{name}</span>
              </p>
              <Avatar
                className="cursor-pointer"
                onClick={() => {
                  router.push("/profile");
                }}
              >
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </header>
          <div className="flex flex-col gap-4 p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};
