"use client";

import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useMutation } from "convex/react";
import { useParams, usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { DocumentList } from "./DocumentList";
import { Item } from "./Item";
import { UserItem } from "./UserItem";

import { toast } from "sonner";
import {
  ChevronsLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash,
  PanelLeftClose,
  Sparkles // Added for visual flair
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TrashBox } from "./TrashBox";
import { useSearch } from "@/hooks/useSearch";
import { useSettings } from "@/hooks/useSettings";
import { Navbar } from "./Navbar";

const Navigation = () => {
  const search = useSearch();
  const settings = useSettings();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const create = useMutation(api.documents.create);

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = e.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`,
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.removeProperty("width");
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100%-240px)",
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const handleCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`),
    );

    toast.promise(promise, {
      loading: "Creating a new note....",
      success: "New note created.",
      error: "Failed to create a note.",
    });
  };

  return (
    <>
      {/* SIDEBAR CONTAINER 
        Changed bg-secondary to bg-slate-50 for a warmer/lighter feel.
        Added a subtle right border.
      */}
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar relative z-[300] flex h-full w-60 flex-col overflow-y-auto bg-slate-50 dark:bg-[#1F1F1F] border-r border-slate-200 dark:border-slate-800",
          isResetting && "transition-all duration-300 ease-in-out",
          isMobile && "w-0",
        )}
      >
        {/* COLLAPSE BUTTON */}
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "absolute right-3 top-3 h-8 w-8 flex items-center justify-center rounded-lg text-muted-foreground opacity-0 transition hover:bg-slate-200 group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600",
            isMobile && "opacity-100 bg-slate-100 dark:bg-neutral-800", // Always visible on mobile
          )}
        >
          <ChevronsLeft className="h-5 w-5" />
        </div>

        {/* USER PROFILE SECTION */}
        <div className="mb-4 pb-4 pt-2">
          <UserItem />
          
          {/* MAIN ACTIONS - Grouped with spacing for better touch targets */}
          <div className="mt-4 flex flex-col gap-y-1 px-1">
            <Item 
              label="Search" 
              icon={Search} 
              isSearch 
              onClick={search.onOpen} 
            />
            <Item 
              label="Settings" 
              icon={Settings} 
              onClick={settings.onOpen} 
            />
            
            {/* "New Page" - Highlighted with color for importance */}
            <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Item 
                onClick={handleCreate} 
                label="New page" 
                icon={PlusCircle} 
              />
            </div>
          </div>
        </div>

        {/* DOCUMENTS LIST - The "Tree" */}
        <div className="flex-1 overflow-y-auto mt-2">
          <div className="px-3 pb-2">
            <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
              My Spaces
            </p>
          </div>
          <DocumentList />
          
          {/* Quick Add Button at bottom of list */}
          <div className="mt-4 px-1">
             <Item onClick={handleCreate} icon={Plus} label="Add a page" />
          </div>

          {/* TRASH - Pushed to bottom visually */}
          <Popover>
            <PopoverTrigger className="mt-4 w-full px-1">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              side={isMobile ? "bottom" : "right"}
              className="w-72 p-0 border-slate-200 shadow-lg"
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>

        {/* RESIZE HANDLE (Desktop Only) */}
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-sky-300/50 opacity-0 transition group-hover/sidebar:opacity-100"
        ></div>
      </aside>

      {/* TOP NAVBAR (When Sidebar is Collapsed) */}
      <div
        ref={navbarRef}
        className={cn(
          "absolute left-60 top-0 z-[300] w-[calc(100%-240px)]",
          isResetting && "transition-all duration-300 ease-in-out",
          isMobile && "left-0 w-full",
        )}
      >
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav
            className={cn(
              "w-full bg-transparent px-3 py-3",
              !isCollapsed && "p-0",
            )}
          >
            {isCollapsed && (
              <div className="flex items-center gap-x-2">
                <MenuIcon
                  onClick={resetWidth}
                  role="button"
                  className="h-6 w-6 text-muted-foreground hover:text-sky-600 transition"
                />
                {/* Mobile Branding when collapsed */}
                {isMobile && (
                  <span className="font-semibold text-sm text-muted-foreground">
                    Redoit
                  </span>
                )}
              </div>
            )}
          </nav>
        )}
      </div>
    </>
  );
};
export default Navigation;