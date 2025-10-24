import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode } from "lucide-react";

export const QRCodeSection = () => {
  const websiteUrl = window.location.origin;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20 max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center gap-3 justify-center">
            <QrCode className="w-6 h-6 text-primary" />
            <CardTitle className="text-2xl">Scan to Visit</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div className="p-4 bg-white rounded-xl">
            <QRCodeSVG 
              value={websiteUrl}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Scan this QR code to visit Beverage King Insiders Club
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
