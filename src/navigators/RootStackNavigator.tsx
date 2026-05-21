import React, { useEffect } from 'react';
import analytics from '@react-native-firebase/analytics';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { ErrorHandler } from 'components';
import useTypedSelector from 'hooks/useTypedSelector';
import BootSplash from 'react-native-bootsplash';
import { logger } from 'utils/SecureLogger';
import { navigationIntegration } from 'utils/SentryUtil';
import StorageService from 'utils/StorageService';
import AuthStackNavigator from './AuthStackNavigator';
import MainStackNavigator from './MainStackNavigator';

export const navigationRef = createNavigationContainerRef();

const RootStackNavigator = () => {
  const { accessToken } = useTypedSelector((state) => state.app);

  useEffect(() => {
    getLoginStatus();
  }, []);

  const getLoginStatus = async () => {
    try {
      const isLoggedIn = await StorageService.getItem(StorageService.storageKeys.isLoggedIn);
      logger.info('Retrieved login status from storage', { isLoggedIn });
    } catch (error) {
      logger.info('Error retrieving login status from storage', { error });
    }
  };

  return (
    <ErrorHandler>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          BootSplash.hide({ fade: true });
          navigationIntegration.registerNavigationContainer(navigationRef);
        }}
        onStateChange={async () => {
          await analytics().logScreenView({
            screen_name: navigationRef.current?.getCurrentRoute()?.name,
          });
        }}
      >
        {accessToken ? <MainStackNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
    </ErrorHandler>
  );
};
export default RootStackNavigator;
