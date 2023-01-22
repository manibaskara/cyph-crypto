import React, {useState} from 'react';
import {
  RefreshControl,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  ListRenderItem,
} from 'react-native';
import CheckBox from '../../shared/components/Checkbox';

import Divider from '../../shared/components/Divider';
import {TokenHoldingsEntity, usePortfolioDataContext} from './PortfolioContext';
import {convertToDollar, timeSince} from '../../utils/util';

const CoinList: React.FC = () => {
  const {isFetching, fetchPortfolioData, selectedChain, cacheAge} =
    usePortfolioDataContext();

  const isSelectedChainNotEmpty =
    selectedChain?.token_holdings &&
    selectedChain?.token_holdings?.length !== 0;

  const [isOnlyVerified, setIsOnlyVerified] = useState(false);

  const renderItem: ListRenderItem<TokenHoldingsEntity> = ({item}) => {
    return (
      <View>
        <View style={[styles.row, styles.rowPadding]}>
          <View>
            <Image
              source={{uri: item.logo_url}}
              style={styles.logo}
              resizeMode={'contain'}
              defaultSource={require('../../assets/cypherd_icon.jpg')}
            />
            <Image
              source={{uri: item.logo_url}}
              style={styles.tinyLogo}
              defaultSource={require('../../assets/cypherd_icon.jpg')}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{item.name}</Text>
            <Text style={styles.subTitleText}>{item.symbol}</Text>
          </View>
          <View style={styles.balanceContainer}>
            <Text style={styles.titleText}>
              {convertToDollar(item.actual_balance)}
            </Text>
            <Text style={styles.subTitleText}>{item.total_value}</Text>
          </View>
        </View>
        <Divider />
      </View>
    );
  };

  const renderEmpty = () => {
    return (
      <View>
        <Text style={styles.emptyText}>{'The list is empty.'}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Divider />
      <View style={styles.rowSpaced}>
        <Text style={styles.timerText}>
          {cacheAge !== undefined && cacheAge !== null
            ? 'Last updated: ' + timeSince(cacheAge)
            : ''}
        </Text>
        {isSelectedChainNotEmpty ? (
          <CheckBox
            isChecked={isOnlyVerified}
            onPress={() => setIsOnlyVerified(!isOnlyVerified)}
            title="Only verified coins"
          />
        ) : null}
      </View>
      <Divider />
      <FlatList
        testID="portfolio-list"
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={fetchPortfolioData}
          />
        }
        contentContainerStyle={
          !isSelectedChainNotEmpty && styles.listEmptyContainer
        }
        data={
          isOnlyVerified
            ? selectedChain?.token_holdings?.filter(item => item.is_verified)
            : selectedChain?.token_holdings
        }
        ListEmptyComponent={renderEmpty}
        renderItem={renderItem}
        keyExtractor={item => {
          return item.symbol;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {flexDirection: 'row', padding: 16, alignItems: 'center'},
  rowSpaced: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  titleContainer: {
    marginStart: 16,
    flex: 1,
  },
  balanceContainer: {
    alignItems: 'flex-end',
  },
  titleText: {fontWeight: 'bold'},
  subTitleText: {paddingTop: 4},
  logo: {
    width: 45,
    height: 45,
    borderRadius: 20,
  },
  timerText: {
    fontSize: 12,
  },
  tinyLogo: {
    height: 16,
    width: 16,
    position: 'absolute',
    right: -5,
    bottom: -5,
    borderRadius: 20,
  },
  listEmptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
  },
  rowPadding: {
    paddingHorizontal: 24,
  },
});

export default CoinList;
