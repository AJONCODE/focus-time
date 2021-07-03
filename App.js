import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Constants from 'expo-constants';

import { Focus } from './src/features/focus/focus';
import { colors } from './src/utils/colors';

export default function App() {
  const [focusSubject, setFocusSubject] = React.useState(null);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Text>Here is where I'm going to build a timer!</Text>
      ) : (
        <Focus addSubject={setFocusSubject} />
      )}
      <Text>{focusSubject}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.darkBlue,
  },
});
