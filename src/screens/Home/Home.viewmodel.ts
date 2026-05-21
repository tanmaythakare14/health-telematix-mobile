import { useTranslation } from 'react-i18next';
import { useStyles } from './Home.styles';
import { ThemeOptions, useTheme } from '../../contexts/ThemeContext';

const useViewModel = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const isEnabled = ThemeOptions.dark === theme;

  const toggleSwitch = (newState: boolean) => {
    setTheme(newState ? ThemeOptions.dark : ThemeOptions.light);
  };

  return {
    styles,
    t,
    isEnabled,
    toggleSwitch,
  };
};

export default useViewModel;
