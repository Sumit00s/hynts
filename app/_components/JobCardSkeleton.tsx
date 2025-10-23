export default function JobCardSkeleton() {
  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white animate-pulse">
      {/* Top Section */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-lg bg-gray-200" />
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>

      {/* Badges */}
      <div className="flex gap-2 mt-4">
        <div className="h-6 bg-gray-200 rounded-full w-20" />
        <div className="h-6 bg-gray-200 rounded-full w-24" />
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
      </div>

      {/* Skills */}
      <div className="flex gap-2 mt-4">
        <div className="h-6 bg-gray-200 rounded-full w-16" />
        <div className="h-6 bg-gray-200 rounded-full w-20" />
        <div className="h-6 bg-gray-200 rounded-full w-16" />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <div className="h-10 bg-gray-200 rounded flex-1" />
        <div className="h-10 bg-gray-200 rounded flex-1" />
      </div>
    </div>
  );
}
