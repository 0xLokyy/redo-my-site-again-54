import { Button } from "@/components/ui/button";
import { BarChart3, Wallet, TrendingUp } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import WalletButton from "@/components/WalletButton";
import NetworkStatus from "@/components/NetworkStatus";

const Header = () => {
  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">M</span>
            </div>
            <span className="text-2xl font-bold text-foreground">Monalyze</span>
          </div>
          
          {/* Centered Navigation */}
          <nav className="hidden md:flex items-center justify-center space-x-6 flex-1">
            <Button variant="secondary" className="bg-violet-600 text-white hover:bg-violet-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-white hover:bg-violet-600">
              <Wallet className="w-4 h-4 mr-2" />
              Portfolio
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-white hover:bg-violet-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </nav>

          {/* Theme Toggle and Connect Wallet */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <WalletButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;