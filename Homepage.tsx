import { useState } from "react";
import { useLocation } from "wouter";
import ForumCodeInput from "@/components/forum-code-input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Shield, FileUp, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

export default function HomePage() {
  const [location, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [forumName, setForumName] = useState("");
  const [forumDescription, setForumDescription] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  
  // Create Forum mutation
  const createForumMutation = useMutation({
    mutationFn: async (forumData: { name: string; description: string; code: string }) => {
      const res = await apiRequest("POST", "/api/forums", forumData);
      return await res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Forum created",
        description: `Your forum "${data.name}" has been created with code: ${data.code}`,
      });
      setIsDialogOpen(false);
      // Navigate to the newly created forum
      setLocation(`/forum/${data.code}`);
    },
    onError: (err: Error) => {
      toast({
        title: "Failed to create forum",
        description: err.message,
        variant: "destructive",
      });
    },
  });
  
  const generateForumCode = () => {
    // Generate a random 5-character code using A-Z capitals and 1-9
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedCode(code);
    return code;
  };
  
  const handleCreateForum = () => {
    if (!forumName.trim()) {
      toast({
        title: "Forum name required",
        description: "Please enter a name for your forum",
        variant: "destructive",
      });
      return;
    }
    
    const code = generatedCode || generateForumCode();
    createForumMutation.mutate({
      name: forumName,
      description: forumDescription,
      code,
    });
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary leading-tight">Private, Secure Code Discussions</h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-8">
            Join exclusive forums with a simple 5-character code and collaborate in a secure environment designed for developers.
          </p>
          <ForumCodeInput onSubmit={(code) => setLocation(`/forum/${code}`)} buttonText="Enter Forum" />
        </div>
        
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="overflow-hidden bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all">
            <CardContent className="p-6 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Private Forums</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access exclusive forums with a unique 5-character code that only you and your team members know.
              </p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border border-secondary/20 hover:border-secondary/40 transition-all">
            <CardContent className="p-6 text-center">
              <div className="h-16 w-16 rounded-full bg-secondary/20 text-secondary flex items-center justify-center mx-auto mb-4">
                <FileUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">File Sharing</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Share code snippets, images, and files directly in your discussions to enhance collaboration.
              </p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border border-accent/20 hover:border-accent/40 transition-all">
            <CardContent className="p-6 text-center">
              <div className="h-16 w-16 rounded-full bg-accent/20 text-accent flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Environment</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your discussions remain private and secure with our authentication system and encrypted communications.
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection line on desktop */}
            <div className="hidden md:block absolute top-20 left-1/3 right-1/3 h-0.5 bg-primary"></div>
            
            <div className="relative">
              <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg shadow-primary/20">1</div>
              <Card className="h-full bg-white/70 dark:bg-slate-950/70 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-3">Create an Account</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Sign up with your email and password to join our community of developers.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="relative">
              <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg shadow-primary/20">2</div>
              <Card className="h-full bg-white/70 dark:bg-slate-950/70 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-3">Enter Forum Code</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Use a 5-character code (A-Z and 1-9) to access a private forum.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="relative">
              <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg shadow-primary/20">3</div>
              <Card className="h-full bg-white/70 dark:bg-slate-950/70 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-3">Start Collaborating</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Post messages, share files, and discuss code with your team members.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-primary rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start your private discussion?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of developers who collaborate securely on THECODEFORUM.COM
          </p>
          <Button 
            size="lg" 
            className="rounded-full bg-white text-primary hover:bg-gray-100"
            onClick={() => {
              setForumName("");
              setForumDescription("");
              generateForumCode();
              setIsDialogOpen(true);
            }}
          >
            Create a New Forum
          </Button>
        </div>
      </div>
      
      {/* Create Forum Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-3xl bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border border-primary/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Create New Forum</DialogTitle>
            <DialogDescription className="opacity-90">
              Create your own private forum for discussions with a unique access code.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="forumName">Forum Name</Label>
              <Input
                id="forumName"
                placeholder="Enter forum name"
                value={forumName}
                onChange={(e) => setForumName(e.target.value)}
                className="rounded-full"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="forumDescription">Description (optional)</Label>
              <Textarea
                id="forumDescription"
                placeholder="Describe your forum's purpose"
                value={forumDescription}
                onChange={(e) => setForumDescription(e.target.value)}
                className="rounded-xl"
                rows={3}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="forumCode">Access Code</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="forumCode"
                  value={generatedCode}
                  onChange={(e) => setGeneratedCode(e.target.value.toUpperCase())}
                  className="rounded-full font-mono text-lg tracking-wider text-center"
                  maxLength={5}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  className="rounded-full" 
                  onClick={() => generateForumCode()}
                >
                  Generate
                </Button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                5-character code (A-Z, 1-9) that others will use to join your forum.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              className="rounded-full"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              className="rounded-full"
              onClick={handleCreateForum}
              disabled={createForumMutation.isPending}
            >
              {createForumMutation.isPending ? "Creating..." : "Create Forum"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
