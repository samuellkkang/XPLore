export default function PlaceholderRow() {
  return (
    <div data-testid="placeholder-row">
      {/* Desktop: horizontal row ≥768px */}
      <div className="hidden md:flex items-center gap-4 px-4 py-3 bg-white rounded-lg border border-gray-100">
        <span className="w-8 text-center font-bold text-lg text-gray-300">—</span>
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gray-100" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-gray-300">—</p>
          <p className="text-sm text-gray-200">—</p>
        </div>
        <div className="text-right">
          <p className="text-gray-300">—</p>
        </div>
        <div>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-300">
            —
          </span>
        </div>
      </div>

      {/* Mobile: compact card <768px */}
      <div className="flex md:hidden flex-col gap-2 p-3 bg-white rounded-lg border border-gray-100">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold w-6 text-center text-gray-300">—</span>
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gray-100" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-300">—</p>
            <p className="text-xs text-gray-200">—</p>
          </div>
        </div>
        <div className="flex items-center justify-between pl-9">
          <span className="text-sm text-gray-300">—</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-300">
            —
          </span>
        </div>
      </div>
    </div>
  );
}
