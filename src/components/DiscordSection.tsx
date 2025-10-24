import { Button } from "@/components/ui/button";
import { MessageSquare, Users, TrendingUp } from "lucide-react";

export const DiscordSection = () => {
  const handleDiscordClick = () => {
    // Replace with your actual Discord invite link
    window.open("https://discord.gg/your-invite-link", "_blank");
  };

  return (
    <div className="w-full py-20 px-4 bg-gradient-to-b from-background to-card">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border border-primary/20 p-8 md:p-12">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex p-4 rounded-2xl bg-primary/10 backdrop-blur-sm border border-primary/20 mb-6">
                <MessageSquare className="w-12 h-12 text-primary" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Join Our Community
                </span>
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Connect with fellow spirit enthusiasts, share tasting notes, 
                get exclusive deals, and stay updated on new arrivals
              </p>

              <Button 
                onClick={handleDiscordClick}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 py-6 text-lg rounded-xl shadow-[0_0_30px_hsl(45_100%_60%/0.3)] hover:shadow-[0_0_40px_hsl(45_100%_60%/0.4)] transition-all"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Join Discord Server
              </Button>
            </div>

            {/* Community features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border text-center">
                <Users className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Active Community</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with other members daily
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border text-center">
                <TrendingUp className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Business Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Discuss industry trends and news
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border text-center">
                <MessageSquare className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Exclusive Channels</h3>
                <p className="text-sm text-muted-foreground">
                  Access member-only discussions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};