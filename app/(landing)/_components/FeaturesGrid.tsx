"use client";

import { BrainCircuit, BatteryWarning, CalendarCheck, Users, Layers, ArrowRight } from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "The AI Prioritizer",
    description: "Stop listing tasks manually. Our engine analyzes deadlines and effort to tell you exactly what to do next.",
    color: "text-sky-500",
    bg: "bg-sky-100 dark:bg-sky-900/20",
    
  },
  {
    icon: BatteryWarning,
    title: "Burnout Shield",
    description: "With redoit prevent BurnOUT. We understand in AI era you are already multitasking. Connect to redoit to do all without Burnout, because we beileve in your mental health ",
    color: "text-red-500",
    bg: "bg-red-100 dark:bg-red-900/20",
  },
  {
    icon: CalendarCheck,
    title: "Auto-Scheduling",
    description: "We connect with Google & Outlook calendars to ensure your tasks actually fit into your available time slots.",
    color: "text-green-500",
    bg: "bg-green-100 dark:bg-green-900/20",
  },
  {
    icon: Layers,
    title: "Context, Not Clutter",
    description: "Files, notes, and links live inside the task. No more digging through folder trees to find the brief.",
    color: "text-purple-500",
    bg: "bg-purple-100 dark:bg-purple-900/20",
  },
];

export const FeaturesGrid = () => {
  return (
    <div className="px-4 py-20 md:px-10">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          Redoit with AI <br /> Redoit the <span className="underline decoration-sky-500 ">Betterway.</span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="group flex flex-col justify-between rounded-xl border bg-background p-6 shadow-sm transition hover:shadow-md"
          >
            <div>
              <div className={`mb-4 w-fit rounded-lg p-3 ${feature.bg}`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};