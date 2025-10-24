import { Share2, Facebook, Twitter, Copy, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose 
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

export const SharePanel = () => {
  const { toast } = useToast();
  const websiteUrl = window.location.origin;
  const shareText = "Join the Beverage King Insiders Club and unlock exclusive rewards!";

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(websiteUrl);
    toast({
      title: "Link copied!",
      description: "Share link has been copied to your clipboard",
    });
  };

  const shareOptions = [
    {
      name: "Copy Link",
      icon: <Copy className="h-4 w-4" />,
      action: handleCopyLink,
    },
    {
      name: "Facebook",
      icon: <Facebook className="h-4 w-4" />,
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteUrl)}`, '_blank');
      },
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-4 w-4" />,
      action: () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(websiteUrl)}`, '_blank');
      },
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[340px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share with Friends
          </SheetTitle>
          <SheetDescription>
            Share Beverage King Insiders Club with your friends
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {/* Share buttons */}
          <div className="grid grid-cols-3 gap-2">
            {shareOptions.map((option) => (
              <SheetClose key={option.name} asChild>
                <Button
                  variant="outline"
                  onClick={option.action}
                  className="w-full h-auto py-4 flex flex-col items-center gap-2"
                >
                  {option.icon}
                  <span className="text-xs">{option.name}</span>
                </Button>
              </SheetClose>
            ))}
          </div>

          {/* QR Code */}
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <QrCode className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Scan QR Code</h3>
              </div>
              
              <div className="flex justify-center">
                <div className="p-3 bg-white rounded-xl">
                  <QRCodeSVG 
                    value={websiteUrl}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground text-center mt-4">
                Scan to visit Beverage King Insiders Club
              </p>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};