import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';
import { useStyles } from './ErrorScreen.styles';

const useViewModel = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  const handleTryAgain = () => {
    RNRestart.restart();
  };

  return {
    styles,
    t,
    handleTryAgain,
  };
};

export default useViewModel;
