import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Pressable,
  ListRenderItem,
} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {colors} from '../../constants';
import Button from '../../shared/components/Button';
import Divider from './Divider';

type Props = {
  data?: any[] | null;
  idField: string;
  valueField: string;
  value: any;
  onChange: (item: any) => void;
};

const AppPicker: React.FC<Props> = ({
  data,
  value,
  idField,
  valueField,
  onChange,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);
  const disabled = !data || data.length === 0;

  const snapPoints = useMemo(() => ['1%', '25%'], []);

  const handlePresentModalPress = useCallback(() => {
    if (!disabled) {
      bottomSheetModalRef.current?.present();
      setIsOpen(true);
    }
  }, [disabled]);

  const handleSheetChanges = useCallback((index: number) => {
    setIsOpen(index === 1);
  }, []);

  const handleItemSelect = (item: any) => {
    setIsOpen(false);
    onChange(item);
    bottomSheetModalRef.current?.close();
  };

  const renderItem: ListRenderItem<any> = ({item, index}) => {
    return (
      <Pressable
        testID={`picker-item-${index}`}
        style={[
          styles.buttonStyle,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor:
              value && item[idField] === value[idField]
                ? colors.chip
                : 'transparent',
          },
        ]}
        onPress={() => handleItemSelect(item)}>
        <Text style={styles.title}>{item[valueField]}</Text>
        <Divider />
      </Pressable>
    );
  };

  return (
    <View>
      <View style={styles.row}>
        <Button
          testID="app-picker-button"
          value={
            disabled
              ? '-'
              : value && value[valueField]
              ? value[valueField]
              : 'Select an Item'
          }
          onPress={handlePresentModalPress}
          showIcon
          iconName={isOpen ? 'caret-up-outline' : 'caret-down-outline'}
        />
      </View>

      {data && data.length !== 0 ? (
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <FlatList
            data={data}
            keyExtractor={item => {
              return item[idField];
            }}
            renderItem={renderItem}
          />
        </BottomSheetModal>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {fontSize: 16, paddingVertical: 6, textAlignVertical: 'center'},
  row: {flexDirection: 'row', alignItems: 'center'},
  buttonStyle: {
    paddingHorizontal: 12,
  },
  icon: {
    paddingStart: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: colors.chip,
  },
});

export default AppPicker;
