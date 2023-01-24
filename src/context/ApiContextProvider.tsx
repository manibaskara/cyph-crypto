import React, {useReducer, useRef} from 'react';
import {CACHE_AGE_UPDATE_TIME, PORTFOLIO_URL} from '../constants';
import {
  addAllChainsDataInFirstElement,
  isCacheExpired,
  timeSince,
} from '../utils/util';
import {PortfoliosResponse} from './types';
import useFetch from './useFetch';

type Props = {
  children?: React.ReactNode;
};

enum FetchActionKind {
  FETCHING = 'FETCHING',
  FETCHED = 'FETCHED',
  FETCH_ERROR = 'FETCH_ERROR',
  UPDATE_CACHE_TIME = 'UPDATE_CACHE_TIME',
}

type ActionType<T> =
  | {type: FetchActionKind.FETCHING}
  | {type: FetchActionKind.FETCH_ERROR; payload: string}
  | {
      type: FetchActionKind.FETCHED;
      payload: T | null;
    }
  | {type: FetchActionKind.UPDATE_CACHE_TIME; payload: number};

type StateResponseType<T> = {
  isFetching: boolean;
  error: string | null;
  data: T | null;
  timeSinceLastFetch: string;
};

const initialState = {
  isFetching: false,
  error: null,
  data: null,
  timeSinceLastFetch: '-',
};

type ApiContextType = {
  fetchPortFolioData: () => Promise<void>;
  portfolioData: StateResponseType<PortfoliosResponse>;
};

export const ApiContext = React.createContext<ApiContextType>({
  fetchPortFolioData: () => Promise.reject(),
  portfolioData: initialState,
});

const APIContextProvider: React.FC<Props> = ({children}) => {
  const {fetchData} = useFetch();

  const portFolioIntervalId = useRef<number>();

  const [portfolioData, dispatchPortfolioData] = useReducer(
    (
      oldState: StateResponseType<PortfoliosResponse>,
      action: ActionType<PortfoliosResponse>,
    ) => {
      switch (action.type) {
        case FetchActionKind.FETCHING:
          return {...oldState, isFetching: true};
        case FetchActionKind.FETCHED:
          return {
            ...oldState,
            isFetching: false,
            data: action.payload,
          };
        case FetchActionKind.FETCH_ERROR:
          return {...oldState, isFetching: false, error: action.payload};
        case FetchActionKind.UPDATE_CACHE_TIME:
          return {
            ...oldState,
            timeSinceLastFetch: timeSince(action.payload),
          };
        default:
          return oldState;
      }
    },
    initialState,
  );

  const fetchPortFolioData = async () => {
    try {
      dispatchPortfolioData({type: FetchActionKind.FETCHING});
      const res = await fetchData<PortfoliosResponse>(PORTFOLIO_URL);
      dispatchPortfolioData({
        type: FetchActionKind.FETCHED,
        payload: addAllChainsDataInFirstElement(res.data),
      });
      dispatchPortfolioData({
        type: FetchActionKind.UPDATE_CACHE_TIME,
        payload: res.timeStamp,
      });
      if (portFolioIntervalId.current) {
        clearInterval(portFolioIntervalId.current);
      }
      portFolioIntervalId.current = setInterval(() => {
        dispatchPortfolioData({
          type: FetchActionKind.UPDATE_CACHE_TIME,
          payload: res.timeStamp,
        });
        if (isCacheExpired(res.timeStamp)) {
          fetchPortFolioData();
        }
      }, CACHE_AGE_UPDATE_TIME);
    } catch (error) {
      if (portFolioIntervalId.current) {
        clearInterval(portFolioIntervalId.current);
      }
      dispatchPortfolioData({
        type: FetchActionKind.FETCH_ERROR,
        payload: 'Failed to fetch portfolio data',
      });
    }
  };

  return (
    <ApiContext.Provider
      value={{
        fetchPortFolioData,
        portfolioData,
      }}>
      {children}
    </ApiContext.Provider>
  );
};

export default APIContextProvider;
