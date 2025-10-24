import { Button } from "@/components/ui/button";
import { Crown, Sparkles, Bell } from "lucide-react";
import bkLogo from "@/assets/bk-logo.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-card">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsl(45_100%_60%/0.1),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(280_40%_20%/0.3),transparent)]" />
      
      <div className="container relative z-10 px-4 py-20 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img src={bkLogo} alt="Beverage King Insiders Club" className="w-48 h-48 object-contain" />
          </div>

          {/* Main heading */}
          <h1 className="mb-6 text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Insiders Club
            </span>
          </h1>

          {/* Subheading */}
          <p className="mb-12 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            This isn't your typical rewards or loyalty program - no points, no punches, no complicated rules. 
            We're not asking you to prove your loyalty. All we're asking is that you show up, sign up, and get in on the good stuff before anyone else.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-xl shadow-[0_0_30px_hsl(45_100%_60%/0.3)] hover:shadow-[0_0_40px_hsl(45_100%_60%/0.4)] transition-all"
            >
              Join the Insiders Club
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all">
              <Crown className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Exclusive Early Access</h3>
              <p className="text-muted-foreground">Barrel drops before we post it on social</p>
            </div>
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Special Releases</h3>
              <p className="text-muted-foreground">First looks at limited bottles and rare finds</p>
            </div>
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all">
              <Bell className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Behind-the-Scenes</h3>
              <p className="text-muted-foreground">Direct updates on what we're working on</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};