"use client";
import * as React from "react";

// import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { PostLogout } from "@/app/(auth)/login/action";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import MainLoaderComps from "./MainLoaderComps/MainLoaderComps";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Master Data",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/user-dashboard",
        },
      ],
    },
    {
      title: "Menu Relawan",
      url: "#",
      items: [
        {
          title: "Manajemen Relawan",
          url: "/user-volunteer",
        },
        {
          title: "Manajemen Penugasan",
          url: "/user-assignment",
        },
      ],
    },
  ],
};

export function AppSidebar2({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const handleLogout = async () => {
    setLoading(true);
    await PostLogout().finally(() => {
      toast({
        title: "Logout",
        description: "You have been logged out.",
      });
      setLoading(false);
    });
  };
  return (
    <Sidebar {...props}>
      {loading && (
       <MainLoaderComps />
      )}
      <SidebarHeader>
        <VersionSwitcher />
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <SidebarGroup>
          <SidebarGroupLabel>Logout</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/" onClick={handleLogout}>
                    Logout
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
