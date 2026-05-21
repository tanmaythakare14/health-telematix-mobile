import { NavigationService } from 'navigators/NavigationService';
import { AUTH_STACK_NAVIGATOR } from 'navigators/routes';
import { useTranslation } from 'react-i18next';
import { useStyles } from './Account.styles';
import { ThemeOptions, useTheme } from '../../contexts/ThemeContext';
import StorageService from '../../utils/StorageService';

const useViewModel = () => {
  const styles = useStyles();
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const isDark = theme === ThemeOptions.dark;

  const handleChangeTheme = () => {
    setTheme(isDark ? ThemeOptions.light : ThemeOptions.dark);
  };

  const handleChangeLanguage = async (lang: string) => {
    await i18n.changeLanguage(lang);
    await StorageService.storeItem(StorageService.storageKeys.language, lang);
  };

  const handleLogout = () => {
    // Remove only authentication-related keys
    StorageService.removeItem(StorageService.storageKeys.isLoggedIn, true);
    StorageService.removeItem(StorageService.storageKeys.token, true);
    StorageService.removeItem(StorageService.storageKeys.refresh_token, true);
    // Navigate to Login (reset stack)
    NavigationService.reset(AUTH_STACK_NAVIGATOR.LOGIN_SCREEN);
  };

  return {
    styles,
    t,
    isDark,
    handleChangeTheme,
    handleChangeLanguage,
    handleLogout,
  };
};

export default useViewModel;
