import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { TokenData } from "@/lib/api";

interface TokensListProps {
  tokens: TokenData[];
  walletAddress: string;
}

const TokensList = ({ tokens, walletAddress }: TokensListProps) => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const openInExplorer = (contractAddress: string) => {
    window.open(`https://testnet.monadexplorer.com/token/${contractAddress}`, '_blank');
  };

  if (tokens.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Coins className="w-16 h-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No tokens found</h3>
          <p className="text-muted-foreground text-center">
            This wallet doesn't hold any ERC-20 tokens on Monad Testnet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Wallet Analysis Results</h2>
        <p className="text-muted-foreground">
          Found {tokens.length} token{tokens.length !== 1 ? 's' : ''} for{' '}
          <code className="bg-muted px-2 py-1 rounded text-sm">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </code>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tokens.map((token, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Coins className="w-4 h-4 text-primary" />
                  </div>
                  {token.name || 'Unknown Token'}
                </CardTitle>
                <Badge variant="secondary" className="font-mono">
                  {token.symbol || 'N/A'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Balance</label>
                <p className="text-2xl font-bold text-primary">
                  {token.balanceFormatted || '0'} {token.symbol}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Contract Address</label>
                <div className="flex items-center gap-2 mt-1">
                  <code className="bg-muted px-2 py-1 rounded text-xs flex-1 truncate">
                    {token.contractAddress}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(token.contractAddress, 'Contract address')}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openInExplorer(token.contractAddress)}
                    className="h-8 w-8 p-0"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="text-muted-foreground">Decimals</label>
                  <p className="font-medium">{token.decimals}</p>
                </div>
                <div>
                  <label className="text-muted-foreground">Raw Balance</label>
                  <p className="font-mono text-xs truncate">{token.balance}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TokensList;