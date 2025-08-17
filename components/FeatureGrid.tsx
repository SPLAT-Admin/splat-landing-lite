import { ReactNode } from "react";

interface Feature {
  title: string;
  description: string;
  /** Optional small label shown to the right of the title (e.g., "Premium") */
  badge?: string;
  /** Optional icon node to show before the title */
  icon?: ReactNode;
  /** If true, styles the card as a premium item (subtle glow + badge if none provided) */
  premium?: boolean;
}

interface FeatureGridProps {
  features: Feature[];
}

export default function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => {
        const isPremium =
          feature.premium === true || feature.badge?.toLowerCase() === "premium";
        const badgeText = feature.badge ?? (isPremium ? "Premium" : undefined);

        return (
          <div
            key={feature.title}
            className={[
              "group relative rounded-2xl border bg-gray-900 p-6 shadow-lg transition-all",
              "border-gray-800 hover:-translate-y-1 hover:shadow-xl",
              isPremium ? "ring-1 ring-crimson-primary/30 hover:ring-crimson-primary/50" : "ring-0",
            ].join(" ")}
            aria-label={feature.title}
          >
            {/* Top Accent Bar */}
            <div
              className={[
                "pointer-events-none absolute inset-x-0 top-0 h-0.5 rounded-t-2xl",
                isPremium
                  ? "bg-gradient-to-r from-crimson-primary via-crimson-primary to-crimson-primary"
                  : "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800",
              ].join(" ")}
            />

            {/* Content */}
            <div className="mb-3 flex items-start gap-3">
              {feature.icon && (
                <div className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-gray-800 text-crimson-primary ring-1 ring-gray-700">
                  {feature.icon}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-xl font-semibold text-crimson-primary">
                    {feature.title}
                  </h3>
                  {badgeText && (
                    <span
                      className={[
                        "inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                        isPremium
                          ? "bg-crimson-primary text-white"
                          : "bg-gray-800 text-gray-200 ring-1 ring-gray-700",
                      ].join(" ")}
                    >
                      {badgeText}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-base text-gray-300">{feature.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
