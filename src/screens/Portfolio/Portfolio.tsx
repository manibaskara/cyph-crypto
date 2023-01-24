import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import Button from '../../shared/components/Button';

import CoinList from './CoinList';
import {ChainPortfoliosEntity} from '../../context/types';
import {colors} from '../../constants';
import AppPicker from '../../shared/components/AppPicker';
import {convertToDollar} from '../../utils/util';
import {useApiContext} from '../../context/useApiContext';
import CheckBox from '../../shared/components/Checkbox';
import Divider from '../../shared/components/Divider';

const Portfolio = () => {
  const {fetchPortFolioData, portfolioData} = useApiContext();

  const [selectedChain, setSelectedChain] =
    useState<ChainPortfoliosEntity | null>();

  const isSelectedChainNotEmpty =
    selectedChain?.token_holdings &&
    selectedChain?.token_holdings?.length !== 0;

  const [isOnlyVerified, setIsOnlyVerified] = useState(false);

  useEffect(() => {
    fetchPortFolioData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chainEntities = portfolioData?.data?.record?.chain_portfolios;

  useEffect(() => {
    if (portfolioData?.data?.record?.chain_portfolios?.[0]) {
      setSelectedChain(portfolioData?.data?.record.chain_portfolios[0]);
    }
  }, [portfolioData, setSelectedChain]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('../../assets/wallet_bg.png')}
        resizeMode="cover">
        <View>
          <View style={styles.alignRight}>
            <AppPicker
              data={chainEntities}
              idField="chain_id"
              valueField="chain_id"
              value={selectedChain}
              onChange={item => {
                setSelectedChain(item);
              }}
            />
          </View>
          <Text style={styles.title}>{'Total Balance'}</Text>
          <Text style={styles.holding}>
            {convertToDollar(selectedChain?.total_value)}
          </Text>
          <View style={styles.title}>
            <Button
              value="Load Wallet"
              onPress={() => {}}
              color={colors.primary}
            />
          </View>
        </View>
      </ImageBackground>

      <View>
        <Divider />
        <View style={styles.rowSpaced}>
          <Text style={styles.timerText}>
            Last Updated: {portfolioData?.timeSinceLastFetch}
          </Text>
          <CheckBox
            isChecked={isOnlyVerified}
            onPress={() => setIsOnlyVerified(!isOnlyVerified)}
            title="Only verified coins"
          />
        </View>
        <Divider />
      </View>
      <CoinList
        totalHoldings={
          isOnlyVerified
            ? selectedChain?.token_holdings?.filter(item => item.is_verified)
            : selectedChain?.token_holdings
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {padding: 18},
  alignRight: {flexDirection: 'row-reverse'},
  title: {fontSize: 12, paddingTop: 12},
  holding: {
    fontSize: 32,
    paddingTop: 8,
    fontWeight: 'bold',
  },
  timerText: {
    fontSize: 12,
  },
  rowSpaced: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
});

export default Portfolio;
