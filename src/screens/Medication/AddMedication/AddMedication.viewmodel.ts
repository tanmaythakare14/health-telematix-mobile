import { useState, useCallback } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { MEDICATION_STACK_NAVIGATOR } from 'navigators/routes';
import {
  MedicationStackParamList,
  MedicationForm,
  MealTime,
  FrequencyOption,
} from 'types/types';
import { logger } from 'utils/SecureLogger';
import { useStyles } from './AddMedication.styles';

type NavigationProp = NativeStackNavigationProp<MedicationStackParamList, 'ADD_MEDICATION'>;
type RoutePropType = RouteProp<MedicationStackParamList, 'ADD_MEDICATION'>;

interface FormErrors {
  drugName?: string;
  dosage?: string;
  startDate?: string;
  endDate?: string;
}

const FORM_OPTIONS: MedicationForm[] = ['Tablet', 'Capsule', 'Syrup'];
const FREQUENCY_OPTIONS: FrequencyOption[] = [
  'Once daily',
  'Twice daily',
  'Three times daily',
  'Four times daily',
  'As needed',
];
const MEAL_TIME_OPTIONS: MealTime[] = ['Before Meal', 'After Meal', 'With Food'];

const DATE_REGEX = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

const useViewModel = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const styles = useStyles();
  const { t } = useTranslation();

  const editMedication = route.params?.medication;
  const isEditMode = !!editMedication;

  const [drugName, setDrugName] = useState(editMedication?.drugName ?? '');
  const [dosage, setDosage] = useState(editMedication?.dosage ?? '');
  const [pillsPerDose, setPillsPerDose] = useState(
    editMedication?.pillsPerDose?.toString() ?? '1',
  );
  const [selectedForm, setSelectedForm] = useState<MedicationForm>(
    editMedication?.form ?? 'Tablet',
  );
  const [selectedFrequency, setSelectedFrequency] = useState<FrequencyOption>(
    editMedication?.frequency ?? 'Once daily',
  );
  const [selectedMealTime, setSelectedMealTime] = useState<MealTime>(
    editMedication?.mealTime ?? 'After Meal',
  );
  const [startDate, setStartDate] = useState(editMedication?.startDate ?? '');
  const [endDate, setEndDate] = useState(editMedication?.endDate ?? '');
  const [clinicalInstruction, setClinicalInstruction] = useState(
    editMedication?.clinicalInstruction ?? '',
  );
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    if (!drugName.trim()) {
      newErrors.drugName = t('medication.form.error.drug_name');
    }
    if (!dosage.trim()) {
      newErrors.dosage = t('medication.form.error.dosage');
    }
    if (!startDate.trim()) {
      newErrors.startDate = t('medication.form.error.start_date');
    } else if (!DATE_REGEX.test(startDate)) {
      newErrors.startDate = t('medication.form.error.date_format');
    }
    if (!endDate.trim()) {
      newErrors.endDate = t('medication.form.error.end_date');
    } else if (!DATE_REGEX.test(endDate)) {
      newErrors.endDate = t('medication.form.error.date_format');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [drugName, dosage, startDate, endDate, t]);

  const onSubmit = useCallback(() => {
    if (!validate()) return;
    logger.info(isEditMode ? 'Medication updated' : 'Medication added', { drugName });
    navigation.navigate(MEDICATION_STACK_NAVIGATOR.MEDICATION_LIST);
  }, [validate, isEditMode, drugName, navigation]);

  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
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
  };
};

export default useViewModel;
