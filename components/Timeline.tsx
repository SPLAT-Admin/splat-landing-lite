interface TimelineItem {
  date: string;
  event: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

/**
 * Vertical timeline with generous spacing & clear separation.
 * - Left rail with markers for each milestone
 * - Date column emphasized
 * - Event content wrapped in subtle card for readability
 */
export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical rail */}
      <div
        className="absolute left-5 top-0 bottom-0 w-px bg-gray-800"
        aria-hidden="true"
      />

      <ul className="space-y-10">
        {items.map((item, idx) => (
          <li key={`${idx}-${item.date}`} className="relative flex items-start gap-4 pl-10">
            {/* Marker */}
            <span
              className="absolute left-4 mt-1.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-crimson-primary bg-black shadow-[0_0_0_3px_rgba(0,0,0,1)]"
              aria-hidden="true"
            />

            {/* Date */}
            <div className="min-w-[6.5rem] pr-2 text-sm font-bold tracking-wide text-crimson-primary uppercase">
              {item.date}
            </div>

            {/* Event */}
            <div className="flex-1">
              <div className="rounded-xl border border-gray-800 bg-gray-900/70 p-4 text-base text-gray-200 shadow">
                {item.event}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
