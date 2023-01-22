import React from 'react';
import {StyleSheet, TextStyle, View} from 'react-native';
import {Pressable, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants';

interface Props {
  textStyle?: TextStyle;
  value: string;
  onPress: () => void;
  showIcon?: boolean;
  iconName?: string;
  color?: string;
  disabled?: boolean;
  testID?: string;
}

const Button: React.FC<Props> = props => {
  const {
    textStyle = {},
    value,
    onPress,
    showIcon,
    iconName,
    color = colors.chip,
    disabled = false,
    testID = 'button',
  } = props;
  return (
    <View style={styles.container}>
      <Pressable
        testID={testID}
        disabled={disabled}
        style={({pressed}) => [
          {
            opacity: pressed ? 0.75 : 1,
            backgroundColor: color,
          },
          styles.chip,
        ]}
        onPress={onPress}>
        <Text style={[styles.title, textStyle]}>{value}</Text>
        {showIcon && iconName ? (
          <Ionicons style={styles.icon} size={14} name={iconName} />
        ) : null}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  title: {
    fontSize: 14,
    paddingVertical: 4,
    textAlignVertical: 'center',
  },
  icon: {
    paddingStart: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 4,
    borderRadius: 20,
  },
});

export default Button;
