import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMillis = (min) => min * 1000 * 60;

const formatTime = (time) => time < 10 ? `0${time}` : time;

export const Countdown = ({
  minutes = 20,
  isPaused = true,
  onProgress,
  onEnd,
}) => {
  const [millis, setMillis] = React.useState(null);

  const min = Math.floor(millis / 1000 / 60) % 60;
  const sec = Math.floor(millis / 1000) % 60;

  const interval = React.useRef(null);

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        // clear interval
        clearInterval(interval.current);
        return time;
      }

      // decrement 1 sec on every interval
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  React.useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  React.useEffect(() => {
    // report the progress
    onProgress(millis / minutesToMillis(minutes));

    if (millis === 0) {
      // timer ends, we'll execute onEnd func (to vibrate the phone)
      onEnd();
    }
  }, [millis]);

  React.useEffect(() => {
    if (isPaused) {
      // clearing the reference
      if (interval.current) {
        clearInterval(interval.current);
      }
      return;
    }

    interval.current = setInterval(countDown, 1000);

    // clear interval
    return () => clearInterval(interval.current);
  }, [isPaused]);

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