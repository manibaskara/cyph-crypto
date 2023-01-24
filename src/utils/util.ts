import {CACHE_EXPIRY} from '../constants';
import {
  ChainPortfoliosEntity,
  PortfoliosResponse,
  TokenHoldingsEntity,
} from '../context/types';

const intervals = [
  {label: 'Year', seconds: 31536000},
  {label: 'Month', seconds: 2592000},
  {label: 'Day', seconds: 86400},
  {label: 'Hour', seconds: 3600},
  {label: 'Min', seconds: 60},
  {label: 'Sec', seconds: 10},
  {label: 'Sec', seconds: 0},
];

export function timeSince(timeStamp: number): string {
  let age = (Date.now() - timeStamp) / 1000;

  if (age === null || age === undefined) {
    return '-';
  }
  if (age < 10) {
    return 'Just Now';
  }
  if (age < 60) {
    return '< 1 Min Ago';
  }

  const interval = intervals.find(i => i.seconds < age);
  if (interval) {
    const count = Math.floor(age / interval.seconds);

    return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
  }
  return '-';
}

export function isCacheExpired(timeStamp: number): boolean {
  let age = (Date.now() - timeStamp) / 1000;
  return age > CACHE_EXPIRY;
}

export function convertToDollar(amount?: string) {
  if (amount === undefined || amount === null || amount === '') {
    return '$0.00';
  }
  return `$${parseInt(amount, 10).toFixed(2)}`;
}

export function addAllChainsDataInFirstElement(dataObj: PortfoliosResponse) {
  if (
    !dataObj?.record?.chain_portfolios?.length ||
    dataObj.record.chain_portfolios.length === 0
  ) {
    return dataObj;
  }
  if (dataObj.record.chain_portfolios[0].chain_id === 'ALL CHAINS') {
    return dataObj;
  }
  const masterObj: ChainPortfoliosEntity = {
    total_value: '0',
    unverfied_total_value: '0',
    token_holdings: [],
    chain_id: 'ALL CHAINS',
  };

  let masterArr: TokenHoldingsEntity[] = [];

  dataObj.record.chain_portfolios?.forEach(item => {
    masterObj.total_value = (
      parseInt(masterObj.total_value, 10) + parseInt(item.total_value, 10)
    ).toString();

    masterObj.unverfied_total_value = (
      parseInt(masterObj.unverfied_total_value, 10) +
      parseInt(item.unverfied_total_value, 10)
    ).toString();
    if (item?.token_holdings && item?.token_holdings?.length > 0) {
      masterArr = [...masterArr, ...item.token_holdings];
    }
  });

  masterObj.token_holdings = masterArr;
  dataObj.record.chain_portfolios?.unshift(masterObj);
  return dataObj;
}
