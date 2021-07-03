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

  const interval = React.useRef(null);

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        // TODO: do more stuff here
        return time;
      }

      // decrement 1 sec on every interval
      const timeLeft = time - 1000;
      // TODO: report the progress
      return timeLeft;
    });
  };

  React.useEffect(() => {
    interval.current = setInterval(countDown, 1000);

    // clear interval
    return () => clearInterval(interval.current);
  }, []);

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