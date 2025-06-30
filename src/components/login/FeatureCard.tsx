import type { FeatureCardProps } from "vib/types/login";

export const FeatureCard = ({ icon: Icon, label, delay }: FeatureCardProps) => {
  return (
    <div className="group relative" style={{ animationDelay: `${delay}s` }}>
      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50 hover:bg-gray-900/80">
        <Icon className="mx-auto mb-2 h-6 w-6 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
        <p className="text-xs font-medium text-gray-300">{label}</p>
      </div>
      <div className="absolute inset-0 -z-10 rounded-2xl bg-emerald-500/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
};
