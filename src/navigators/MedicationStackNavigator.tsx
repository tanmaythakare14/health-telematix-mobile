import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MedicationList, MedicationDetail, AddMedication } from 'screens';
import { MedicationStackParamList } from 'types/types';
import { MEDICATION_STACK_NAVIGATOR } from './routes';

const Stack = createNativeStackNavigator<MedicationStackParamList>();

const MedicationStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={MEDICATION_STACK_NAVIGATOR.MEDICATION_LIST}
        component={MedicationList}
      />
      <Stack.Screen
        name={MEDICATION_STACK_NAVIGATOR.MEDICATION_DETAIL}
        component={MedicationDetail}
      />
      <Stack.Screen
        name={MEDICATION_STACK_NAVIGATOR.ADD_MEDICATION}
        component={AddMedication}
      />
    </Stack.Navigator>
  );
};

export default MedicationStackNavigator;
