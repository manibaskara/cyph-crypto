import React, {useCallback, useEffect, useRef, useState} from 'react';
import {CACHE_EXPIRY, PORTFOLIO_URL} from '../../constants';
import {addAllChainsDataInFirstElement} from '../../utils/util';
import {
  ChainPortfoliosEntity,
  PortfolioContext,
  PortfoliosResponse,
} from './PortfolioContext';

type Props = {
  children?: React.ReactNode;
};

export const PortfolioProvider: React.FC<Props> = ({children}) => {
  const [portfolioData, setPortfolioData] = useState<PortfoliosResponse | null>(
    null,
  );

  const [selectedChain, setSelectedChain] =
    useState<ChainPortfoliosEntity | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const cachedTimeAgo = useRef<number>();
  const [cacheAge, setCacheAge] = useState<number | null>();

  const intervalId = useRef<number>();

  const fetchPortfolioData = useCallback(async () => {
    try {
      if (portfolioData && cachedTimeAgo.current) {
        let age = (Date.now() - cachedTimeAgo.current) / 1000;
        setCacheAge(age);
        if (age < CACHE_EXPIRY) {
          return Promise.resolve(portfolioData);
        }
      }

      setIsFetching(true);
      const res = await fetch(PORTFOLIO_URL);
      if (res.ok) {
        const dataObj: PortfoliosResponse = await res.json();
        addAllChainsDataInFirstElement(dataObj);
        setPortfolioData(dataObj);
        cachedTimeAgo.current = Date.now();
        setCacheAge(0);
        setIsFetching(false);
        return Promise.resolve(dataObj);
      }
      setIsFetching(false);
      return Promise.reject(res);
    } catch (e) {
      cachedTimeAgo.current = undefined;
      setCacheAge(undefined);
      setIsFetching(false);
      return Promise.reject(e);
    }
  }, [portfolioData]);

  useEffect(() => {
    fetchPortfolioData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    intervalId.current = setInterval(() => {
      fetchPortfolioData();
    }, 10 * 1000);
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [cachedTimeAgo, fetchPortfolioData, portfolioData]);

  return (
    <PortfolioContext.Provider
      value={{
        setPortfolioData,
        portfolioData,
        fetchPortfolioData,
        isFetching,
        selectedChain,
        setSelectedChain,
        cacheAge,
      }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioProvider;
