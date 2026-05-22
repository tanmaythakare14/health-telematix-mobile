import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Medication, MedicationForm, MedicationStatus } from 'types/types';
import useViewModel from './MedicationList.viewmodel';

const FormBadge = ({
  form,
  styles,
}: {
  form: MedicationForm;
  styles: ReturnType<typeof import('./MedicationList.styles').useStyles>;
}) => {
  const badgeStyle =
    form === 'Tablet'
      ? styles.formBadgeTablet
      : form === 'Capsule'
      ? styles.formBadgeCapsule
      : styles.formBadgeSyrup;
  const textStyle =
    form === 'Tablet'
      ? styles.formBadgeTextTablet
      : form === 'Capsule'
      ? styles.formBadgeTextCapsule
      : styles.formBadgeTextSyrup;

  return (
    <View style={[styles.formBadge, badgeStyle]}>
      <Text style={[styles.formBadgeText, textStyle]}>{form}</Text>
    </View>
  );
};

const StatusBadge = ({
  status,
  styles,
}: {
  status: MedicationStatus;
  styles: ReturnType<typeof import('./MedicationList.styles').useStyles>;
}) => {
  const badgeStyle =
    status === 'Active'
      ? styles.statusActive
      : status === 'Completed'
      ? styles.statusCompleted
      : styles.statusInactive;
  const textStyle =
    status === 'Active'
      ? styles.statusTextActive
      : status === 'Completed'
      ? styles.statusTextCompleted
      : styles.statusTextInactive;

  return (
    <View style={[styles.statusBadge, badgeStyle]}>
      <Text style={[styles.statusText, textStyle]}>{status}</Text>
    </View>
  );
};

const MedicationCard = ({
  item,
  onPress,
  isPast,
  styles,
}: {
  item: Medication;
  onPress: (med: Medication) => void;
  isPast: boolean;
  styles: ReturnType<typeof import('./MedicationList.styles').useStyles>;
}) => (
  <TouchableOpacity activeOpacity={0.7} onPress={() => onPress(item)} style={styles.card}>
    <View style={[styles.cardAccent, isPast && styles.cardAccentPast]} />
    <View style={styles.cardBody}>
      <View style={styles.cardTopRow}>
        <View style={styles.cardNameRow}>
          <Text style={styles.drugName} numberOfLines={1}>
            {item.drugName}
          </Text>
          <FormBadge form={item.form} styles={styles} />
        </View>
        <StatusBadge status={item.status} styles={styles} />
      </View>
      <View style={styles.cardMeta}>
        <Text style={styles.cardMetaLabel}>Dosage </Text>
        <Text style={styles.cardMetaValue}>
          {item.dosage}mg · {item.pillsPerDose} {item.pillsPerDose === 1 ? 'pill' : 'pills'}
        </Text>
        <View style={styles.cardDot} />
        <Text style={styles.cardMetaValue}>{item.mealTime}</Text>
      </View>
      <View style={styles.cardMeta}>
        <Text style={styles.cardMetaLabel}>Frequency </Text>
        <Text style={styles.cardMetaValue}>{item.frequency}</Text>
      </View>
    </View>
    <View style={styles.cardArrow}>
      <Text style={styles.cardArrowText}>›</Text>
    </View>
  </TouchableOpacity>
);

const MedicationList = () => {
  const { activeTab, displayedMedications, onTabChange, onCardPress, onAddPress, styles, t } =
    useViewModel();

  const isPast = activeTab === 'past';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('medication.title')}</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={onAddPress} style={styles.addButton}>
          <Text style={styles.addIcon}>+</Text>
          <Text style={styles.addButtonText}>{t('medication.add.button')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'current' && styles.tabActive]}
          onPress={() => onTabChange('current')}
          activeOpacity={0.7}>
          <Text style={[styles.tabText, activeTab === 'current' && styles.tabTextActive]}>
            {t('medication.tab.current')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.tabActive]}
          onPress={() => onTabChange('past')}
          activeOpacity={0.7}>
          <Text style={[styles.tabText, activeTab === 'past' && styles.tabTextActive]}>
            {t('medication.tab.past')}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={displayedMedications}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MedicationCard
            item={item}
            onPress={onCardPress}
            isPast={isPast}
            styles={styles}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>💊</Text>
            <Text style={styles.emptyTitle}>
              {isPast ? t('medication.empty.past') : t('medication.empty.current')}
            </Text>
            <Text style={styles.emptySubtitle}>
              {isPast ? t('medication.empty.past.sub') : t('medication.empty.current.sub')}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default MedicationList;
