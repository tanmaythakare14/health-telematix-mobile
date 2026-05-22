import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'components';

const CarePlan = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Text style={styles.title}>Care Plan</Text>
        </View>
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No care plans yet.</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  safe: { flex: 1 },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F8',
  },
  title: { fontSize: 20, fontWeight: '700', color: '#1A1A2E' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 14, color: '#94A3B8' },
});

export default CarePlan;
