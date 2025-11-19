"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight, Sparkles, BrainCircuit, HeartPulse } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  const router = useRouter();
  const searchParams = useSearchParams();
  const isPublicView = searchParams.get("public") === "true";

  useEffect(()=>{
    if(!isLoading && isAuthenticated && !isPublicView){
      router.push('/documents');
    }
  },[isAuthenticated, isLoading, router, isPublicView]);


  if(isAuthenticated && !isLoading && !isPublicView){
    return(
      <div className='w-full flex items-center justify-center pt-40'>
        <Spinner />
      </div>
    )
  }

  
  return (
    // ADDED: pt-28 md:pt-40 to push content below the fixed Navbar
    <div className="max-w-4xl space-y-8 text-center pt-28 md:pt-40">
      {/* Feature Pill */}
      <div className="mx-auto flex w-fit items-center gap-x-2 rounded-full border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
        <BrainCircuit className="h-4 w-4 text-sky-500" />
        <span>AI-Powered Prioritization</span>
      </div>

      {/* Headline */}
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-6xl">
        Rethink how you work. <br />
        <span className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
          Avoid the burnout.
        </span>
      </h1>

      {/* Subheading */}
      <h2 className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
        <span className="font-bold text-foreground">Redoit</span> helps you organize, 
        prioritize, and execute without the overwhelm. The smart workspace that 
        knows when you need a break.
      </h2>

      {/* Value Props Grid */}
      <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-3 sm:gap-8 opacity-80">
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-sm font-medium">Smart Sorting</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900/30">
            <HeartPulse className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-sm font-medium">Burnout Prevention</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900/30">
            <ArrowRight className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-sm font-medium">Auto-Context</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="pt-6">
        {isLoading && (
          <div className="flex w-full items-center justify-center">
            <Spinner  />
          </div>
        )}

        {isAuthenticated && !isLoading && (
          <Button asChild size="lg" className="font-bold">
            <Link href="/documents">
              Enter Redoit
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}

        {!isAuthenticated && !isLoading && (
          <SignInButton mode="modal">
            <Button size="lg" className="font-bold">
              Get Redoit Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
};