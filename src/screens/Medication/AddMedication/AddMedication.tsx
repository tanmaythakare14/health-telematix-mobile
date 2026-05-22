import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useViewModel from './AddMedication.viewmodel';

const AddMedication = () => {
  const {
    isEditMode,
    drugName,
    setDrugName,
    dosage,
    setDosage,
    pillsPerDose,
    setPillsPerDose,
    selectedForm,
    setSelectedForm,
    selectedFrequency,
    setSelectedFrequency,
    selectedMealTime,
    setSelectedMealTime,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    clinicalInstruction,
    setClinicalInstruction,
    errors,
    setErrors,
    FORM_OPTIONS,
    FREQUENCY_OPTIONS,
    MEAL_TIME_OPTIONS,
    onSubmit,
    onBackPress,
    styles,
    t,
  } = useViewModel();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEditMode ? t('medication.edit.title') : t('medication.add.title')}
        </Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">

          <View style={styles.card}>
            <Text style={styles.cardSectionTitle}>Drug Details</Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t('medication.form.drug_name')}</Text>
              <TextInput
                style={[styles.textInput, errors.drugName && styles.textInputError]}
                placeholder={t('medication.form.drug_name.placeholder')}
                placeholderTextColor="#CBD5E1"
                value={drugName}
                onChangeText={text => {
                  setDrugName(text);
                  if (errors.drugName) setErrors(e => ({ ...e, drugName: undefined }));
                }}
                autoCapitalize="words"
              />
              {errors.drugName ? (
                <Text style={styles.errorText}>{errors.drugName}</Text>
              ) : null}
            </View>

            <View style={styles.dosageRow}>
              <View style={[styles.fieldGroup, styles.dosageField]}>
                <Text style={styles.fieldLabel}>{t('medication.form.dosage')}</Text>
                <TextInput
                  style={[styles.textInput, errors.dosage && styles.textInputError]}
                  placeholder={t('medication.form.dosage.placeholder')}
                  placeholderTextColor="#CBD5E1"
                  value={dosage}
                  onChangeText={text => {
                    setDosage(text);
                    if (errors.dosage) setErrors(e => ({ ...e, dosage: undefined }));
                  }}
                  keyboardType="numeric"
                />
                {errors.dosage ? (
                  <Text style={styles.errorText}>{errors.dosage}</Text>
                ) : null}
              </View>

              <View style={[styles.fieldGroup, styles.pillsField]}>
                <Text style={styles.fieldLabel}>{t('medication.form.pills')}</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="1"
                  placeholderTextColor="#CBD5E1"
                  value={pillsPerDose}
                  onChangeText={setPillsPerDose}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t('medication.form.form_type')}</Text>
              <View style={styles.chipsRow}>
                {FORM_OPTIONS.map(form => (
                  <TouchableOpacity
                    key={form}
                    activeOpacity={0.7}
                    onPress={() => setSelectedForm(form)}
                    style={[styles.chip, selectedForm === form && styles.chipActive]}>
                    <Text
                      style={[
                        styles.chipText,
                        selectedForm === form && styles.chipTextActive,
                      ]}>
                      {form}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardSectionTitle}>Schedule</Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t('medication.form.frequency')}</Text>
              <View style={styles.chipsRow}>
                {FREQUENCY_OPTIONS.map(freq => (
                  <TouchableOpacity
                    key={freq}
                    activeOpacity={0.7}
                    onPress={() => setSelectedFrequency(freq)}
                    style={[styles.chip, selectedFrequency === freq && styles.chipActive]}>
                    <Text
                      style={[
                        styles.chipText,
                        selectedFrequency === freq && styles.chipTextActive,
                      ]}>
                      {freq}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t('medication.form.meal_time')}</Text>
              <View style={styles.mealRow}>
                {MEAL_TIME_OPTIONS.map(option => (
                  <TouchableOpacity
                    key={option}
                    activeOpacity={0.7}
                    onPress={() => setSelectedMealTime(option)}
                    style={[
                      styles.mealOption,
                      selectedMealTime === option && styles.mealOptionActive,
                    ]}>
                    <Text
                      style={[
                        styles.mealOptionText,
                        selectedMealTime === option && styles.mealOptionTextActive,
                      ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.dosageRow}>
              <View style={[styles.fieldGroup, styles.dosageField]}>
                <Text style={styles.fieldLabel}>{t('medication.form.start_date')}</Text>
                <TextInput
                  style={[styles.textInput, errors.startDate && styles.textInputError]}
                  placeholder={t('medication.form.start_date.placeholder')}
                  placeholderTextColor="#CBD5E1"
                  value={startDate}
                  onChangeText={text => {
                    setStartDate(text);
                    if (errors.startDate) setErrors(e => ({ ...e, startDate: undefined }));
                  }}
                  keyboardType="numeric"
                />
                {errors.startDate ? (
                  <Text style={styles.errorText}>{errors.startDate}</Text>
                ) : null}
              </View>

              <View style={[styles.fieldGroup, styles.pillsField]}>
                <Text style={styles.fieldLabel}>{t('medication.form.end_date')}</Text>
                <TextInput
                  style={[styles.textInput, errors.endDate && styles.textInputError]}
                  placeholder={t('medication.form.end_date.placeholder')}
                  placeholderTextColor="#CBD5E1"
                  value={endDate}
                  onChangeText={text => {
                    setEndDate(text);
                    if (errors.endDate) setErrors(e => ({ ...e, endDate: undefined }));
                  }}
                  keyboardType="numeric"
                />
                {errors.endDate ? (
                  <Text style={styles.errorText}>{errors.endDate}</Text>
                ) : null}
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardSectionTitle}>Notes</Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t('medication.form.clinical_instruction')}</Text>
              <TextInput
                style={[styles.textInput, styles.textInputMultiline]}
                placeholder={t('medication.form.clinical_instruction.placeholder')}
                placeholderTextColor="#CBD5E1"
                value={clinicalInstruction}
                onChangeText={setClinicalInstruction}
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onSubmit}
            style={styles.submitButton}>
            <Text style={styles.submitButtonText}>
              {isEditMode ? t('medication.form.submit.save') : t('medication.form.submit.add')}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddMedication;
