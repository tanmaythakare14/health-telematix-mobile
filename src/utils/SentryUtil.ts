import * as Sentry from '@sentry/react-native';
import { isEmptyOrNull } from './ValidationUtils';
export type Primitive = number | string | boolean | bigint | symbol | null | undefined;

export const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
  routeChangeTimeoutMs: 1_000, // default: 1_000
  ignoreEmptyBackNavigationTransactions: true, // default: true
  useDispatchedActionData: true, // default: false
});

export const initSentry = () => {
  Sentry.init({
    dsn: 'https://7f33f88111936bfff1107e93d57f7be4@o4504842140909568.ingest.us.sentry.io/4510420367572992',

    // Adds more context data to events (IP address, cookies, user, etc.)
    // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
    sendDefaultPii: true,

    // Enable Logs
    enableLogs: true,

    // Configure Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,
    integrations: [
      Sentry.mobileReplayIntegration(),
      Sentry.feedbackIntegration(),
      navigationIntegration,
      Sentry.reactNativeTracingIntegration({
        shouldCreateSpanForRequest: (url) => {
          return !isEmptyOrNull(url);
        },
      }),
    ],

    // uncomment the line below to enable Spotlight (https://spotlightjs.com)
    // spotlight: __DEV__,

    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
    attachScreenshot: true,

    enableAutoPerformanceTracing: true,

    beforeBreadcrumb(breadcrumb) {
      return breadcrumb.category === 'ui.click' ? null : breadcrumb;
    },
    attachViewHierarchy: true,
    enableUserInteractionTracing: true,
  });
};

// Set user context after login
export const setUserContext = (userId: string | number, email: string) => {
  Sentry.setUser({
    id: userId,
    email: email,
    username: email,
  });

  // Custom analytics event for login
  Sentry.addBreadcrumb({
    category: 'auth',
    message: 'User logged in',
    level: 'info',
  });
};

// Clear user context on logout
export const clearUserContext = () => {
  Sentry.setUser(null);

  Sentry.addBreadcrumb({
    category: 'auth',
    message: 'User logged out',
    level: 'info',
  });
};

// Analytics - Track custom events
export const trackEvent = (eventName: string, properties = {}) => {
  Sentry.addBreadcrumb({
    category: 'user-action',
    message: eventName,
    level: 'info',
    data: properties,
  });
};

// Log errors/issues manually
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logError = (error: any, context = {}) => {
  Sentry.captureException(error, {
    contexts: {
      custom: context,
    },
  });
};

// Log messages (non-error events)
export const logMessage = (message: string, context = {}) => {
  Sentry.captureMessage(message, {
    level: 'info', // 'fatal', 'error', 'warning', 'info', 'debug'
    contexts: {
      custom: context,
    },
  });
};

// Set custom tags
export const setTag = (key: string, value: Primitive) => {
  Sentry.setTag(key, value);
};

// Set custom context
export const setContext = (contextName: string, contextData = {}) => {
  Sentry.setContext(contextName, contextData);
};

export default Sentry;
