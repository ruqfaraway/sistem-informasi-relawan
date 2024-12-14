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

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      items: [
        {
          title: "Dashboard",
          url: "/",
        },
      ],
    },
    {
      title: "Master Data",
      url: "#",
      items: [
        {
          title: "Unit",
          url: "/unit",
        },
        {
          title: "Pendidikan",
          url: "/education",
        },
        {
          title: "Pekerjaan",
          url: "/occupation",
        },
        {
          title: "Jenis Penugasan",
          url: "/assignment-type",
        }
      ],
    },
    {
      title: "Menu Relawan",
      url: "#",
      items: [
        {
          title: "Manajemen Relawan",
          url: "/volunteer-management",
        },
        {
          title: "Manajemen Penugasan",
          url: "/assignment-management",
        },
        // {
        //   title: "Rendering",
        //   url: "#",
        // },
        // {
        //   title: "Caching",
        //   url: "#",
        // },
        // {
        //   title: "Styling",
        //   url: "#",
        // },
        // {
        //   title: "Optimizing",
        //   url: "#",
        // },
        // {
        //   title: "Configuring",
        //   url: "#",
        // },
        // {
        //   title: "Testing",
        //   url: "#",
        // },
        // {
        //   title: "Authentication",
        //   url: "#",
        // },
        // {
        //   title: "Deploying",
        //   url: "#",
        // },
        // {
        //   title: "Upgrading",
        //   url: "#",
        // },
        // {
        //   title: "Examples",
        //   url: "#",
        // },
      ],
    },
    // {
    //   title: "API Reference",
    //   url: "#",
    //   items: [
    //     {
    //       title: "Components",
    //       url: "#",
    //     },
    //     {
    //       title: "File Conventions",
    //       url: "#",
    //     },
    //     {
    //       title: "Functions",
    //       url: "#",
    //     },
    //     {
    //       title: "next.config.js Options",
    //       url: "#",
    //     },
    //     {
    //       title: "CLI",
    //       url: "#",
    //     },
    //     {
    //       title: "Edge Runtime",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Architecture",
    //   url: "#",
    //   items: [
    //     {
    //       title: "Accessibility",
    //       url: "#",
    //     },
    //     {
    //       title: "Fast Refresh",
    //       url: "#",
    //     },
    //     {
    //       title: "Next.js Compiler",
    //       url: "#",
    //     },
    //     {
    //       title: "Supported Browsers",
    //       url: "#",
    //     },
    //     {
    //       title: "Turbopack",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const handleLogout = async () => {
    await PostLogout();
  };
  return (
    <Sidebar {...props}>
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
