import { Home, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { SharePanel } from "@/components/SharePanel";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import bkLogo from "@/assets/bk-logo.jpg";

export const AppSidebar = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <img src={bkLogo} alt="Beverage King" className="w-8 h-8 object-contain" />
            <span className="text-lg font-semibold">Beverage King</span>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Button variant="ghost" size="icon" className="w-full justify-start px-2 gap-2">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <Separator className="my-2" />
            
            <SidebarMenuItem>
              <SharePanel />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Button variant="ghost" size="icon" className="w-full justify-start px-2 gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};