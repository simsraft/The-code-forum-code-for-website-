import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forumCodeSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface ForumCodeInputProps {
  onSubmit: (code: string) => void;
  buttonText?: string;
}

export default function ForumCodeInput({ onSubmit, buttonText = "Join Forum" }: ForumCodeInputProps) {
  const [code, setCode] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Format and validate the code
    const formattedCode = code.toUpperCase().replace(/[^A-Z1-9]/g, "");
    
    const result = forumCodeSchema.safeParse(formattedCode);
    if (!result.success) {
      toast({
        title: "Invalid forum code",
        description: "Forum code must be 5 characters (A-Z and 1-9)",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(formattedCode);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow A-Z and 1-9, convert to uppercase
    const value = e.target.value.toUpperCase().replace(/[^A-Z1-9]/g, "").slice(0, 5);
    setCode(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 p-4 sm:p-2 rounded-full bg-white/30 dark:bg-slate-950/30 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all">
      <Input
        type="text"
        value={code}
        onChange={handleChange}
        placeholder="Enter 5-character code (e.g. AB123)"
        className="rounded-full text-center text-lg font-mono tracking-wider max-w-xs bg-white/80 dark:bg-slate-900/80"
        maxLength={5}
      />
      <Button 
        type="submit" 
        className="rounded-full px-8 shadow-md hover:shadow-lg transition-all" 
        disabled={code.length !== 5}
      >
        {buttonText}
      </Button>
    </form>
  );
}
