import { useCallback, useEffect, useRef } from 'react';
import { Alert, AppState, AppStateStatus } from 'react-native';
import {
  createKeys,
  getAllKeys,
  isSensorAvailable,
  setDebugMode,
  simplePrompt,
} from '@sbaiahmed1/react-native-biometrics';
import { logger } from 'utils/SecureLogger';

export const useBiometrics = () => {
  const appState = useRef(AppState.currentState);
  const isAuthenticated = useRef(false);
  const isInitialized = useRef(false);
  const keysCreated = useRef(false);
  const isAuthenticating = useRef(false);
  const coldStartAuthCompleted = useRef(false); // Track if cold start auth completed (success or failure)
  const wasInBackground = useRef(false); // Track if app truly went to background (iOS)
  const keyAlias = 'biometric_key';
  const requireAuthOnColdStart = true;

  useEffect(() => {
    if (__DEV__) {
      setDebugMode(true);
    }

    initialize();

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
      if (__DEV__) {
        setDebugMode(false);
      }
    };
  }, []);

  const initialize = async () => {
    if (isInitialized.current) return;

    try {
      const sensorInfo = await isSensorAvailable();

      if (!sensorInfo.available) {
        isInitialized.current = true;
        coldStartAuthCompleted.current = true; // Mark as completed even if not available
        return;
      }

      // Check and create keys
      await ensureKeysExist();

      isInitialized.current = true;

      // Trigger authentication on cold start
      if (requireAuthOnColdStart) {
        await authenticate(true); // Pass true to indicate this is cold start auth
      }
    } catch (error) {
      logger.error('💥 Initialization error:', { error });
      isInitialized.current = true;
      coldStartAuthCompleted.current = true;
    }
  };

  const ensureKeysExist = async () => {
    if (keysCreated.current) {
      return true;
    }

    try {
      // Check if keys exist
      const allKeys = await getAllKeys(keyAlias);

      if (allKeys.keys && allKeys.keys.length > 0) {
        keysCreated.current = true;
        return true;
      }

      // No keys found, create new ones
      await createKeys(keyAlias);

      keysCreated.current = true;
      return true;
    } catch (error) {
      logger.error('💥 Error checking/creating keys:', { error });

      // If getAllKeys failed, try creating keys anyway
      try {
        await createKeys(keyAlias);
        keysCreated.current = true;
        return true;
      } catch (createError) {
        logger.error('💥 Failed to create keys:', { createError });
        return false;
      }
    }
  };

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    // Detect when app goes to background
    if (nextAppState === 'background') {
      logger.info('🔒 App went to background');
      isAuthenticated.current = false;
      wasInBackground.current = true;
    }

    // Detect when app comes to foreground from background
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      logger.info('📱 App came to foreground');

      // Authenticate if:
      // 1. App was in true background (prevents loop on iOS transient states)
      // 2. Not currently authenticated
      // 3. Not currently authenticating
      // 4. Cold start auth has been completed (prevents prompt during cold start)
      if (wasInBackground.current) {
        logger.info('🔐 App was in background, checking if auth needed');
        wasInBackground.current = false; // Reset background flag

        if (!isAuthenticated.current && !isAuthenticating.current && coldStartAuthCompleted.current) {
          logger.info('🔐 Triggering authentication after background resume');
          await authenticate(false); // Pass false to indicate this is NOT cold start
        }
      } else {
        logger.info(
          `⏭️ Skipping auth - was not in true background or already handled. Authenticated: ${isAuthenticated.current}, Authenticating: ${isAuthenticating.current}`,
        );
      }
    }

    appState.current = nextAppState;
  };

  const authenticate = useCallback(async (isColdStart = false) => {
    // Prevent multiple simultaneous authentication prompts
    if (isAuthenticating.current) {
      return false;
    }

    isAuthenticating.current = true;

    try {
      const sensorInfo = await isSensorAvailable();

      if (!sensorInfo.available) {
        logger.error('❌ Biometric not available:', { error: sensorInfo.error });
        isAuthenticating.current = false;
        if (isColdStart) {
          coldStartAuthCompleted.current = true; // Mark cold start as completed
        }
        return false;
      }

      // Only check/create keys if not done yet
      if (!keysCreated.current) {
        const keysReady = await ensureKeysExist();

        if (!keysReady) {
          logger.error('❌ Failed to prepare biometric keys');
          isAuthenticating.current = false;
          if (isColdStart) {
            coldStartAuthCompleted.current = true; // Mark cold start as completed
          }
          return false;
        }
      }

      // Perform authentication
      const success = await simplePrompt('Please authenticate to continue');

      if (success) {
        logger.info('✅ Authentication successful');
        isAuthenticated.current = true;
        isAuthenticating.current = false;
        if (isColdStart) {
          coldStartAuthCompleted.current = true; // Mark cold start as completed
        }
        return true;
      } else {
        logger.info('❌ Authentication failed or cancelled');
        Alert.alert('Authentication Failed', 'Unable to authenticate. Please try again.');
        isAuthenticated.current = false;
        isAuthenticating.current = false;
        if (isColdStart) {
          coldStartAuthCompleted.current = true; // Mark cold start as completed (don't retry)
        }
        return false;
      }
    } catch (error) {
      logger.error('💥 Authentication error:', { error });
      Alert.alert('Authentication Error', 'An error occurred during authentication. Please try again.');
      isAuthenticated.current = false;
      isAuthenticating.current = false;
      if (isColdStart) {
        coldStartAuthCompleted.current = true; // Mark cold start as completed
      }
      return false;
    }
  }, []);

  const checkBiometricAvailability = useCallback(async () => {
    try {
      const sensorInfo = await isSensorAvailable();
      return {
        available: sensorInfo.available,
        biometryType: sensorInfo.biometryType,
        error: sensorInfo.error,
        errorCode: sensorInfo.errorCode,
      };
    } catch (error) {
      return {
        available: false,
        error: error,
      };
    }
  }, []);

  const resetAuthentication = useCallback(() => {
    isAuthenticated.current = false;
    coldStartAuthCompleted.current = false;
  }, []);

  const logout = useCallback(() => {
    isAuthenticated.current = false;
    coldStartAuthCompleted.current = false;
    isAuthenticating.current = false;
  }, []);

  return {
    authenticate,
    checkBiometricAvailability,
    resetAuthentication,
    logout,
    isAuthenticated: isAuthenticated.current,
  };
};

// ## Flow Scenarios:

// ### Scenario 1: Cold Start → User Cancels → Stays in App
// ```
// 1. Cold start → authenticate(true)
// 2. User cancels → coldStartAuthCompleted = true
// 3. User stays in app → No more prompts ✅
// 4. App goes to background
// 5. App comes to foreground → authenticate(false) called ✅
// ```

// ### Scenario 2: Cold Start → User Success → Goes to Background
// ```
// 1. Cold start → authenticate(true)
// 2. User authenticates → coldStartAuthCompleted = true, isAuthenticated = true
// 3. App goes to background → isAuthenticated = false
// 4. App comes to foreground → authenticate(false) called ✅
// ```

// ### Scenario 3: Cold Start → Biometric Not Available
// ```
// 1. Cold start → authenticate(true)
// 2. Biometric not available → coldStartAuthCompleted = true
// 3. User stays in app → No prompts ✅
// 4. App goes to background
// 5. App comes to foreground → authenticate(false) called (will fail again) ✅
