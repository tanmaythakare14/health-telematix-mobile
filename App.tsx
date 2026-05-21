/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import analytics from '@react-native-firebase/analytics';
import { useBiometrics } from 'hooks/useBiometrics';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { logger } from 'utils/SecureLogger';
import { ThemeProvider } from './src/contexts/ThemeContext';
import LanguageProvider from './src/hocs/LanguageProvider';
import RootStackNavigator from './src/navigators/RootStackNavigator';
import store from './src/redux/app/store';
import 'react-native-get-random-values';
import Sentry, { initSentry } from './src/utils/SentryUtil';

// Initialize Sentry
initSentry();

function App() {
  useBiometrics();

  useEffect(() => {
    handleAnalytics();
  }, []);

  const handleAnalytics = async () => {
    try {
      const appInstanceId = await analytics().getAppInstanceId();
      await analytics().logEvent('app_open');
      logger.info('APP INSTANCE', { appInstanceId });
    } catch (error) {
      logger.error('Analytics error:', { error });
    }
  };

  try {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <LanguageProvider>
            <ThemeProvider>
              <RootStackNavigator />
              <Toast />
            </ThemeProvider>
          </LanguageProvider>
        </Provider>
      </SafeAreaProvider>
    );
  } catch (error) {
    Sentry.captureException(error);
  }
}

export default Sentry.wrap(App);
