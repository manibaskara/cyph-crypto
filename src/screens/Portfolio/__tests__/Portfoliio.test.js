import React from 'react';
import Portfolio from '../Portfolio';
import {
  render,
  flushPromises,
  fireEvent,
  act,
} from '../../../shared/testing/testing';

describe('Portfolio', () => {
  let originalFetch;
  let spyOnFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            record: {
              chain_portfolios: [
                {
                  chain_id: 'BSC',
                  token_holdings: [
                    {
                      about:
                        'USDC is a fully collateralized US dollar stablecoin. USDC is the bridge between dollars and trading on cryptocurrency exchanges. The technology behind CENTRE makes it possible to exchange value between people, businesses and financial institutions just like email between mail services and texts between SMS providers. We believe by removing artificial economic borders, we can create a more inclusive global economy. ',
                      actual_balance: '4.9232',
                      balance: '4923202796564808429',
                      coin_gecko_id: 'usd-coin',
                      contract_address:
                        '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
                      contract_decimals: 18,
                      is_verified: true,
                      logo_url:
                        'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
                      name: 'USD Coin',
                      price: 1.0236683,
                      symbol: 'USDC',
                      total_value: '5.04',
                    },
                    {
                      about:
                        'Sushi is a DeFi protocol that is completely community-driven, serving up delicious interest for your held crypto assets.\r\n\r\nOn Sushi, you can take advantage of passive-income providing DeFi tools such as liquidity providing, yield farming and staking. Furthermore, due to the decentralized nature of being an AMM (Automated Market Maker), Sushi has fewer hurdles to execute your cryptocurrency trades and all fees are paid to the users who provided liquidity, just as it should be!',
                      actual_balance: '0.7257',
                      balance: '725715816571991634',
                      coin_gecko_id: 'sushi',
                      contract_address:
                        '0x947950bcc74888a40ffa2593c5798f11fc9124c4',
                      contract_decimals: 18,
                      is_verified: true,
                      logo_url:
                        'https://assets.coingecko.com/coins/images/12271/large/512x512_Logo_no_chop.png?1606986688',
                      name: 'SushiToken',
                      price: 1.3928787,
                      symbol: 'SUSHI',
                      total_value: '1.01',
                    },
                    {
                      about: '',
                      actual_balance: '0.0031',
                      balance: '3127026955236606',
                      coin_gecko_id: null,
                      contract_address:
                        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
                      contract_decimals: 18,
                      is_verified: true,
                      logo_url:
                        'https://www.covalenthq.com/static/images/icons/display-icons/binance-coin-bnb-logo.png',
                      name: 'Binance Coin',
                      price: 291.8953,
                      symbol: 'BNB',
                      total_value: '0.91',
                    },
                    {
                      about:
                        'PancakeSwap is an automated market maker (“AMM”) that allows two tokens to be exchanged on the Binance Smart Chain. It is fast, cheap, and allows anyone to participate.',
                      actual_balance: '0.0',
                      balance: '0',
                      coin_gecko_id: 'pancakeswap-token',
                      contract_address:
                        '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
                      contract_decimals: 18,
                      is_verified: true,
                      logo_url:
                        'https://assets.coingecko.com/coins/images/12632/large/pancakeswap-cake-logo_%281%29.png?1629359065',
                      name: 'PancakeSwap Token',
                      price: 3.8842006,
                      symbol: 'CAKE',
                      total_value: '0',
                    },
                    {
                      about:
                        "W-ETH is \"wrapped ETH\" but let's start by introducing the players. First, there's Ether token. Ether or ETH is the native currency built on the Ethereum blockchain.\r\nSecond, there are alt tokens. When a dApp (decentralized app) is built off of the Ethereum Blockchain it usually implements it’s own form of Token. Think Augur’s REP Token, or Bancor's BNT Token. Finally the ERC-20 standard. ERC20 is a standard developed after the release of ETH that defines how tokens are transferred and how to keep a consistent record of those transfers among tokens in the Ethereum Network.",
                      actual_balance: '0.0',
                      balance: '0',
                      coin_gecko_id: 'weth',
                      contract_address:
                        '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
                      contract_decimals: 18,
                      is_verified: true,
                      logo_url:
                        'https://www.covalenthq.com/static/images/icons/display-icons/ethereum-eth-logo.png',
                      name: 'Ethereum Token',
                      price: 1635.3529,
                      symbol: 'ETH',
                      total_value: '0',
                    },
                    {
                      about:
                        'The best AMM+NFT decentralized exchange for newborn projects on Binance Smart Chain (BSC).',
                      actual_balance: '0.0',
                      balance: '0',
                      coin_gecko_id: 'babyswap',
                      contract_address:
                        '0x53e562b9b7e5e94b81f10e96ee70ad06df3d2657',
                      contract_decimals: 18,
                      is_verified: true,
                      logo_url:
                        'https://assets.coingecko.com/coins/images/16169/large/baby.PNG?1623190282',
                      name: 'BabySwap Token',
                      price: 0.06929927,
                      symbol: 'BABY',
                      total_value: '0',
                    },
                    {
                      about:
                        'Cyber Dragon is a Play to Earn Game based on Binance Smart Chain. This game is powered by BinaryX team. Players can create hero characters, collect rare equipments and challenge Dungeon. The final challenge is to defeat the ultimate boss, the Cyber Dragon. A hero will receive the dragon treasure house rewards by defeating the dragon. \r\n\r\nBNX is the governance token of BinaryX. BNX holders can participate in community governance and vote on major decisions. Some key operations of the game require  to consume BNX tokens, such as creating heroes, forging rare equipments and challenging the Cyber Dragon dungeons.',
                      actual_balance: '0.0',
                      balance: '0',
                      coin_gecko_id: 'binaryx',
                      contract_address:
                        '0x8c851d1a123ff703bd1f9dabe631b69902df5f97',
                      contract_decimals: 18,
                      is_verified: true,
                      logo_url:
                        'https://assets.coingecko.com/coins/images/18095/large/BinaryX-RGB-01_%282%29.png?1630462722',
                      name: 'BinaryX',
                      price: 128.2958,
                      symbol: 'BNX',
                      total_value: '0',
                    },
                    {
                      about:
                        'WazirX is a cryptocurrency exchange with an advanced trading interface and features to buy, sell & trade cryptocurrencies. It is an exchange with a live open order book system that allows users to trade 80+ digital assets like Bitcoin, BNB, Bitcoin Cash, Litecoin, Dash & many more.Users can deposit/withdraw cryptocurrencies and also cash in/cash out USDT via Peer-to-Peer (“P2P”) to Indian Rupees (“INR”) with ease and speed, as well as securely store their digital assets in the WazirX wallet.WazirX’s aim is to bridge the global fiat-cryptocurrency gap with the world’s first auto-matching P2P engine - WazirX Peer-to-Peer. As of today, WazirX Peer-to-Peer is the go-to method to deposit and withdraw INR in India, and growing steadily.WazirX’s native token, WRX, is the utility token forming the backbone of the WazirX ecosystem. The WRX token is built on Binance chain with future use cases including: trading fee discounts, WRX Trade Mining (unlock and earn WRX tokens by performing trades), paying for margin fees, and more.',
                      actual_balance: '0.0',
                      balance: '0',
                      coin_gecko_id: 'wazirx',
                      contract_address:
                        '0x8e17ed70334c87ece574c9d537bc153d8609e2a3',
                      contract_decimals: 8,
                      is_verified: true,
                      logo_url:
                        'https://assets.coingecko.com/coins/images/10547/large/WazirX.png?1580834330',
                      name: 'wazirx token',
                      price: 0.26990515,
                      symbol: 'WRX',
                      total_value: '0',
                    },
                    {
                      about:
                        'Wrapped BNB a wrapped version of the BNB native tokens on the BEP-20 standard on the Binance Smart Chain. Not to be confused with BNB Native Token on the BSC Chain.',
                      actual_balance: '0.0',
                      balance: '0',
                      coin_gecko_id: 'wbnb',
                      contract_address:
                        '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
                      contract_decimals: 18,
                      is_verified: true,
                      logo_url:
                        'https://assets.coingecko.com/coins/images/12591/large/binance-coin-logo.png?1600947313',
                      name: 'Wrapped BNB',
                      price: 290.0283,
                      symbol: 'WBNB',
                      total_value: '0',
                    },
                    {
                      about:
                        'Web3 is an umbrella term for an online ecosystem that cuts out the big middlemen on the Internet. Platforms on Web3 are not owned by central gatekeepers and you wouldn’t navigate the Internet through search engines such as Google. It uses blockchain, the same system used by cryptocurrencies and non-fungible tokens (NFTs).',
                      actual_balance: '0.0008',
                      balance: '831938778238502',
                      coin_gecko_id: 'web3-inu',
                      contract_address:
                        '0xd0c4bc1b89bbd105eecb7eba3f13e7648c0de38f',
                      contract_decimals: 18,
                      is_verified: true,
                      logo_url:
                        'https://assets.coingecko.com/coins/images/22278/large/logo_256px.png?1641398067',
                      name: 'WEB3 Inu',
                      price: 7.289646e-18,
                      symbol: 'WEB3',
                      total_value: '0.0',
                    },
                    {
                      about: '',
                      actual_balance: '92280.0',
                      balance: '92280000000000000000000',
                      coin_gecko_id: null,
                      contract_address:
                        '0xd35f9ab96d04adb02fd549ef6a576ce4e2c1d935',
                      contract_decimals: 18,
                      is_verified: false,
                      logo_url:
                        'https://logos.covalenthq.com/tokens/56/0xd35f9ab96d04adb02fd549ef6a576ce4e2c1d935.png',
                      name: '1Gas.org',
                      price: 0.40158507,
                      symbol: '1GAS.ORG',
                      total_value: '37058.27',
                    },
                    {
                      about: '',
                      actual_balance: '95641.0',
                      balance: '95641000000000000000000',
                      coin_gecko_id: null,
                      contract_address:
                        '0x8bd0e87273364ebbe3482efc166f7e0d34d82c25',
                      contract_decimals: 18,
                      is_verified: false,
                      logo_url:
                        'https://logos.covalenthq.com/tokens/56/0x8bd0e87273364ebbe3482efc166f7e0d34d82c25.png',
                      name: 'PDot.io',
                      price: 0.32945392,
                      symbol: 'PDOT.IO',
                      total_value: '31509.3',
                    },
                  ],
                  total_value: '6.96',
                  unverfied_total_value: '68574.54',
                },
                {
                  chain_id: 'AVALANCHE',
                  token_holdings: [
                    {
                      about:
                        'Aave is a decentralized money market protocol where users can lend and borrow cryptocurrency across 20 different assets as collateral. The protocol has a native token called AAVE, which is also a governance token that lets the community decide the direction of the protocol in a collective manner. Lenders can earn interest by providing liquidity to the market, while borrowers can borrow by collateralizing their cryptoassets to take out loans from the liquidity pools.\r\n\r\n',
                      actual_balance: '0.0121',
                      balance: '12078541635712831',
                      coin_gecko_id: 'aave',
                      contract_address:
                        '0x63a72806098bd3d9520cc43356dd78afe5d386d9',
                      contract_decimals: 18,
                      is_verified: true,
                      logo_url:
                        'https://assets.coingecko.com/coins/images/12645/large/AAVE.png?1601374110',
                      name: 'Aave Token',
                      price: 97.69127,
                      symbol: 'AAVE.E',
                      total_value: '1.18',
                    },
                    {
                      about:
                        'Pangolin is a community-driven decentralized exchange for Avalanche and Ethereum assets with fast settlement, low transaction fees, and a democratic distribution–powered by Avalanche.',
                      actual_balance: '0.0',
                      balance: '0',
                      coin_gecko_id: 'pangolin',
                      contract_address:
                        '0x60781c2586d68229fde47564546784ab3faca982',
                      contract_decimals: 18,
                      is_verified: true,
                      logo_url:
                        'https://assets.coingecko.com/coins/images/14023/large/pangolin.jpg?1613743598',
                      name: 'Pangolin',
                      price: 0.05146488,
                      symbol: 'PNG',
                      total_value: '0',
                    },
                    {
                      about: '',
                      actual_balance: '0.0',
                      balance: '0',
                      coin_gecko_id: null,
                      contract_address:
                        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
                      contract_decimals: 18,
                      is_verified: true,
                      logo_url:
                        'https://www.covalenthq.com/static/images/icons/display-icons/avalanche-avax-logo.png',
                      name: 'Avalanche Coin',
                      price: 23.8275,
                      symbol: 'AVAX',
                      total_value: '0',
                    },
                  ],
                  total_value: '1.18',
                  unverfied_total_value: '1.18',
                },
                {
                  chain_id: 'EVMOS',
                  token_holdings: [
                    {
                      about:
                        'DIFF is the governance token for Diffusion Finance, a Uniswap v2 fork and the first decentralized exchange for Evmos.',
                      actual_balance: '963.6829',
                      balance: '963682863688613879692',
                      coin_gecko_id: 'diffusion',
                      contract_address:
                        '0x3f75ceabcdfed1aca03257dc6bdc0408e2b4b026',
                      contract_decimals: 18,
                      is_verified: true,
                      logo_url:
                        'https://assets.coingecko.com/coins/images/25331/large/photo5451952870917257644.jpg?1651826321',
                      name: 'Diffusion',
                      price: 0.076602,
                      symbol: 'DIFF',
                      total_value: '73.82',
                    },
                    {
                      about:
                        'Evmos is the one of the first Ethereum Virtual Machine-based blockchains in the Cosmos ecosystem and enables developers to launch apps that run smart contracts across any number of EVM and Cosmos-based blockchains. It makes that process as simple and seamless as possible by allowing developers to continue creating apps in Solidity and Vyper like they’re accustomed to in the Ethereum ecosystem. Evmos opens a new frontier for blockchain applications, expanding the functionality of the EVM by enabling cross-chain applications that tap the liquidity and user bases of multiple blockchain ecosystems to provide more unified experiences.',
                      actual_balance: '1.8897',
                      balance: '1889672201505000000',
                      coin_gecko_id: 'evmos',
                      contract_address:
                        '0xd4949664cd82660aae99bedc034a0dea8a0bd517',
                      contract_decimals: 18,
                      is_verified: true,
                      logo_url:
                        'https://assets.coingecko.com/coins/images/24023/large/evmos.png?1653958927',
                      name: 'Wrapped Evmos',
                      price: 1.55,
                      symbol: 'WEVMOS',
                      total_value: '2.93',
                    },
                    {
                      about: '',
                      actual_balance: '0.385',
                      balance: 384963771537005700,
                      coin_gecko_id: null,
                      contract_address:
                        '0x93581991f68dbae1ea105233b67f7fa0d6bdee7b',
                      contract_decimals: 18,
                      is_verified: true,
                      logo_url:
                        'https://assets.coingecko.com/coins/images/24023/large/evmos.png',
                      name: 'Evmos',
                      price: 1.55,
                      symbol: 'EVMOS',
                      total_value: '0.6',
                    },
                    {
                      about: '',
                      actual_balance: '3260.5233',
                      balance: '3260523335949198051399',
                      coin_gecko_id: null,
                      contract_address:
                        '0xbbd37bf85f7474b5bde689695674fab1888565ad',
                      contract_decimals: 18,
                      is_verified: false,
                      logo_url:
                        'https://storage.googleapis.com/us-central1-dgc-berlin-0-470cbba9-bucket/tokenlist/oav.png',
                      name: 'Orbital Apes',
                      price: 0.0003796,
                      symbol: 'OAV',
                      total_value: '1.24',
                    },
                    {
                      about: '',
                      actual_balance: '0.9596',
                      balance: '959572',
                      coin_gecko_id: null,
                      contract_address:
                        '0xfa3c22c069b9556a4b2f7ece1ee3b467909f4864',
                      contract_decimals: 6,
                      is_verified: false,
                      logo_url:
                        'https://assets.coingecko.com/coins/images/16724/large/osmo.png',
                      name: 'Osmosis',
                      price: 1.033,
                      symbol: 'OSMO',
                      total_value: '0.99',
                    },
                    {
                      about: '',
                      actual_balance: '0.2682',
                      balance: '268181140885482955',
                      coin_gecko_id: null,
                      contract_address:
                        '0x63743acf2c7cfee65a5e356a4c4a005b586fc7aa',
                      contract_decimals: 18,
                      is_verified: false,
                      logo_url:
                        'https://assets.coingecko.com/coins/images/9956/thumb/4943.png',
                      name: 'Dai Stablecoin - Nomad',
                      price: 1.002,
                      symbol: 'DAI',
                      total_value: '0.27',
                    },
                  ],
                  total_value: '77.35',
                  unverfied_total_value: '79.84',
                },
              ],
            },
            metadata: {
              id: '62ea5f481c7f436f211de6ef',
              private: false,
              createdAt: '2022-08-03T11:43:04.132Z',
            },
          }),
        ok: true,
      }),
    );

    spyOnFetch = jest.spyOn(global, 'fetch');
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('renders correctly', () => {
    const {getByText} = render(<Portfolio />);
    expect(getByText('Total Balance')).toBeTruthy();
  });

  it('returns cached data if available', async () => {
    const {getByTestId} = render(<Portfolio />);

    await flushPromises();

    const flatList = getByTestId('portfolio-list');
    const {refreshControl} = flatList.props;
    act(async () => {
      refreshControl.props.onRefresh();
    });

    //asserts fetch is called only once after refreshing
    expect(spyOnFetch).toHaveBeenCalledTimes(1);
  });

  it('combines all chains data after fetching and renders with ALL CHAINS selected', async () => {
    const {getByText, getAllByText} = render(<Portfolio />);

    expect(getByText('Total Balance')).toBeTruthy();
    await flushPromises();

    expect(getAllByText('ALL CHAINS')).toBeTruthy();
    expect(getByText('PancakeSwap Token')).toBeTruthy();
  });

  it('renders only BSC coins when selecting BSC chain from drop down', async () => {
    const {getByText, getAllByText, getByTestId} = render(<Portfolio />);

    await flushPromises();
    expect(getAllByText('ALL CHAINS')).toBeTruthy();

    expect(() => getByText('Dai Stablecoin - Nomad')).toThrow();
    fireEvent.press(getByTestId('app-picker-button'));

    fireEvent.press(getByTestId('picker-item-3'));
    await flushPromises();

    expect(getByText('Dai Stablecoin - Nomad')).toBeTruthy();
  });

  it('renders only verified coins if checkbox selected', async () => {
    const {getByText, getByTestId} = render(<Portfolio />);

    await flushPromises();

    fireEvent.press(getByTestId('app-picker-button'));
    fireEvent.press(getByTestId('picker-item-3'));
    expect(getByText('Orbital Apes')).toBeTruthy();

    fireEvent.press(getByTestId('app-check-box'));
    expect(() => getByText('Orbital Apes')).toThrow();
  });
});
