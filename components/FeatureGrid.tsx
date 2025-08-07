interface Feature {
  title: string;
  description: string;
}

interface FeatureGridProps {
  features: Feature[];
}

export default function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <div key={feature.title} className="rounded-lg border border-gray-700 bg-gray-900 p-6 shadow-lg">
          <h3 className="mb-2 text-xl font-semibold text-red-500">{feature.title}</h3>
          <p className="text-base text-gray-300">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}