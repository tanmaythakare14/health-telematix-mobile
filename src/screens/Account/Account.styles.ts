import { StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export const useStyles = () => {
  const { themeColors } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    item: {
      margin: 16,
      padding: 16,
      borderRadius: 8,
    },
    itemText: {
      color: themeColors.text,
      fontSize: 18,
    },
    btnStyle: {
      marginTop: 16,
    },
  });
};
