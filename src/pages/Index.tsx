import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Hero } from "@/components/Hero";
import { PointsDisplay } from "@/components/PointsDisplay";
import { DiscordSection } from "@/components/DiscordSection";
import { AuthDialog } from "@/components/AuthDialog";
import { QRCodeSection } from "@/components/QRCodeSection";
import { ShareSection } from "@/components/ShareSection";
import { Button } from "@/components/ui/button";
import { LogOut, User as UserIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import bkLogo from "@/assets/bk-logo.jpg";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [points, setPoints] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            fetchUserPoints(session.user.id);
          }, 0);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserPoints(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserPoints = async (userId: string) => {
    const { data, error } = await supabase
      .from("customer_points")
      .select("points, total_earned")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching points:", error);
    } else if (data) {
      setPoints(data.points);
      setTotalEarned(data.total_earned);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    } else {
      setPoints(0);
      setTotalEarned(0);
      toast({
        title: "Signed out",
        description: "You've been successfully signed out",
      });
    }
  };

  const handleAuthSuccess = () => {
    // Points will be fetched automatically by the auth state change listener
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-xl text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={bkLogo} alt="Beverage King" className="w-12 h-12 object-contain" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Beverage King
            </span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-2 text-sm">
                  <UserIcon className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">{user.email}</span>
                </div>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="border-primary/30 hover:bg-primary/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => setAuthDialogOpen(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => window.location.href = '/admin/login'}
                  variant="outline"
                  size="sm"
                  className="border-primary/30 hover:bg-primary/10"
                >
                  Admin
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-16">
        <Hero onGetStarted={() => !user && setAuthDialogOpen(true)} />
        
        {user ? (
          <PointsDisplay points={points} totalEarned={totalEarned} />
        ) : (
          <div className="py-16 px-4 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Join the Insiders Club
            </h2>
            <p className="text-muted-foreground mb-6 text-lg">
              This is your VIP pass to everything happening at the crown jewel of spirits. 
              Join the Insiders Club today - and never miss a drop again.
            </p>
            <p className="text-muted-foreground mb-8 text-base">
              Ask the cashier how to sign up, or simply join during checkout!
            </p>
            <Button
              onClick={() => setAuthDialogOpen(true)}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Sign Up Now
            </Button>
          </div>
        )}
        
        <DiscordSection />
        
        <ShareSection />
        
        <QRCodeSection />
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 Beverage King. All rights reserved.</p>
        </div>
      </footer>

      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Index;