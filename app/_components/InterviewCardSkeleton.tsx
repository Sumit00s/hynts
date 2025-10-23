// File: app/_components/InterviewCardSkeleton.tsx

export default function InterviewCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4 flex-1">
          {/* Logo */}
          <div className="w-14 h-14 bg-gray-300 rounded-lg flex-shrink-0" />

          {/* Title & Company */}
          <div className="flex-1">
            <div className="h-4 bg-gray-300 rounded w-1/3 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/4" />
          </div>
        </div>

        {/* Verdict Badge */}
        <div className="h-6 bg-gray-300 rounded-full w-24 flex-shrink-0" />
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Meta Info */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-300 rounded w-full" />
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Advice Section */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/4" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-6 bg-gray-300 rounded-full w-20" />
      </div>
    </div>
  );
}
