"use client";

import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

export const Pricing = () => {
  return (
    <div className="flex w-full flex-col items-center py-20 dark:bg-[#1F1F1F]">
      <h2 className="text-3xl font-bold md:text-4xl">Simple Pricing, No Surprises</h2>
      <p className="mt-4 text-muted-foreground">Stop paying for features you don&apos;t use.</p>
      
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        
        {/* FREE PLAN - The "Hook" */}
        <div className="relative flex w-full max-w-sm flex-col rounded-2xl border bg-background p-8 shadow-sm transition hover:border-sky-500">
          <div className="mb-6">
            <h3 className="text-xl font-bold">The Doer</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold">$0</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Perfect for individuals who want to get focused.</p>
          </div>
          
          <ul className="mb-8 space-y-4">
            <li className="flex items-center gap-3 text-sm">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              Unlimited Tasks & Notes
            </li>
            <li className="flex items-center gap-3 text-sm">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              Basic AI Prioritization
            </li>
            <li className="flex items-center gap-3 text-sm">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              Mobile App Access
            </li>
          </ul>
          
          <SignInButton mode="modal">
            <Button className="w-full" variant="outline">Start for Free</Button>
          </SignInButton>
        </div>

        {/* PRO PLAN - The "Upgrade" */}
        <div className="relative flex w-full max-w-sm flex-col rounded-2xl border border-sky-500 bg-background p-8 shadow-lg">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-3 py-1 text-xs font-bold text-white">
            MOST POPULAR
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-bold">The Achiever</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold">$8</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">For power users and small teams.</p>
          </div>

          <ul className="mb-8 space-y-4">
            <li className="flex items-center gap-3 text-sm">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900">
                <Check className="h-4 w-4 text-sky-600" />
              </div>
              Everything in Free
            </li>
            <li className="flex items-center gap-3 text-sm">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900">
                <Check className="h-4 w-4 text-sky-600" />
              </div>
              Advanced Burnout Protection
            </li>
            <li className="flex items-center gap-3 text-sm">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900">
                <Check className="h-4 w-4 text-sky-600" />
              </div>
              Integrations (Jira, Slack, Calendar)
            </li>
             <li className="flex items-center gap-3 text-sm">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900">
                <Check className="h-4 w-4 text-sky-600" />
              </div>
              Team Reporting
            </li>
          </ul>

          <SignInButton mode="modal">
            <Button className="w-full bg-sky-600 hover:bg-sky-700">Get Pro</Button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
};