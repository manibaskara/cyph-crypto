import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../constants';

type Props = {
  isChecked: boolean;
  onPress: () => void;
  title?: string;
};

const CheckBox: React.FC<Props> = ({isChecked, onPress, title}) => {
  const iconName = isChecked ? 'checkbox-marked' : 'checkbox-blank-outline';

  return (
    <Pressable
      testID="app-check-box"
      hitSlop={20}
      style={styles.container}
      onPress={onPress}>
      <MaterialCommunityIcons name={iconName} size={14} color="#000" />
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  title: {
    fontSize: 12,
    color: colors.dark,
    marginStart: 4,
  },
});
