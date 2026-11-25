export default function Loading() {
  return (
    <div className="animate-pulse space-y-3" aria-busy="true">
      <div className="h-8 w-40 rounded bg-gray-200" />
      <div className="h-10 rounded bg-gray-200" />
      <div className="h-40 rounded bg-gray-200" />
    </div>
  );
}