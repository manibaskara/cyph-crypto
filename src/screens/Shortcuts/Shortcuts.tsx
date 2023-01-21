import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView, Text} from 'react-native';

const Shortcuts = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>{'Shortcuts'}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Shortcuts;
