// API configuration and functions for BlockVision
const BLOCKVISION_API_KEY = "304DjsqViQ7iVi3IVagjYINUbAa";
const BLOCKVISION_BASE_URL = "/blockvision-proxy/v1";

export interface TokenData {
  name: string;
  symbol: string;
  balance: string;
  contractAddress: string;
  decimals: number;
  balanceFormatted?: string;
}

export interface BlockVisionResponse {
  code: number;
  message: string;
  data: {
    tokens: TokenData[];
  };
}

export const fetchWalletTokens = async (address: string): Promise<TokenData[]> => {
  try {
    const response = await fetch(`${BLOCKVISION_BASE_URL}/account/token-list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': BLOCKVISION_API_KEY,
      },
      body: JSON.stringify({
        address: address,
        chainId: "10143"
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: BlockVisionResponse = await response.json();
    
    if (result.code !== 200) {
      throw new Error(result.message || 'API request failed');
    }

    // Format balances for display
    const formattedTokens = result.data.tokens.map(token => ({
      ...token,
      balanceFormatted: formatTokenBalance(token.balance, token.decimals)
    }));

    return formattedTokens;
  } catch (error) {
    console.error('Error fetching wallet tokens:', error);
    throw error;
  }
};

const formatTokenBalance = (balance: string, decimals: number): string => {
  try {
    const balanceNum = parseFloat(balance) / Math.pow(10, decimals);
    return balanceNum.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 6
    });
  } catch {
    return balance;
  }
};