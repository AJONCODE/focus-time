import React from 'react';
import { StyleSheet, View, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';

import { Timing } from './Timing';

import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';

const DEFAULT_TIME = 20;
// const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, onTimerEnd }) => {
  // app will be awake
  useKeepAwake();

  const [minutes, setMinutes] = React.useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = React.useState(false);
  // We want to show progress bar from 100% to 0%
  const [progress, setProgress] = React.useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const onChangeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      // Vibration.vibrate('10s'); -> does not work for ios
      // vibrate every 1 second for 10 seconds
      const interval = setInterval(() => {
        Vibration.vibrate();
      }, 1000);

      // clear interval after 10 seconds
      setTimeout(() => clearInterval(interval), 10 * 1000);
    } else {
      // Vibrate android device for 10 seconds
      Vibration.vibrate(10000);
    }
  };

  const onEnd = () => {
    // vibrate the app
    vibrate();
    // clear up
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    // execute onTimerEnd func (to clear up parent state)
    onTimerEnd();
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown minutes={minutes} isPaused={!isStarted} onProgress={onProgress} onEnd={onEnd} />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.progressBarWrapper}>
        <ProgressBar progress={progress} color={colors.purple} style={styles.progressBar} />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={onChangeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarWrapper: {
    paddingTop: spacing.sm,
  },
  progressBar: {
    height: spacing.sm,
  },
});

