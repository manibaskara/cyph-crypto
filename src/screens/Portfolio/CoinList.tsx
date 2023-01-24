import React from 'react';
import {
  RefreshControl,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  ListRenderItem,
} from 'react-native';

import Divider from '../../shared/components/Divider';
import {convertToDollar} from '../../utils/util';
import {TokenHoldingsEntity} from '../../context/types';
import {useApiContext} from '../../context/useApiContext';

type Props = {
  totalHoldings?: TokenHoldingsEntity[] | null;
};
const CoinList: React.FC<Props> = ({totalHoldings = []}) => {
  const {portfolioData, fetchPortFolioData} = useApiContext();

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
    <FlatList
      testID="portfolio-list"
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={portfolioData?.isFetching}
          onRefresh={fetchPortFolioData}
        />
      }
      contentContainerStyle={
        totalHoldings?.length === 0 && styles.listEmptyContainer
      }
      data={totalHoldings}
      ListEmptyComponent={portfolioData.isFetching ? null : renderEmpty}
      renderItem={renderItem}
      keyExtractor={item => {
        return item.symbol;
      }}
    />
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
