import { Plus, Search, FolderPlus, Folder, ChevronDown } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import Image from "next/image";

const SidebarComponent = ({ children }: React.PropsWithChildren) => {
  const [projectsOpen, setProjectsOpen] = useState(true);
  const { toggleSidebar } = useSidebar();
  const projects = [
    "Energetic Startup Workspace",
    "Mountain Retreat Palette",
    "Urban Loft Color Scheme",
    "Seaside Breeze Collection",
    "Enchanted Forest Palette",
    "Desert Oasis Workspace",
  ];
  return (
    <>
      <Sidebar collapsible="icon" className="bg-[#E9E4D8]">
        <SidebarHeader className="py-6">
          <SidebarMenuItem onClick={toggleSidebar}>
            <SidebarMenuButton className="bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent group-data-[collapsible=icon]:size-8! flex justify-between items-center  group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:mx-auto!  ">
              <div className="flex justify-start items-center">
                <Image
                  src="/chromo-logo.png"
                  alt="Chromo"
                  width={50}
                  height={50}
                  className="w-8.75 h-auto cursor-pointer"
                />
                <span
                  className="font-darker-grotesque font-semibold text-4xl tracking-[-0.04em]"
                  style={{ lineHeight: "115%" }}
                >
                  chromos
                </span>
              </div>
              <SidebarTrigger className="-ml-1" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarHeader>
        <SidebarContent className="border-t py-8 px-5 group-data-[collapsible=icon]:px-3! border-[#D0C9B6]">
          <SidebarMenu>
            <SidebarMenuItem className="">
              <SidebarMenuButton className="font-inter font-light text-lg text-black  px-3 py-4 h-12 hover:bg-[#f6f2ea] rounded-lg group-data-[collapsible=icon]:w-full! group-data-[collapsible=icon]:bg-red group-data-[collapsible=icon]:h-12! group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:items-center">
                <Plus className="w-4 h-4" />
                <span className="group-data-[collapsible=icon]:hidden">
                  New Chat
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="font-inter font-light text-lg text-black  px-3 py-4 h-12 hover:bg-[#f6f2ea] rounded-lg group-data-[collapsible=icon]:w-full! group-data-[collapsible=icon]:bg-red group-data-[collapsible=icon]:h-12! group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:items-center">
                <Search className="w-4 h-4" />
                <span className="group-data-[collapsible=icon]:hidden">
                  Search Projects
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="group-data-[collapsible=icon]:hidden block">
              <SidebarMenuButton
                onClick={() => setProjectsOpen(!projectsOpen)}
                className="bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent focus-visible:bg-transparent"
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    projectsOpen ? "" : "-rotate-90"
                  }`}
                />
                <span>Projects</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="group-data-[collapsible=icon]:block hidden">
              <SidebarMenuButton className="font-inter font-light text-lg text-black  px-3 py-4 h-12 hover:bg-[#f6f2ea] rounded-lg group-data-[collapsible=icon]:w-full! group-data-[collapsible=icon]:bg-red group-data-[collapsible=icon]:h-12! group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:items-center">
                <FolderPlus className="w-4 h-4" />
                <span className="group-data-[collapsible=icon]:hidden">
                  New Project
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {projectsOpen && (
              <>
                <SidebarMenuItem className="group-data-[collapsible=icon]:hidden block">
                  <SidebarMenuButton className="font-inter font-light text-lg text-black  px-3 py-4 h-12 hover:bg-[#f6f2ea] rounded-lg group-data-[collapsible=icon]:w-full! group-data-[collapsible=icon]:bg-red group-data-[collapsible=icon]:h-12! group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:items-center">
                    <FolderPlus className="w-4 h-4" />
                    <span className="group-data-[collapsible=icon]:hidden">
                      New Project
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {projects.map((project, index) => (
                  <SidebarMenuItem
                    className="group-data-[collapsible=icon]:hidden block"
                    key={index}
                  >
                    <SidebarMenuButton className="font-inter font-light text-lg text-black  px-3 py-4 h-12 hover:bg-[#f6f2ea] rounded-lg group-data-[collapsible=icon]:w-full! group-data-[collapsible=icon]:bg-red group-data-[collapsible=icon]:h-12! group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:items-center">
                      <Folder className="w-4 h-4" />
                      <span className="group-data-[collapsible=icon]:hidden">
                        {project}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </>
            )}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="px-5  py-4 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0 group-data-[collapsible=icon]:h-25 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:items-center">
          <SidebarMenu className="p-0 group-data-[collapsible=icon]:mx-auto">
            <SidebarMenuItem className="group-data-[collapsible=icon]:p-0!">
              <SidebarMenuButton className="h-auto py-4 px-3 bg-transparent hover:bg-transparent focus-visible:bg-transparent focus:bg-transparent active:bg-transparent flex gap-3 items-center group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:mx-auto! group-data-[collapsible=icon]:w-full! group-data-[collapsible=icon]:h-full! group-data-[collapsible=icon]:max-w-fit! ">
                <div className="w-10 h-10 bg-[#AA9E82] flex justify-center items-center rounded-full">
                  <p className="font-inter  font-semibold text-lg leading-[100%] text-white">
                    SK
                  </p>
                </div>
                <div className="group-data-[collapsible=icon]:hidden">
                  <h2 className="font-inter text-xl text-black font-semibold">
                    User Name
                  </h2>
                  <p className="font-inter  text-sm text-black font-normal">
                    Free Tier
                  </p>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </>
  );
};

export default SidebarComponent;
