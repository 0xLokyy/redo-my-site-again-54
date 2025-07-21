import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Wifi } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";

const NetworkStatus = () => {
  const { isConnected, isCorrectNetwork } = useWallet();

  if (!isConnected) {
    return (
      <Badge variant="outline" className="flex items-center gap-1">
        <Wifi className="w-3 h-3" />
        Non connecté
      </Badge>
    );
  }

  if (!isCorrectNetwork) {
    return (
      <Badge variant="destructive" className="flex items-center gap-1">
        <AlertTriangle className="w-3 h-3" />
        Mauvais réseau
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 flex items-center gap-1">
      <CheckCircle className="w-3 h-3" />
      Monad Testnet
    </Badge>
  );
};

export default NetworkStatus;