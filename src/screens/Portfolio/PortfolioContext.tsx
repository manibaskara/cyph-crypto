import React, {useContext} from 'react';

export interface PortfoliosResponse {
  record: Record;
  metadata: Metadata;
}

export interface Record {
  chain_portfolios?: ChainPortfoliosEntity[] | null;
}

export interface ChainPortfoliosEntity {
  chain_id: string;
  token_holdings?: TokenHoldingsEntity[] | null;
  total_value: string;
  unverfied_total_value: string;
}

export interface TokenHoldingsEntity {
  about: string;
  actual_balance: string;
  balance: string | number;
  coin_gecko_id?: string | null;
  contract_address: string;
  contract_decimals: number;
  is_verified: boolean;
  logo_url: string;
  name: string;
  price: number;
  symbol: string;
  total_value: string;
}

export interface Metadata {
  id: string;
  private: boolean;
  createdAt: string;
}

export interface PortfolioContextType {
  portfolioData: PortfoliosResponse | null;
  setPortfolioData: React.Dispatch<
    React.SetStateAction<PortfoliosResponse | null>
  >;
  fetchPortfolioData: () => Promise<PortfoliosResponse | null>;
  isFetching: boolean;
}

export const PortfolioContext = React.createContext<PortfolioContextType>({
  portfolioData: null,
  setPortfolioData: () => {
    //do nothing
  },
  fetchPortfolioData: () => {
    return Promise.reject();
  },
  isFetching: false,
});

export const usePortfolioDataContext = () => {
  const portfolioDataContext = useContext(PortfolioContext);
  if (!portfolioDataContext) {
    throw new Error('usePortfolioData not used within PortfolioProvider');
  }

  return portfolioDataContext;
};
