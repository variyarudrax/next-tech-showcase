import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-row space-y-10 space-x-2 w-full items-center">
      <div className="space-y-2 w-4/5">
        <div className="flex gap-2 items-center ">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-3 w-[100px]" />
        </div>
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
      </div>
      <Skeleton className="h-[150px] w-[250px] rounded-xl" />
    </div>
  )
}
