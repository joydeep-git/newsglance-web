import { Skeleton } from "@/components/ui/skeleton";


const ProfileLoadingPage = () => {

  return (
    <div className="w-full space-y-6">

      {/* Header Skeleton */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <Skeleton className="h-32 w-full rounded-none" />
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            <Skeleton className="w-24 h-24 rounded-2xl -mt-16 sm:-mt-20" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Skeleton className="h-11 w-full sm:w-40" />
            <Skeleton className="h-11 w-full sm:w-40" />
          </div>
        </div>
      </div>


      {/* Cards Skeleton */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <Skeleton className="h-6 w-40 mb-6" />
          <div className="space-y-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <Skeleton className="h-6 w-32 mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
          </div>
        </div>
      </div>


      {/* Usage Skeleton */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <Skeleton className="h-6 w-32 mb-6" />
        <div className="grid sm:grid-cols-2 gap-4">
          <Skeleton className="h-28 rounded-xl" />
          <Skeleton className="h-28 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default ProfileLoadingPage;