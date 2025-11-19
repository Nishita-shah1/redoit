"use client";

import { Check, Minus, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Comparision = () => {
  return (
    <div className="w-full py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">Why people switch to Redoit</h2>
        </div>

        <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
          <div className="grid grid-cols-3 border-b bg-muted/50 p-4 text-sm font-medium">
            <div>Feature</div>
            <div className="text-center text-muted-foreground">Complex Tools</div>
            <div className="text-center font-bold text-sky-600">Redoit</div>
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-3 items-center p-4 text-sm border-b">
            <div className="font-medium">Setup Time</div>
            <div className="text-center text-muted-foreground">Hours (Build it yourself)</div>
            <div className="text-center font-bold">Instant (Ready to use)</div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-3 items-center p-4 text-sm border-b bg-muted/20">
            <div className="font-medium">Prioritization</div>
            <div className="text-center text-muted-foreground">Manual sorting</div>
            <div className="flex justify-center">
              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700 dark:bg-sky-900 dark:text-sky-300">
                AI Auto-Sort
              </span>
            </div>
          </div>

           {/* Row 3 */}
           <div className="grid grid-cols-3 items-center p-4 text-sm border-b">
            <div className="font-medium">Mobile Experience</div>
            <div className="text-center text-muted-foreground">Clunky / Slow</div>
            <div className="text-center font-bold">Fast & Native Feel</div>
          </div>


          {/* Row 4 */}
          <div className="grid grid-cols-3 items-center p-4 text-sm bg-muted/20">
            <div className="font-medium">Burnout Protection</div>
            <div className="flex justify-center text-muted-foreground"><X className="h-4 w-4" /></div>
            <div className="flex justify-center text-green-600"><Check className="h-4 w-4" /></div>
          </div>
        </div>
      </div>
    </div>
  );
};