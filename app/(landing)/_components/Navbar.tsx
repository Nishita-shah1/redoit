"use client";

import { useScrollTop } from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <nav
      className={cn(
        // Fixed position for stability, glass effect for modern feel
        "fixed top-0 z-50 flex w-full items-center p-4 transition-all duration-300 ease-in-out dark:bg-[#1F1F1F]",
        "bg-background/75 backdrop-blur-sm", 
        scrolled && "border-b shadow-sm bg-background dark:bg-[#1F1F1F]"
      )}
    >
      <Logo />
      
      <div className="flex w-full items-center justify-end gap-x-2 md:ml-auto">
        {isLoading && (
          <Spinner />
        )}
        
        {!isLoading && !isAuthenticated && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Log In
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm" className="font-bold">
                Get Redoit Free
              </Button>
            </SignInButton>
          </>
        )}

        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents" className="flex items-center gap-x-2">
                Enter Redoit
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        
        <ModeToggle />
      </div>
    </nav>
  );
};