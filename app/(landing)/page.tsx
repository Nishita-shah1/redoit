"use client";
import { Footer } from "./_components/Footer";
import { Heading } from "./_components/Heading";
import { Heroes } from "./_components/Heroes";
import { FeaturesGrid } from "./_components/FeaturesGrid";
import { Comparision } from "./_components/Comparison";
import { Pricing } from "./_components/Pricing";

import { Suspense } from "react";

export default function LandingPage() {
  return (
    <div className="flex min-h-full flex-col dark:bg-[#1F1F1F]">
      <div className="flex flex-1 flex-col items-center justify-center gap-y-8 px-6 pb-10 text-center md:justify-start">
        {/* WRAP HEADING IN SUSPENSE */}
        <Suspense fallback={<div className="h-full w-full bg-background" />}>
           <Heading />
        </Suspense>
        <Heroes />
        <FeaturesGrid />
        <Comparision />
        <Pricing />
      </div>
      <Footer />
    </div>
  );
}
