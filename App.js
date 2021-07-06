import React from 'react';
import { StyleSheet, Platform, View } from 'react-native';
// import Constants from 'expo-constants';

import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/Timer';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';

export default function App() {
  const [focusSubject, setFocusSubject] = React.useState('gardening');

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer focusSubject={focusSubject} onTimerEnd={() => { setFocusSubject(null); }} />
      ) : (
        <Focus addSubject={setFocusSubject} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
    backgroundColor: colors.darkBlue,
  },
});
