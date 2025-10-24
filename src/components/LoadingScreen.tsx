import { cn } from "@/lib/utils";
import bkLogo from "@/assets/bk-logo.jpg";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="mb-8">
        <img src={bkLogo} alt="Beverage King" className="w-24 h-24 object-contain" />
      </div>
      <div className="relative h-32 w-24">
        {/* Glass container */}
        <div className="absolute inset-0 border-4 border-primary rounded-lg" />
        {/* Liquid animation */}
        <div className="absolute bottom-0 left-0 right-0 bg-primary/80 rounded-b-md animate-fill-glass" />
        {/* Glass shine */}
        <div className="absolute top-0 left-1/4 w-1 h-full bg-white/20 transform -skew-x-12" />
        <div className="absolute top-0 left-1/3 w-px h-full bg-white/20 transform -skew-x-12" />
      </div>
      <p className="mt-4 text-lg font-medium text-primary animate-pulse">Pouring your experience...</p>
    </div>
  );
};