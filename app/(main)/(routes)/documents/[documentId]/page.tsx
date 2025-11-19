"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import { Cover } from "@/components/cover";
import { Toolbar } from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    [],
  );

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    });
  };

  // 1. IMPROVED LOADING STATE
  // Aligned skeleton padding with actual content so it doesn't "jump" on load
  if (document === undefined) {
    return (
      <div className="min-h-full bg-slate-50 dark:bg-[#1F1F1F]">
        <Cover.Skeleton />
        <div className="mx-auto mt-8 w-full max-w-3xl px-5 md:px-10">
          <div className="space-y-6 pt-4 animate-pulse">
            <Skeleton className="h-14 w-[60%]" /> {/* Title Placeholder */}
            <div className="space-y-3 pt-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[95%]" />
                <Skeleton className="h-4 w-[60%]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div className="flex h-full items-center justify-center text-muted-foreground">Not found</div>;
  }

  return (
    // 2. MAIN CONTAINER STYLE
    // bg-slate-50: Soft paper background for "Anti-Burnout" feel
    // pb-40: Huge bottom padding so mobile keyboard doesn't cover the last line
    <div className="min-h-full bg-slate-50 pb-40 dark:bg-[#1F1F1F] animate-in fade-in duration-500 ease-in-out">
      
      <Cover url={document.coverImage} />
      
      {/* 3. CONTENT WRAPPER 
          mx-auto max-w-3xl: Standard readable width
          px-5:  Essential side padding for Mobile phones so text isn't edge-to-edge
      */}
      <div className="mx-auto w-full max-w-3xl px-5 md:px-10">
        
        {/* Toolbar (Icon + Title) */}
        <div className="group relative mt-8 md:mt-10">
            <Toolbar initialData={document} />
        </div>

        {/* Editor Area */}
        <div className="mt-4">
            <Editor onChange={onChange} initialContent={document.content} />
        </div>
        
      </div>
    </div>
  );
};

export default DocumentIdPage;