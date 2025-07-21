import { useState, useEffect } from 'react';
import { connectWallet, getConnectedAccount, switchToMonadTestnet, MONAD_TESTNET } from '@/lib/web3';
import { toast } from '@/hooks/use-toast';

export const useWallet = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

  // Vérifier la connexion au chargement
  useEffect(() => {
    checkConnection();
    
    // Écouter les changements de compte et de réseau
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const checkConnection = async () => {
    try {
      const connectedAccount = await getConnectedAccount();
      setAccount(connectedAccount);
      
      if (connectedAccount) {
        await checkNetwork();
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de la connexion:', error);
    }
  };

  const checkNetwork = async () => {
    if (!window.ethereum) return;
    
    try {
      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });
      setIsCorrectNetwork(chainId === MONAD_TESTNET.chainId);
    } catch (error) {
      console.error('Erreur lors de la vérification du réseau:', error);
      setIsCorrectNetwork(false);
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    setAccount(accounts[0] || null);
    if (accounts[0]) {
      checkNetwork();
    } else {
      setIsCorrectNetwork(false);
    }
  };

  const handleChainChanged = (chainId: string) => {
    setIsCorrectNetwork(chainId === MONAD_TESTNET.chainId);
    // Recharger la page pour éviter les problèmes de state
    window.location.reload();
  };

  const connect = async () => {
    if (!window.ethereum) {
      toast({
        title: "Wallet non détecté",
        description: "Veuillez installer MetaMask pour continuer.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    try {
      const connectedAccount = await connectWallet();
      setAccount(connectedAccount);
      setIsCorrectNetwork(true);
      
      toast({
        title: "Wallet connecté",
        description: "Connexion réussie au réseau Monad Testnet!",
      });
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      toast({
        title: "Erreur de connexion",
        description: error.message || "Impossible de se connecter au wallet.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const switchNetwork = async () => {
    try {
      await switchToMonadTestnet();
      setIsCorrectNetwork(true);
      toast({
        title: "Réseau changé",
        description: "Connexion au réseau Monad Testnet réussie!",
      });
    } catch (error: any) {
      console.error('Erreur lors du changement de réseau:', error);
      toast({
        title: "Erreur de réseau",
        description: error.message || "Impossible de changer de réseau.",
        variant: "destructive",
      });
    }
  };

  const disconnect = () => {
    setAccount(null);
    setIsCorrectNetwork(false);
    toast({
      title: "Wallet déconnecté",
      description: "Vous avez été déconnecté avec succès.",
    });
  };

  return {
    account,
    isConnecting,
    isCorrectNetwork,
    connect,
    disconnect,
    switchNetwork,
    isConnected: !!account,
  };
};