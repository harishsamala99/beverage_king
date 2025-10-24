import { Button } from "@/components/ui/button";
import { Share2, Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ShareSection = () => {
  const { toast } = useToast();
  const websiteUrl = window.location.origin;
  const shareTitle = "Join the Beverage King Insiders Club";
  const shareText = "Get exclusive early access to barrel drops and special releases at Beverage King!";

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: websiteUrl,
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(websiteUrl);
      toast({
        title: "Link copied!",
        description: "Website link has been copied to clipboard",
      });
    }
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(websiteUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(websiteUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(shareTitle);
    const body = encodeURIComponent(`${shareText}\n\n${websiteUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Share with Friends
          </span>
        </h2>
        <p className="text-lg text-muted-foreground">
          Help others discover the Insiders Club
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Button
          onClick={handleWebShare}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Share2 className="w-5 h-5 mr-2" />
          Share
        </Button>
        
        <Button
          onClick={shareOnFacebook}
          size="lg"
          variant="outline"
          className="border-primary/30 hover:bg-primary/10"
        >
          <Facebook className="w-5 h-5 mr-2" />
          Facebook
        </Button>
        
        <Button
          onClick={shareOnTwitter}
          size="lg"
          variant="outline"
          className="border-primary/30 hover:bg-primary/10"
        >
          <Twitter className="w-5 h-5 mr-2" />
          Twitter
        </Button>
        
        <Button
          onClick={shareOnLinkedIn}
          size="lg"
          variant="outline"
          className="border-primary/30 hover:bg-primary/10"
        >
          <Linkedin className="w-5 h-5 mr-2" />
          LinkedIn
        </Button>
        
        <Button
          onClick={shareViaEmail}
          size="lg"
          variant="outline"
          className="border-primary/30 hover:bg-primary/10"
        >
          <Mail className="w-5 h-5 mr-2" />
          Email
        </Button>
      </div>
    </div>
  );
};
