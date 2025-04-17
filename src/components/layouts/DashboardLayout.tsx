
import React from "react";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { MarketSidebar } from "@/components/nav/MarketSidebar";
import SearchStocks from "@/components/stocks/SearchStocks";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r">
          <SidebarContent>
            <MarketSidebar />
          </SidebarContent>
        </Sidebar>
        
        <div className={cn("flex-1 overflow-auto", className)}>
          <header className="flex items-center justify-between border-b px-6 py-3">
            <h1 className="text-xl font-semibold">Bharat Market Insight</h1>
            <div className="flex items-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Search size={16} />
                    <span>Search</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <SearchStocks />
                </DialogContent>
              </Dialog>
            </div>
          </header>
          
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
