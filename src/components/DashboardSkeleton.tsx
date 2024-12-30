import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="flex max-w-[1200px] mx-auto flex-col gap-10 pl-10  min-h-80 w-full">
      <Skeleton className="w-[30%] h-32" />
      <div className="space-y-8">
        <Skeleton className="h-20 w-[250px]" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-4 w-[200px]" />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Skeleton className="w-[30%] min-h-[400px]" />
        <Skeleton className="w-[30%] min-h-[400px]" />
        <Skeleton className="w-[30%] min-h-[400px]" />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
