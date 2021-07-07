import React from 'react';
import { StyleSheet, SafeAreaView, Text, FlatList } from 'react-native';

import { RoundedButton } from '../../components/RoundedButton';

import { fontSizes, spacing } from '../../utils/sizes';

const HistoryItem = ({ item, index }) => {
  return (
    <Text style={styles.historyItem(item.status)}>
      {item.subject}
    </Text>
  );
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
      {
          !!focusHistory.length && (
            <>
              <Text style={styles.title}>Things we've focused on:</Text>

              <FlatList
                style={styles.list}
                contentContainerStyle={styles.listContainerStyle}
                data={focusHistory}
                renderItem={HistoryItem}
              />
            </>
          )
        }
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 0.5,
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  listContainerStyle: {
    flex: 1,
    alignItems: 'center',
  },
  historyItem: (status) => ({
    color: status === 2 ? 'red' : 'green',
    fontSize: fontSizes.md,
  }),
  title: {
    color: 'white',
    fontSize: fontSizes.lg,
  },
});