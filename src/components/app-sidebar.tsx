"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Globe,
  Package,
  Activity,
  Settings,
  HelpCircle,
  Server,
  Tags,
  Folder,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "WP Manager",
    email: "admin@wpmanager.app",
    avatar: "/icon.svg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/shadcn-demo",
      icon: LayoutDashboard,
    },
    {
      title: "Sites",
      url: "/shadcn-demo/sites",
      icon: Globe,
    },
    {
      title: "Updates",
      url: "/shadcn-demo/updates",
      icon: Package,
    },
    {
      title: "Activity",
      url: "/shadcn-demo/activity",
      icon: Activity,
    },
    {
      title: "Servers",
      url: "/servers",
      icon: Server,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: Folder,
    },
    {
      title: "Tags",
      url: "/tags",
      icon: Tags,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Help",
      url: "#",
      icon: HelpCircle,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/shadcn-demo">
                <img src="/icon.svg" alt="WP Manager" className="!size-5" />
                <span className="text-base font-semibold">WP Manager</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
