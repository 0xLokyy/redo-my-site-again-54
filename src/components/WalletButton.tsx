import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, AlertTriangle, CheckCircle } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { formatAddress } from "@/lib/web3";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const WalletButton = () => {
  const { account, isConnecting, isCorrectNetwork, connect, disconnect, switchNetwork, isConnected } = useWallet();

  if (!isConnected) {
    return (
      <Button 
        onClick={connect} 
        disabled={isConnecting}
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
        style={{ boxShadow: 'var(--glow-primary)' }}
      >
        <Wallet className="w-4 h-4 mr-2" />
        {isConnecting ? "Connexion..." : "Connect Wallet"}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Wallet className="w-4 h-4" />
          <span className="hidden sm:inline">{formatAddress(account!)}</span>
          {isCorrectNetwork ? (
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <CheckCircle className="w-3 h-3 mr-1" />
              Monad
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Autre réseau
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">Wallet connecté</p>
          <p className="text-xs text-muted-foreground">{formatAddress(account!)}</p>
        </div>
        <DropdownMenuSeparator />
        {!isCorrectNetwork && (
          <>
            <DropdownMenuItem onClick={switchNetwork} className="text-orange-600 dark:text-orange-400">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Changer vers Monad Testnet
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem 
          onClick={() => window.open('https://testnet.monadexplorer.com', '_blank')}
          className="text-blue-600 dark:text-blue-400"
        >
          Voir sur l'explorateur
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={disconnect} className="text-red-600 dark:text-red-400">
          Déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletButton;