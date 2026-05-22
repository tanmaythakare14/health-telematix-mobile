import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MedicationForm, MedicationStatus } from 'types/types';
import useViewModel from './MedicationDetail.viewmodel';

const FormBadge = ({
  form,
  styles,
}: {
  form: MedicationForm;
  styles: ReturnType<typeof import('./MedicationDetail.styles').useStyles>;
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

const InfoRow = ({
  label,
  children,
  isLast,
  styles,
}: {
  label: string;
  children: React.ReactNode;
  isLast?: boolean;
  styles: ReturnType<typeof import('./MedicationDetail.styles').useStyles>;
}) => (
  <View style={[styles.row, !isLast && styles.rowDivider]}>
    <Text style={styles.rowLabel}>{label}</Text>
    {children}
  </View>
);

const MedicationDetail = () => {
  const { medication, onBackPress, onEditPress, onDeletePress, styles, t } = useViewModel();

  const bannerStyle =
    medication.status === 'Active'
      ? styles.statusBannerActive
      : medication.status === 'Completed'
      ? styles.statusBannerCompleted
      : styles.statusBannerInactive;

  const pillStyle =
    medication.status === 'Active'
      ? styles.statusPillActive
      : medication.status === 'Completed'
      ? styles.statusPillCompleted
      : styles.statusPillInactive;

  const pillTextStyle =
    medication.status === 'Active'
      ? styles.statusPillTextActive
      : medication.status === 'Completed'
      ? styles.statusPillTextCompleted
      : styles.statusPillTextInactive;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onBackPress} style={styles.backButton} activeOpacity={0.7}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('medication.detail.title')}</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={onEditPress}
            style={[styles.actionBtn, styles.editBtn]}
            activeOpacity={0.7}>
            <Text style={styles.editBtnText}>{t('medication.detail.edit')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onDeletePress}
            style={[styles.actionBtn, styles.deleteBtn]}
            activeOpacity={0.7}>
            <Text style={styles.deleteBtnText}>{t('medication.detail.delete')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        <View style={[styles.statusBanner, bannerStyle]}>
          <View style={styles.statusBannerLeft}>
            <Text style={styles.statusBannerLabel}>{t('medication.detail.medicine_name')}</Text>
            <Text style={styles.statusBannerValue}>{medication.drugName}</Text>
          </View>
          <View style={[styles.statusPill, pillStyle]}>
            <Text style={[styles.statusPillText, pillTextStyle]}>{medication.status}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>Prescription Info</Text>

          <InfoRow label={t('medication.detail.form')} styles={styles}>
            <FormBadge form={medication.form} styles={styles} />
          </InfoRow>

          <InfoRow label={t('medication.detail.dosage')} styles={styles}>
            <Text style={styles.rowValue}>
              {medication.dosage}mg · {medication.pillsPerDose}{' '}
              {medication.pillsPerDose === 1 ? 'pill' : 'pills'}
            </Text>
          </InfoRow>

          <InfoRow label={t('medication.detail.frequency')} styles={styles}>
            <Text style={styles.rowValue}>{medication.frequency}</Text>
          </InfoRow>

          <InfoRow label={t('medication.detail.meal_time')} styles={styles} isLast>
            <Text style={styles.rowValue}>{medication.mealTime}</Text>
          </InfoRow>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>Schedule</Text>

          <InfoRow label={t('medication.detail.time_of_intake')} styles={styles}>
            <View style={styles.timeChipsRow}>
              {medication.timeOfIntake.map((time, idx) => (
                <View key={idx} style={styles.timeChip}>
                  <Text style={styles.timeChipText}>{time}</Text>
                </View>
              ))}
            </View>
          </InfoRow>

          <InfoRow label={t('medication.detail.start_date')} styles={styles}>
            <Text style={styles.rowValue}>{medication.startDate}</Text>
          </InfoRow>

          <InfoRow label={t('medication.detail.end_date')} styles={styles} isLast>
            <Text style={styles.rowValue}>{medication.endDate}</Text>
          </InfoRow>
        </View>

        {medication.clinicalInstruction ? (
          <View style={styles.card}>
            <Text style={styles.cardSectionTitle}>
              {t('medication.detail.clinical_instruction')}
            </Text>
            <InfoRow label="" styles={styles} isLast>
              <Text style={styles.clinicalText}>{medication.clinicalInstruction}</Text>
            </InfoRow>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MedicationDetail;
