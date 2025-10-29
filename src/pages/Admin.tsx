import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Plus, RotateCcw, Shield, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface CustomerData {
  user_id: string;
  email: string;
  full_name: string | null;
  mobile_number: string | null;
  points: number;
  total_earned: number;
}

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCustomer, setEditingCustomer] = useState<CustomerData | null>(null);
  const [newPoints, setNewPoints] = useState("");
  const [csvDialogOpen, setCsvDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/admin/login");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setIsAdmin(true);
    fetchCustomers();
  };

  const fetchCustomers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("customer_points")
      .select(`
        user_id,
        points,
        total_earned,
        profiles!inner(email, full_name, mobile_number)
      `)
      .order("total_earned", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch customer data",
        variant: "destructive",
      });
      console.error(error);
    } else if (data) {
      const formattedData: CustomerData[] = data.map((item: any) => ({
        user_id: item.user_id,
        email: item.profiles.email,
        full_name: item.profiles.full_name,
        mobile_number: item.profiles.mobile_number,
        points: item.points,
        total_earned: item.total_earned,
      }));
      setCustomers(formattedData);
    }
    setLoading(false);
  };

  const handleUpdatePoints = async () => {
    if (!editingCustomer || !newPoints) return;

    const pointsToAdd = parseInt(newPoints);
    if (isNaN(pointsToAdd)) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }

    const updatedPoints = editingCustomer.points + pointsToAdd;
    const updatedTotalEarned = editingCustomer.total_earned + (pointsToAdd > 0 ? pointsToAdd : 0);

    const { error } = await supabase
      .from("customer_points")
      .update({ 
        points: updatedPoints,
        total_earned: updatedTotalEarned 
      })
      .eq("user_id", editingCustomer.user_id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update points",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Points updated for ${editingCustomer.email}`,
      });
      setEditingCustomer(null);
      setNewPoints("");
      fetchCustomers();
    }
  };

  const handleResetPoints = async (customer: CustomerData) => {
    const { error } = await supabase
      .from("customer_points")
      .update({ points: 0 })
      .eq("user_id", customer.user_id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to reset points",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Points reset for ${customer.email}`,
      });
      fetchCustomers();
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const handleCsvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result as string;
      const rows = text.split('\n').map(row => row.split(','));
      
      // Skip header row
      const dataRows = rows.slice(1).filter(row => row.length >= 4);
      
      let successCount = 0;
      let errorCount = 0;

      for (const row of dataRows) {
        const [email, fullName, mobileNumber, points] = row.map(cell => cell.trim());
        
        if (!email) continue;

        try {
          // Check if user exists
          const { data: profileData } = await supabase
            .from("profiles")
            .select("id")
            .eq("email", email)
            .maybeSingle();

          if (profileData) {
            // Update existing user
            await supabase
              .from("profiles")
              .update({ 
                full_name: fullName || null,
                mobile_number: mobileNumber || null
              })
              .eq("id", profileData.id);

            if (points) {
              const pointsNum = parseInt(points);
              if (!isNaN(pointsNum)) {
                await supabase
                  .from("customer_points")
                  .update({ 
                    points: pointsNum,
                    total_earned: pointsNum 
                  })
                  .eq("user_id", profileData.id);
              }
            }
            successCount++;
          } else {
            errorCount++;
          }
        } catch (error) {
          console.error(`Error processing row for ${email}:`, error);
          errorCount++;
        }
      }

      toast({
        title: "CSV Import Complete",
        description: `Successfully updated ${successCount} customers. ${errorCount} errors.`,
      });

      fetchCustomers();
      setCsvDialogOpen(false);
    };

    reader.readAsText(file);
  };

  if (isAdmin === null || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-xl text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Customer Points Management</p>
            </div>
          </div>
          <Button onClick={handleSignOut} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Customer Points Overview</CardTitle>
                <CardDescription>
                  View and manage customer points for all Insiders Club members
                </CardDescription>
              </div>
              <Button onClick={() => setCsvDialogOpen(true)} variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Import CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {customers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No customers yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Customers will appear here once they sign up
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead className="text-right">Current Points</TableHead>
                    <TableHead className="text-right">Total Earned</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.user_id}>
                      <TableCell className="font-medium">
                        {customer.full_name || "N/A"}
                      </TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.mobile_number || "N/A"}</TableCell>
                      <TableCell className="text-right font-semibold">
                        {customer.points.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {customer.total_earned.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingCustomer(customer);
                            setNewPoints("");
                          }}
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleResetPoints(customer)}
                        >
                          <RotateCcw className="w-3 h-3 mr-1" />
                          Reset
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>

      <Dialog open={!!editingCustomer} onOpenChange={() => setEditingCustomer(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Customer Points</DialogTitle>
            <DialogDescription>
              Add or subtract points for {editingCustomer?.email}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Current Points: {editingCustomer?.points.toLocaleString()}</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="points">Points to Add/Subtract</Label>
              <Input
                id="points"
                type="number"
                placeholder="Enter positive or negative number"
                value={newPoints}
                onChange={(e) => setNewPoints(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Use negative numbers to subtract points (e.g., -100)
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingCustomer(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdatePoints}>Update Points</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={csvDialogOpen} onOpenChange={setCsvDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Customer Data from CSV</DialogTitle>
            <DialogDescription>
              Upload a CSV file with columns: Email, Full Name, Mobile Number, Points
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="csv-file">CSV File</Label>
              <Input
                id="csv-file"
                type="file"
                accept=".csv"
                onChange={handleCsvUpload}
                className="cursor-pointer"
              />
              <p className="text-xs text-muted-foreground">
                CSV format: Email, Full Name, Mobile Number, Points (header row required)
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
