import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { MEDICATION_STACK_NAVIGATOR } from 'navigators/routes';
import { MedicationStackParamList, Medication } from 'types/types';
import { useStyles } from './MedicationList.styles';

type NavigationProp = NativeStackNavigationProp<MedicationStackParamList, 'MEDICATION_LIST'>;

const MOCK_MEDICATIONS: Medication[] = [
  {
    id: '1',
    drugName: 'Metformin',
    dosage: '500',
    pillsPerDose: 2,
    frequency: 'Twice daily',
    form: 'Tablet',
    mealTime: 'After Meal',
    startDate: '01/05/2025',
    endDate: '31/07/2025',
    clinicalInstruction: 'Take with water. Avoid alcohol while on this medication.',
    status: 'Active',
    timeOfIntake: ['08:00 AM', '08:00 PM'],
  },
  {
    id: '2',
    drugName: 'Amlodipine',
    dosage: '5',
    pillsPerDose: 1,
    frequency: 'Once daily',
    form: 'Tablet',
    mealTime: 'Before Meal',
    startDate: '15/04/2025',
    endDate: '15/10/2025',
    clinicalInstruction: 'Take at the same time each day.',
    status: 'Active',
    timeOfIntake: ['09:00 AM'],
  },
  {
    id: '3',
    drugName: 'Vitamin D3',
    dosage: '1000',
    pillsPerDose: 1,
    frequency: 'Once daily',
    form: 'Capsule',
    mealTime: 'With Food',
    startDate: '01/01/2025',
    endDate: '31/12/2025',
    status: 'Active',
    timeOfIntake: ['08:00 AM'],
  },
  {
    id: '4',
    drugName: 'Amoxicillin',
    dosage: '250',
    pillsPerDose: 1,
    frequency: 'Three times daily',
    form: 'Capsule',
    mealTime: 'After Meal',
    startDate: '01/03/2025',
    endDate: '10/03/2025',
    clinicalInstruction: 'Complete the full course even if you feel better.',
    status: 'Completed',
    timeOfIntake: ['08:00 AM', '02:00 PM', '08:00 PM'],
  },
  {
    id: '5',
    drugName: 'Paracetamol Syrup',
    dosage: '10',
    pillsPerDose: 1,
    frequency: 'Twice daily',
    form: 'Syrup',
    mealTime: 'After Meal',
    startDate: '10/02/2025',
    endDate: '20/02/2025',
    clinicalInstruction: 'Shake well before use.',
    status: 'Completed',
    timeOfIntake: ['08:00 AM', '06:00 PM'],
  },
];

type TabOption = 'current' | 'past';

const useViewModel = () => {
  const [activeTab, setActiveTab] = useState<TabOption>('current');
  const [medications] = useState<Medication[]>(MOCK_MEDICATIONS);

  const navigation = useNavigation<NavigationProp>();
  const styles = useStyles();
  const { t } = useTranslation();

  const currentMedications = medications.filter(m => m.status === 'Active');
  const pastMedications = medications.filter(m => m.status !== 'Active');

  const displayedMedications = activeTab === 'current' ? currentMedications : pastMedications;

  const onTabChange = useCallback((tab: TabOption) => {
    setActiveTab(tab);
  }, []);

  const onCardPress = useCallback(
    (medication: Medication) => {
      navigation.navigate(MEDICATION_STACK_NAVIGATOR.MEDICATION_DETAIL, { medication });
    },
    [navigation],
  );

  const onAddPress = useCallback(() => {
    navigation.navigate(MEDICATION_STACK_NAVIGATOR.ADD_MEDICATION, {});
  }, [navigation]);

  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    activeTab,
    displayedMedications,
    onTabChange,
    onCardPress,
    onAddPress,
    onBackPress,
    styles,
    t,
  };
};

export default useViewModel;
