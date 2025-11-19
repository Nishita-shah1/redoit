"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";

import { Item } from "./Item";
import { FileIcon } from "lucide-react";

interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
}

export const DocumentList = ({
  parentDocumentId,
  level = 0,
}: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  
  // State to track which folders are open
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  });

  const onRedirect = (documentId: string) => {
    // Optimization: Don't reload if we are already on this page
    if (params.documentId === documentId) return;
    router.push(`/documents/${documentId}`);
  };

  // Loading Skeletons
  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      {/* Empty State Indicator 
         Change: simplified text to "Empty" and fixed the CSS logic.
         The 'last:block' class makes this visible ONLY if the list below it is empty.
      */}
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
        className={cn(
          "hidden text-xs font-medium text-muted-foreground/50 py-1 italic",
          "last:block", 
          level === 0 && "hidden"
        )}
      >
        Empty
      </p>

      {documents?.map((document) => (
        // added 'mt-0.5' for slight breathing room between items
        <div key={document._id} className="mt-0.5">
          <Item
            id={document._id}
            onClick={() => onRedirect(document._id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document._id}
            level={level}
            onExpand={() => onExpand(document._id)}
            expanded={expanded[document._id]}
          />
          {/* Recursive list for children */}
          {expanded[document._id] && (
            <DocumentList parentDocumentId={document._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};