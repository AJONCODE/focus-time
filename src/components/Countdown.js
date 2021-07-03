import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMillis = (min) => min * 1000 * 60;

const formatTime = (time) => time < 10 ? `0${time}` : time;

export const Countdown = ({
  minutes = 20,
  isPaused,
}) => {
  const [millis, setMillis] = React.useState(minutesToMillis(minutes));

  const min = Math.floor(millis / 1000 / 60) % 60;
  const sec = Math.floor(millis / 1000) % 60;

  return (
    <View>
      <Text style={styles.text}>{formatTime(min)} : {formatTime(sec)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});