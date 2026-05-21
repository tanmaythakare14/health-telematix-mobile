//mock dependencies
jest.mock('@sentry/react-native', () => ({
  init: jest.fn(),
  captureException: jest.fn(),
  captureMessage: jest.fn(),
  setUser: jest.fn(),
  setTag: jest.fn(),
  setContext: jest.fn(),
  addBreadcrumb: jest.fn(),
  reactNavigationIntegration: jest.fn(() => ({})),
  mobileReplayIntegration: jest.fn(() => ({})),
  feedbackIntegration: jest.fn(() => ({})),
  reactNativeTracingIntegration: jest.fn(() => ({})),
  useProfiler: jest.fn(),
  startSpan: jest.fn((_, callback) => callback()),
  wrap: jest.fn((component) => component),
  getCurrentHub: jest.fn(() => ({
    getClient: jest.fn(),
    getScope: jest.fn(),
  })),
}));

jest.mock('@react-native-firebase/analytics', () => () => ({
  logEvent: jest.fn(),
  setAnalyticsCollectionEnabled: jest.fn(),
  getAppInstanceId: jest.fn(() => Promise.resolve('mock-app-instance-id')),
}));

jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn(),
  show: jest.fn(),
}));

jest.mock('react-native-nitro-modules', () => {
  return {
    NitroModules: () => {
      return {};
    },
  };
});

// Mock @sbaiahmed1/react-native-biometrics
jest.mock('@sbaiahmed1/react-native-biometrics', () => ({
  isSensorAvailable: jest.fn(() => Promise.resolve({ available: false })),
  simplePrompt: jest.fn(() => Promise.resolve(false)),
  createKeys: jest.fn(() => Promise.resolve({ publicKey: 'mock-public-key' })),
  getAllKeys: jest.fn(() => Promise.resolve({ keys: [] })),
  setDebugMode: jest.fn(),
}));

// Mock @react-navigation/native
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  createNavigationContainerRef: jest.fn(() => ({
    current: {
      getCurrentRoute: jest.fn(() => ({ name: 'MockScreen' })),
      navigate: jest.fn(),
      goBack: jest.fn(),
      reset: jest.fn(),
      dispatch: jest.fn(),
      isFocused: jest.fn(() => true),
      addListener: jest.fn(() => jest.fn()),
    },
  })),
  NavigationContainer: ({ children }: { children: React.ReactNode }) => children,
}));

// Prevent loading the real SecureLogger which can trigger storage initialization
// and cause recursion during tests. Provide a no-op logger instead.
jest.mock('../../src/utils/SecureLogger', () => ({
  __esModule: true,
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    writeLog: jest.fn(),
    storeLogEntry: jest.fn(),
    storeItem: jest.fn(),
  },
  initializeLogger: jest.fn(),
  LOG_LEVELS: {
    ERROR: 'ERROR',
    WARN: 'WARN',
    INFO: 'INFO',
    DEBUG: 'DEBUG',
  },
}));

// Note: `useNavigation` is already mocked above. Don't redefine it here.

jest.mock('react-i18next', () => ({
  __esModule: true,
  // Provide initReactI18next so modules that call `i18n.use(initReactI18next)` don't fail
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
  useTranslation: () => ({
    t: (key: string) => key, // Return the key itself
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

// Mock dependencies
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('hooks/useTypedSelector', () => jest.fn());
