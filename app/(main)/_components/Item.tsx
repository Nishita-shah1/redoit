"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";
import { useUser } from "@clerk/clerk-react";

interface ItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
}

export const Item = ({
  id,
  label,
  onClick,
  icon: Icon,
  active,
  documentIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
}: ItemProps) => {
  const { user } = useUser();
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);

  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = archive({ id }).then(() => router.push("/documents"));

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note.",
    });
  };

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;

    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        router.push(`/documents/${documentId}`);
      },
    );

    toast.promise(promise, {
      loading: "Creating new note",
      success: "New note created.",
      error: "Failed to create note.",
    });
  };

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        // UX: Increased min-height and padding for easier tapping
        "group flex min-h-[36px] w-full items-center py-2 pr-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-slate-100 dark:hover:bg-neutral-800",
        // UX: Active state is now a soft pastel blue (Sky)
        active && "bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400",
      )}
    >
      {!!id && (
        <div
          role="button"
          className="mr-1 h-full rounded-sm hover:bg-slate-200 dark:hover:bg-neutral-700 p-0.5"
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-slate-400" />
        </div>
      )}
      
      {documentIcon ? (
        <div className="mr-2 shrink-0 text-[1.125rem]">{documentIcon}</div>
      ) : (
        <Icon 
            className={cn(
                "mr-2 h-[1.125rem] w-[1.125rem] shrink-0",
                active ? "text-sky-500" : "text-slate-400"
            )} 
        />
      )}

      <span className="truncate">{label}</span>
      
      {isSearch && (
        <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[.625rem] font-medium text-muted-foreground opacity-100 md:inline-flex">
          <span className="text-xs">CTRL</span>K
        </kbd>
      )}
      
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div
                role="button"
                // UX: Opacity-100 on mobile (always visible), Opacity-0 on desktop (hover only)
                className="ml-auto h-full rounded-sm opacity-100 hover:bg-slate-200 md:opacity-0 md:group-hover:opacity-100 dark:hover:bg-neutral-700 p-1"
              >
                <MoreHorizontal className="h-4 w-4 text-slate-400" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem onClick={onArchive}>
                <Trash className="mr-2 h-4 w-4 text-red-400" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="p-2 text-xs text-muted-foreground">
                Last edited by: {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            role="button"
            onClick={onCreate}
            // UX: Same visibility logic as the More button
            className="ml-auto h-full rounded-sm opacity-100 hover:bg-slate-200 md:opacity-0 md:group-hover:opacity-100 dark:hover:bg-neutral-700 p-1"
          >
            <Plus className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
      className="flex gap-x-2 py-[6px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};