import { StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { M_12, M_14, M_15, M_20, M_22, M_50, V_18, V_20, V_50 } from '../../utils/SizeUtility';

export const useStyles = () => {
  const { themeColors } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.headerBackground,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: M_15,
    },
    safeView: {
      flex: 1,
    },
    errorIcon: {
      fontSize: M_50,
      marginBottom: V_20,
      color: themeColors.error,
    },
    title: {
      fontSize: M_22,
      fontWeight: 'bold',
      color: themeColors.text,
      textAlign: 'center',
      marginBottom: V_20,
    },
    message: {
      fontSize: M_14,
      color: themeColors.text,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: V_50,
      paddingHorizontal: M_12,
    },
    button: {
      backgroundColor: themeColors.primary[50],
      paddingVertical: V_18,
      borderRadius: M_20,
      alignItems: 'center',
      justifyContent: 'center',
      width: '80%',
    },
    buttonText: {
      color: themeColors.text,
      fontSize: M_14,
      fontWeight: 'bold',
    },
  });
};
