import { useCallback } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MEDICATION_STACK_NAVIGATOR } from 'navigators/routes';
import { MedicationStackParamList } from 'types/types';
import { logger } from 'utils/SecureLogger';
import { useStyles } from './MedicationDetail.styles';

type NavigationProp = NativeStackNavigationProp<MedicationStackParamList, 'MEDICATION_DETAIL'>;
type RoutePropType = RouteProp<MedicationStackParamList, 'MEDICATION_DETAIL'>;

const useViewModel = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const styles = useStyles();
  const { t } = useTranslation();

  const { medication } = route.params;

  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onEditPress = useCallback(() => {
    navigation.navigate(MEDICATION_STACK_NAVIGATOR.ADD_MEDICATION, { medication });
  }, [navigation, medication]);

  const onDeletePress = useCallback(() => {
    Alert.alert(
      t('medication.detail.delete.confirm'),
      t('medication.detail.delete.message'),
      [
        { text: t('medication.detail.delete.cancel'), style: 'cancel' },
        {
          text: t('medication.detail.delete'),
          style: 'destructive',
          onPress: () => {
            logger.info('Medication deleted', { id: medication.id });
            navigation.goBack();
          },
        },
      ],
    );
  }, [t, navigation, medication]);

  return {
    medication,
    onBackPress,
    onEditPress,
    onDeletePress,
    styles,
    t,
  };
};

export default useViewModel;
