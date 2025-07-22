import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWallet } from "@/hooks/useWallet";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const HeroSection = () => {
  const { isConnected, isCorrectNetwork } = useWallet();
  const [walletAddress, setWalletAddress] = useState("");

  const handleAnalyze = () => {
    if (!walletAddress.trim()) {
      toast({
        title: "Adresse requise",
        description: "Veuillez entrer une adresse de wallet à analyser.",
        variant: "destructive",
      });
      return;
    }

    if (!walletAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      toast({
        title: "Adresse invalide",
        description: "Veuillez entrer une adresse Ethereum valide.",
        variant: "destructive",
      });
      return;
    }

    // TODO: Implémenter l'analyse du wallet
    toast({
      title: "Analyse en cours",
      description: `Analyse du wallet ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)} sur Monad Testnet.`,
    });
  };

  return (
    <section className="relative min-h-[calc(100vh-200px)] flex items-center justify-center overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-[var(--gradient-background)]"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Monalyze
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-4">
          Real-time Monad wallet scanner
        </p>
        
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Analyze your crypto portfolio in real-time with advanced insights on the 
          Monad blockchain
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
          <Input 
            type="text" 
            placeholder="Enter wallet address (0x...)"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="bg-card border-border text-foreground placeholder:text-muted-foreground px-4 py-6 text-lg min-w-[300px] sm:flex-1"
          />
          <Button 
            size="lg" 
            onClick={handleAnalyze}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold whitespace-nowrap"
            style={{ boxShadow: 'var(--glow-primary)' }}
          >
            Analyze
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;