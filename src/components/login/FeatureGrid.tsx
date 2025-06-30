import { Music, Sparkles, Play } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

const features = [
  { icon: Music, label: "Deep Analysis" },
  { icon: Sparkles, label: "AI Insights" },
  { icon: Play, label: "Live Data" },
];

export const FeatureGrid = () => {
  return (
    <div className="mb-12 grid grid-cols-3 gap-4">
      {features.map((feature, i) => (
        <FeatureCard
          key={i}
          icon={feature.icon}
          label={feature.label}
          delay={i * 0.2}
        />
      ))}
    </div>
  );
};
