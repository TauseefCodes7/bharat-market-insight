
import React from "react";
import { Link } from "react-router-dom";
import { 
  BarChart3, 
  Home, 
  LayoutDashboard, 
  LineChart, 
  ListOrdered, 
  MoreHorizontal, 
  Newspaper, 
  PieChart,
  TrendingUp 
} from "lucide-react";
import {
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function MarketSidebar() {
  return (
    <>
      <div className="flex items-center gap-2 px-4 py-4">
        <TrendingUp className="h-6 w-6 text-primary" />
        <span className="font-semibold text-lg">BMI</span>
      </div>
      
      <SidebarGroup>
        <SidebarGroupLabel>Overview</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/" className="flex items-center gap-2">
                  <Home size={18} />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/markets" className="flex items-center gap-2">
                  <BarChart3 size={18} />
                  <span>Markets</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/news" className="flex items-center gap-2">
                  <Newspaper size={18} />
                  <span>News & Updates</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      
      <SidebarGroup>
        <SidebarGroupLabel>Analysis</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/technical" className="flex items-center gap-2">
                  <LineChart size={18} />
                  <span>Technical Analysis</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/fundamental" className="flex items-center gap-2">
                  <PieChart size={18} />
                  <span>Fundamental Data</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/screener" className="flex items-center gap-2">
                  <ListOrdered size={18} />
                  <span>Stock Screener</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      
      <SidebarGroup>
        <SidebarGroupLabel>User</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/portfolio" className="flex items-center gap-2">
                  <LayoutDashboard size={18} />
                  <span>Portfolio</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/settings" className="flex items-center gap-2">
                  <MoreHorizontal size={18} />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
