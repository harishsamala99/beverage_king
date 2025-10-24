import { Crown, TrendingUp, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PointsDisplayProps {
  points: number;
  totalEarned: number;
}

export const PointsDisplay = ({ points, totalEarned }: PointsDisplayProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Insider Status
          </span>
        </h2>
        <p className="text-xl text-muted-foreground">
          Your VIP access to everything happening at Beverage King
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <CardHeader className="relative">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10">
                <Crown className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-lg">Insider Points</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {points}
            </p>
            <p className="text-sm text-muted-foreground mt-2">VIP status tracker</p>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-accent/20 hover:border-accent/40 transition-all overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
          <CardHeader className="relative">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-accent/10">
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
              <CardTitle className="text-lg">Total Earned</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-5xl font-bold text-foreground">
              {totalEarned}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Lifetime points</p>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <CardHeader className="relative">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-lg">VIP Level</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-5xl font-bold text-foreground">
              {points >= 2000 ? 'Elite' : points >= 1000 ? 'Gold' : points >= 500 ? 'Silver' : 'Member'}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Current tier</p>
          </CardContent>
        </Card>
      </div>

      {/* VIP Benefits */}
      <div className="mt-12 p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border">
        <h3 className="text-2xl font-bold mb-4 text-center">Your Insiders Club Benefits</h3>
        <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
          No complicated rules. Just show up and get in on the good stuff before anyone else.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-muted/30 border border-primary/20">
            <div className="flex items-start gap-4">
              <Crown className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold mb-2">Exclusive Early Access</div>
                <div className="text-sm text-muted-foreground">
                  Barrel drops before we post it on social - you'll be first to know
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-xl bg-muted/30 border border-primary/20">
            <div className="flex items-start gap-4">
              <Sparkles className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold mb-2">Special Releases</div>
                <div className="text-sm text-muted-foreground">
                  First looks at limited bottles and rare finds you can't get anywhere else
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-xl bg-muted/30 border border-primary/20">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold mb-2">Behind-the-Scenes</div>
                <div className="text-sm text-muted-foreground">
                  Daily updates on the neat things we're working on at Beverage King
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-xl bg-muted/30 border border-primary/20">
            <div className="flex items-start gap-4">
              <Crown className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold mb-2">Direct Communication</div>
                <div className="text-sm text-muted-foreground">
                  We keep you in the loop - no algorithms, just straight to you
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};