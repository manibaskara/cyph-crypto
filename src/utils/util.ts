import {
  ChainPortfoliosEntity,
  PortfoliosResponse,
  TokenHoldingsEntity,
} from '../screens/Portfolio/PortfolioContext';

const intervals = [
  {label: 'Year', seconds: 31536000},
  {label: 'Month', seconds: 2592000},
  {label: 'Day', seconds: 86400},
  {label: 'Hour', seconds: 3600},
  {label: 'Min', seconds: 60},
  {label: 'Sec', seconds: 1},
  {label: 'Sec', seconds: 0},
];

export function timeSince(age: number | null) {
  if (age === null || age === undefined) {
    return;
  }
  if (age === 0) {
    return 'Just now';
  }
  const interval = intervals.find(i => i.seconds < age);
  if (interval) {
    const count = Math.floor(age / interval.seconds);
    if (interval.seconds < 60) {
      return '< 1 Min ago';
    }
    return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
  }
}

export function convertToDollar(amount?: string) {
  if (amount === undefined || amount === null || amount === '') {
    return '$0.00';
  }
  return `$${parseInt(amount, 10).toFixed(2)}`;
}

export function addAllChainsDataInFirstElement(dataObj: PortfoliosResponse) {
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
}
