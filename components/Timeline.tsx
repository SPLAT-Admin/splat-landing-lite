interface TimelineItem {
  date: string;
  event: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.date} className="flex items-start space-x-4">
          <div className="text-sm font-bold text-red-500">{item.date}</div>
          <div className="text-base text-gray-300">{item.event}</div>
        </div>
      ))}
    </div>
  );
}