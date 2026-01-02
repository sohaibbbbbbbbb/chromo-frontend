"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Search, FolderPlus, Folder, ChevronDown } from "lucide-react";
import { FaChevronDown } from "react-icons/fa6";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarTrigger,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import supabase from "@/lib/supabase-client";
import { Project } from "@/types/project";

export function AppSidebar() {
  const [projectsOpen, setProjectsOpen] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [userName, setUserName] = useState("User Name");
  const [userInitials, setUserInitials] = useState("UN");
  const router = useRouter();
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch projects
      const { data: projectsData, error: projectsError } = await supabase
        .from("projects")
        .select("id, prompt, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!projectsError && projectsData) {
        setProjects(projectsData);
      }

      // Fetch user profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      if (profileData?.full_name) {
        setUserName(profileData.full_name);
        const nameParts = profileData.full_name.trim().split(" ");
        const initials = nameParts
          .map((part: string) => part[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);
        setUserInitials(initials);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    if (typeof window) {
      window.location.reload();
    }
  };

  return (
    <Sidebar
      collapsible="icon"
      className="bg-(--sidebar-bg) shadow-(--sidebar-shadow)"
    >
      <SidebarHeader className="pt-4.5 pb-2.5 px-6 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:pt-0 group-data-[collapsible=icon]:pb-0">
        <SidebarMenu>
          <SidebarMenuItem onClick={toggleSidebar}>
            <SidebarMenuButton className="bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent group-data-[collapsible=icon]:size-auto! flex justify-between items-center w-full h-auto p-0 group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:mx-auto!">
              <div className="flex justify-start items-center group-data-[collapsible=icon]:justify-center">
                <div className="p-2 group-data-[collapsible=icon]:size-19.5 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center">
                  <Image
                    src="/chromo-logo.png"
                    alt="Chromo"
                    width={50}
                    height={50}
                    className="w-8.75 h-auto cursor-pointer group-data-[collapsible=icon]:w-10"
                  />
                </div>
                <span
                  className="font-darker-grotesque font-semibold text-4xl tracking-[-0.04em] py-1.375 group-data-[collapsible=icon]:hidden"
                  style={{ lineHeight: "115%" }}
                >
                  chromos
                </span>
              </div>
              <SidebarTrigger className="-ml-1 size-5.25 group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="border-y py-8 px-4.75 group-data-[collapsible=icon]:px-3! border-(--sidebar-border-color)">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="font-inter font-normal text-lg text-(--sidebar-text) px-3 py-3 h-12 hover:bg-(--sidebar-hover) rounded-lg group-data-[collapsible=icon]:w-full! group-data-[collapsible=icon]:h-12! group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:items-center">
              <Image
                src={"/svg/plus.svg"}
                alt="New Chat"
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <span className="group-data-[collapsible=icon]:hidden">
                New Chat
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="font-inter font-normal text-lg text-(--sidebar-text) px-3 py-3 h-12 hover:bg-(--sidebar-hover) rounded-lg group-data-[collapsible=icon]:w-full! group-data-[collapsible=icon]:h-12! group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:items-center">
              <Image
                src={"/svg/search.svg"}
                alt="Search Chats"
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <span className="group-data-[collapsible=icon]:hidden">
                Search Chats
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="group-data-[collapsible=icon]:hidden block">
            <SidebarMenuButton
              onClick={() => setProjectsOpen(!projectsOpen)}
              className="bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent focus-visible:bg-transparent text-base font-inter font-normal text-(--sidebar-text-secondary) leading-5 px-3 gap-3"
            >
              <span>Projects</span>
              <Image
                src="/svg/down-arrow.svg"
                alt="Toggle projects"
                width={10}
                height={5}
                className={`h-auto w-2.5 transition-transform ${
                  projectsOpen ? "rotate-0" : "-rotate-90"
                }`}
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="group-data-[collapsible=icon]:block hidden">
            <SidebarMenuButton className="font-inter font-normal text-lg text-(--sidebar-text) px-3 py-3 h-12 hover:bg-(--sidebar-hover) rounded-lg group-data-[collapsible=icon]:w-full! group-data-[collapsible=icon]:h-12! group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:items-center">
              <Image
                src={"/folder.svg"}
                alt="Projects"
                width={16}
                height={14}
                className="h-3.5 w-4"
              />
              <span className="group-data-[collapsible=icon]:hidden">
                Projects
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {projectsOpen && (
            <>
              {projects.map((project, index) => (
                <SidebarMenuItem
                  className="group-data-[collapsible=icon]:hidden block"
                  key={index}
                >
                  <SidebarMenuButton
                    onClick={() => router.push(`/play-ground/${project.id}`)}
                    className="font-inter font-light text-lg text-(--sidebar-text) px-3 py-3 h-12 hover:bg-(--sidebar-hover) rounded-lg group-data-[collapsible=icon]:w-full! group-data-[collapsible=icon]:h-12! group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:items-center"
                  >
                    <Image
                      src={"/folder.svg"}
                      alt={project.prompt}
                      width={16}
                      height={14}
                      className="h-3.5 w-4"
                    />
                    <span className="group-data-[collapsible=icon]:hidden">
                      {project.prompt}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </>
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="px-4.75 py-4  group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0 group-data-[collapsible=icon]:h-25 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:items-center">
        <SidebarMenu className="p-0 group-data-[collapsible=icon]:mx-auto">
          <SidebarMenuItem className="group-data-[collapsible=icon]:p-0!">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-auto py-4 px-3 bg-transparent hover:bg-transparent focus-visible:bg-transparent focus:bg-transparent active:bg-transparent flex gap-3 items-center group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:mx-auto! group-data-[collapsible=icon]:w-full! group-data-[collapsible=icon]:h-full! group-data-[collapsible=icon]:max-w-fit!">
                  <div className="w-10 h-10 bg-(--sidebar-avatar-bg) flex justify-center items-center rounded-full">
                    <p className="font-inter font-semibold text-lg leading-[100%] text-white">
                      {userInitials}
                    </p>
                  </div>
                  <div className="group-data-[collapsible=icon]:hidden">
                    <h2 className="font-inter text-xl text-(--sidebar-text) font-semibold leading-6">
                      {userName}
                    </h2>
                    <p className="font-inter text-sm text-(--sidebar-text) font-normal leading-4.25">
                      Free Tier
                    </p>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="p-0 bg-transparent !w-fit !min-w-fit shadow-none"
              >
                <DropdownMenuItem
                  className="bg-black rounded-md text-center py-1.5 px-4 shadow-none text-white font-poppins font-medium text-base leading-[150%] w-fit cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
