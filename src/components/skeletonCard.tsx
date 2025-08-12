
export default function SkeletonCard() {
  return (
    <div className="border rounded-lg shadow-sm p-4 animate-pulse">
      <div className="bg-gray-300 h-40 w-full rounded mb-4"></div>
      <div className="bg-gray-300 h-6 w-3/4 rounded mb-2"></div>
      <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
    </div>
  );
}
