# CLAUDE.md — React Native Boilerplate (designer-claude-react-native-demo)

This file provides Claude Code with full context about the project's source code, directory structure, architecture, theme, conventions, and coding standards.
Always read this file before making any code changes.

---

## Project Overview

A production-ready **React Native 0.84.1 + TypeScript** boilerplate targeting iOS and Android, built by Mindbowser.
It ships with authentication, navigation, Redux state management, secure storage, structured logging, Sentry monitoring, i18n, multi-environment builds, and a light/dark theme system.

---

## State Management Protocol

The project uses **Redux Toolkit (RTK)** for global state.

### 1. Store Configuration (`src/redux/app/store.ts`)
- All slices must be registered here.
- Always export `ReduxStateType` and `AppDispatch` types for typing hooks.

### 2. State Access Hooks
- **Selector**: Always use `useTypedSelector` (from `hooks/useTypedSelector`) for full state typing.
- **Dispatch**: Typed as `AppDispatch`.

### 3. Creating Slices
- Use `yarn generateReduxSlice` to scaffold.
- Actions should follow the naming convention: `[sliceName]/[actionName]`.
- Always include an `initialState` interface.

---

---

## Tech Stack

| Layer | Library |
|---|---|
| UI Framework | React Native 0.84.1, React 19.2.3 |
| Language | TypeScript 5.8.3 |
| Navigation | React Navigation 7 (native-stack + bottom-tabs) |
| State | Redux Toolkit 2, react-redux 9 |
| HTTP | Axios 1.14 (singleton `HTTPService`) |
| Storage | react-native-mmkv 4 + react-native-keychain 10 (singleton `StorageService`) |
| Logging | Custom `SecureLogger` singleton (PHI-compliant) |
| Monitoring | Sentry (`@sentry/react-native`) |
| i18n | i18next + react-i18next |
| Validation | Yup + custom `ValidationSchemas` |
| Env Config | react-native-config (multi-env `.env.*` files) |
| Notifications | @notifee/react-native |
| Analytics | @react-native-firebase/analytics |
| Crash | @react-native-firebase/crashlytics |
| Biometrics | @sbaiahmed1/react-native-biometrics |
| Lists | @shopify/flash-list |
| Testing | Jest 30 + @testing-library/react-native |
| Linting | ESLint 9 + Prettier 3 |
| Git hooks | Husky + lint-staged + commitlint (conventional commits) |

---

## Utilities Reference

### Sentry Integration (`src/utils/SentryUtil.ts`)
```typescript
import Sentry, { initSentry, setUserContext, trackEvent, logError } from 'utils/SentryUtil';

// Initialize in App.tsx
initSentry();

// Track user actions
trackEvent('Login Attempt', { username });

// Set user context after login
setUserContext(userId, email);

// Log errors with context
logError(error, { screen: 'Login', action: 'handleLogin' });

// Performance spans
await Sentry.startSpan({ name: 'API Call', op: 'http.request' }, async () => {
  // API logic here
});
```

### Validation System (`src/utils/ValidationSchemas.ts`)
```typescript
import { loginSchema, validateData, validateField } from 'utils/ValidationSchemas';

// Full form validation
const result = await validateData({ email, password }, loginSchema);
if (!result.isValid) {
  // result.errors.email, result.errors.password
}

// Single field validation (for blur events)
const fieldResult = await validateField('email', value, loginSchema);
if (!fieldResult.isValid) {
  // fieldResult.error
}

// Available schemas: loginSchema, simpleLoginSchema, strictLoginSchema, 
// forgotPasswordSchema, changePasswordSchema
```

### Responsive Design (`src/utils/Dimensions.ts`)
```typescript
import { moderateScale, verticalScale, normalize, screenWidth, screenHeight } from 'utils/Dimensions';

// Use these helpers instead of raw pixels
const styles = StyleSheet.create({
  container: {
    padding: moderateScale(16),        // General scaling
    height: verticalScale(100),         // Vertical scaling
    fontSize: normalize(14),            // Font scaling
    width: screenWidth * 0.9,          // Responsive width
  }
});
```

### Size Constants (`src/utils/SizeUtility.ts`)
```typescript
import { N_8, N_12, N_16, M_8, M_16, V_10, V_40 } from 'utils/SizeUtility';

// N_* (Normalize): fonts, padding, border radius
// M_* (Moderate): square elements, proportional sizes  
// V_* (Vertical): margins, spacer heights

const styles = StyleSheet.create({
  button: {
    paddingVertical: V_10,
    paddingHorizontal: M_16,
    borderRadius: N_8,
    fontSize: N_16,
  }
});
```

### Typography (`src/utils/Typography.ts`)
```typescript
import { getTypographyStyle, TypographyStyleEnum } from 'utils/Typography';

// Apply consistent text styles
<Text style={getTypographyStyle(TypographyStyleEnum.HEADER)}>Title</Text>
<Text style={getTypographyStyle(TypographyStyleEnum.BODY)}>Content</Text>
<Text style={getTypographyStyle(TypographyStyleEnum.CAPTION)}>Caption</Text>
```

### Constants (`src/utils/Constants.ts`)
```typescript
import { ERROR_CODES, TOAST_TYPE } from 'utils/Constants';

// Error codes for HTTP handling
if (error.response?.status === ERROR_CODES.UNAUTHORIZED) {
  // Handle 401
}

// Toast types
Toast.show({
  type: TOAST_TYPE.ERROR,
  text1: 'Error message',
});
```

---

## Directory Structure

```
/
├── .claude/CLAUDE.md          ← This file
├── .env                       ← Default env (development)
├── .env.development
├── .env.production
├── .env.qa
├── .env.staging
├── .env.uat
├── App.tsx                    ← Root component (initialises logger, store, navigation)
├── index.js                   ← App entry point
├── babel.config.js            ← Module resolver aliases
├── jest.config.ts
├── eslint.config.cjs
├── tsconfig.json
├── scripts/                   ← Code-generation scripts
│   ├── generateMVCScreen.ts
│   ├── generateReduxSlice.ts
│   └── generateRNComponent.ts
└── src/
    ├── assets/                ← Images, fonts, SVGs
    ├── components/            ← Shared reusable components
    │   ├── ErrorHandler.tsx
    │   ├── Flatlist.tsx
    │   ├── Header.tsx
    │   ├── Image.tsx
    │   ├── ReusableButton.tsx
    │   ├── Text.tsx
    │   ├── TextInput.tsx
    │   └── index.ts           ← Barrel export
    ├── contexts/              ← React Context providers
    ├── hocs/                  ← Higher-order components
    ├── hooks/
    │   ├── useBiometrics.ts
    │   └── useTypedSelector.ts
    ├── language/              ← i18n translation JSON files
    ├── navigators/
    │   ├── routes.ts          ← Route enums
    │   ├── AuthStackNavigator.tsx
    │   ├── HomeTabNavigator.tsx
    │   ├── MainStackNavigator.tsx
    │   ├── RootStackNavigator.tsx
    │   └── NavigationService.ts
    ├── networkConfig/
    │   ├── Endpoints.ts       ← API endpoint constants
    │   └── HttpServices.ts    ← Axios singleton with interceptors
    ├── redux/
    │   ├── app/store.ts       ← Redux store configuration
    │   ├── constants/         ← Redux action type constants
    │   └── reducer/
    │       ├── AppSlice/
    │       ├── CounterSlice/
    │       ├── DashboardSlice/
    │       ├── UserSlice/
    │       └── profile/
    ├── screens/
    │   ├── AuthScreens/
    │   │   └── Login/
    │   │       ├── Login.tsx            ← View
    │   │       ├── Login.viewmodel.ts   ← ViewModel (hook)
    │   │       └── Login.styles.ts      ← Styles hook
    │   ├── Home/
    │   ├── DetailScreen/
    │   ├── Account/
    │   ├── ErrorScreen/
    │   └── index.ts
    ├── theme/
    │   └── colors.ts          ← Dark & light colour palettes
    ├── types/
    │   └── types.ts           ← Shared TypeScript types/interfaces
    └── utils/
        ├── Constants.ts       ← ERROR_CODES, TOAST_TYPE
        ├── Dimensions.ts      ← Screen dimensions, isIos helper
        ├── FontUtils.ts
        ├── ImageConstants.ts
        ├── SecureLogger.ts    ← Singleton logger
        ├── SentryUtil.ts      ← Sentry helpers
        ├── SizeUtility.ts
        ├── StorageService.ts  ← Singleton MMKV + Keychain storage
        ├── Typography.ts
        ├── ValidationSchemas.ts
        └── ValidationUtils.ts
```

---

## Architecture Pattern — MVC per Screen

Every screen follows a strict **three-file MVC pattern** inside its own folder:

```
screens/<Stack>/<ScreenName>/
  <ScreenName>.tsx            ← View  (pure JSX, no logic)
  <ScreenName>.viewmodel.ts   ← ViewModel hook (all state + handlers)
  <ScreenName>.styles.ts      ← Styles hook (theme-aware StyleSheet)
```

### Rules
- **View** (`<ScreenName>.tsx`): Imports `useViewModel` from `.viewmodel.ts` and destructures everything it needs. Contains **only** JSX.
- **ViewModel** (`<ScreenName>.viewmodel.ts`): A custom hook (`useViewModel`). Owns state, side-effects, navigation, validation, API calls, Sentry spans and Redux dispatch.
- **Styles** (`<ScreenName>.styles.ts`): A custom hook (`useStyles`) that reads the current theme and returns a memoised `StyleSheet`. Import it inside the ViewModel and expose `styles`.

### Detailed Scaffold Guide

Always use the built-in scripts to ensure 100% adherence to folder structure and boilerplate code.

| Command | Purpose | Files Created |
|---|---|---|
| `yarn generateMVCScreen` | New feature screen | `.tsx`, `.viewmodel.ts`, `.styles.ts` |
| `yarn generateReduxSlice` | New state slice | Creates folder + slice file; registers in `store.ts` |
| `yarn generateRNComponent` | Shared UI component | Folder + `.tsx` + `.styles.ts` |

### Complete MVC Implementation Example

#### Login Screen Implementation

**File: screens/AuthScreens/Login/Login.tsx**
```typescript
import React from 'react';
import { View } from 'react-native';
import Image from 'components/Image';
import ReusableButton from 'components/ReusableButton';
import TextInputComponent from 'components/TextInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import useViewModel from './Login.viewmodel';
import ImageConstants from '../../../utils/ImageConstants';

const Login = () => {
  const {
    username,
    password,
    usernameErrorMsg,
    passwordErrorMsg,
    handleUserNameChange,
    handlePasswordChange,
    onSubmit,
    styles,
    t,
    onEmailBlur,
    onPasswordBlur,
  } = useViewModel();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.logo}>
          <Image
            source={ImageConstants.LogoPng}
            style={styles.imageStyle}
            resizeMode="contain"
          />
        </View>
        <View style={styles.subContainer}>
          <TextInputComponent
            style={styles.input}
            placeholder={t('login.input.email.placeholder')}
            value={username}
            onChangeText={handleUserNameChange}
            keyboardType="email-address"
            autoCapitalize="none"
            isError={!!usernameErrorMsg}
            errorMsg={usernameErrorMsg}
            onBlur={onEmailBlur}
          />
          <TextInputComponent
            style={styles.input}
            placeholder={t('login.input.password.placeholder')}
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry
            isError={!!passwordErrorMsg}
            errorMsg={passwordErrorMsg}
            onBlur={onPasswordBlur}
          />
          <ReusableButton
            title={t('login.button.title')}
            onPress={onSubmit}
            style={styles.btnStyle}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Login;
```

**File: screens/AuthScreens/Login/Login.viewmodel.ts**
```typescript
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AUTH_STACK_NAVIGATOR } from 'navigators/routes';
import { useTranslation } from 'react-i18next';
import { logger } from 'utils/SecureLogger';
import Sentry, { trackEvent, logError, setUserContext, setContext } from 'utils/SentryUtil';
import StorageService from 'utils/StorageService';
import { useStyles } from './Login.styles';
import { validateData, validateField } from 'utils/ValidationSchemas';

type AuthStackParamList = {
  HOME: undefined;
  HOME_DETAILS: { data?: object };
};

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'HOME'>;

const useViewModel = () => {
  // State management
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameErrorMsg, setUsernameErrorMsg] = useState<string>('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>('');

  // Hooks
  const navigation = useNavigation<NavigationProp>();
  const styles = useStyles();
  const { t } = useTranslation();

  // Event handlers
  const onSubmit = async () => {
    await Sentry.startSpan({ name: 'User Login', op: 'auth.login' }, async (span) => {
      try {
        // Validation
        const validationResult = await validateData(
          { email: username, password: password },
          loginSchema,
        );

        if (!validationResult.isValid) {
          // Set error states based on validation results
          if (validationResult.errors.email) {
            setUsernameErrorMsg(validationResult.errors.email);
          }
          if (validationResult.errors.password) {
            setPasswordErrorMsg(validationResult.errors.password);
          }
          return;
        }

        // Clear any existing error states
        setUsernameErrorMsg('');
        setPasswordErrorMsg('');

        // Set user context for tracking
        setUserContext(username, username);
        setContext('user_info', { email: username });

        // Track successful login
        trackEvent('Login Success', { userId: username });
        span?.setStatus({ code: 1, message: 'Login Successful' });

        // Store login state and navigate
        await StorageService.storeItem(StorageService.storageKeys.isLoggedIn, true, true);
        navigation.navigate(AUTH_STACK_NAVIGATOR.HOME);
      } catch (error) {
        logger.error('Login submission error:', { error });
        logError(error, {
          screen: 'Login',
          action: 'handleLogin',
          email: username,
        });

        // Track failed login
        trackEvent('Login Failed', {
          username,
          error: error || 'Login failed',
        });
        span?.setStatus({
          code: 2,
          message: 'unknown_error',
        });
      }
    });
  };

  const handleUserNameChange = (text: string) => {
    setUsername(text);
    // Clear error when user starts typing
    setUsernameErrorMsg('');
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    // Clear error when user starts typing
    setPasswordErrorMsg('');
  };

  const onEmailBlur = async () => {
    const emailValidation = await validateField('email', username, loginSchema);
    if (!emailValidation.isValid) {
      setUsernameErrorMsg(emailValidation.error);
    }
  };

  const onPasswordBlur = async () => {
    const passwordValidation = await validateField('password', password, loginSchema);
    if (!passwordValidation.isValid) {
      setPasswordErrorMsg(passwordValidation.error);
    }
  };

  // Return everything View needs
  return {
    username,
    password,
    usernameErrorMsg,
    passwordErrorMsg,
    handleUserNameChange,
    handlePasswordChange,
    onSubmit,
    styles,
    t,
    onEmailBlur,
    onPasswordBlur,
  };
};

export default useViewModel;
```

**File: screens/AuthScreens/Login/Login.styles.ts**
```typescript
import { StyleSheet } from 'react-native';
import { moderateScale, screenWidth, verticalScale } from 'utils/Dimensions';
import { M_1, M_10, M_12, M_16, M_8, V_15, V_40 } from 'utils/SizeUtility';
import { useTheme } from '../../../contexts/ThemeContext';

export const useStyles = () => {
  const { themeColors } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    logo: {
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: verticalScale(150),
      marginBottom: V_40,
    },
    input: {
      height: verticalScale(40),
      borderColor: 'gray',
      borderWidth: M_1,
      paddingHorizontal: M_10,
      width: '100%',
      marginVertical: V_15,
      borderRadius: M_8,
      fontSize: M_12,
      color: themeColors.inputValue,
    },
    subContainer: {
      margin: M_16,
      flex: 1,
    },
    safeArea: {
      flex: 1,
    },
    btnStyle: {
      marginTop: V_40,
    },
    imageStyle: {
      height: moderateScale(120),
      width: screenWidth * 0.8,
    },
  });
};
```

---

## Responsive Design & Layout Standards

The boilerplate uses a hybrid responsive system (scaling + pre-calculated constants).

### 1. Scaling Helpers (`src/utils/Dimensions.ts`)
- `moderateScale(size, factor?)`: Primary scaling for most elements.
- `verticalScale(size)`: Use for heights and vertical gaps.
- `normalize(size)`: Use for fonts, margins, and icons.
- Avoid raw pixel values (e.g., `padding: 10`). Always wrap in a helper.

### 2. Standard Constants (`src/utils/SizeUtility.ts`)
Standardize on the `N_*`, `V_*`, and `M_*` constants to maintain layout uniformity.

- **`N_*` (Normalize)**: Use for padding, rounded corners, and font sizes.
- **`V_*` (Vertical)**: Use for vertical margins, spacer heights, and row heights.
- **`M_*` (Moderate)**: Useful for square icons and proportional container sizes.

---

## Theme System

Located in `src/theme/colors.ts`.

```typescript
import { ThemeOptions } from '../types/types';

export const colors = {
  [ThemeOptions.dark]: {
    primary: { [10]: '#00b4d8', [50]: '#0077b6', [90]: '#03045e' },
    secondary: '#caf0f8',
    background: '#000814',
    headerBackground: '#001d3d',
    error: '#c1121f',
    text: '#ffffff',
    inputValue: '#ffffff',
    inputPlaceholder: '#b0b0b0',
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  [ThemeOptions.light]: {
    primary: { [10]: '#00b4d8', [50]: '#0077b6', [90]: '#03045e' },
    secondary: '#caf0f8',
    background: '#f8f9fa',
    headerBackground: '#ffffff',
    error: '#c1121f',
    text: '#212529',
    inputValue: '#212529',
    inputPlaceholder: '#6c757d',
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
};
```

- The active theme key (`ThemeOptions.dark` | `ThemeOptions.light`) is managed via `ThemeProvider` context.
- Styles **must** use the `useStyles` hook pattern inside the screen folder for automatic re-renders.
- **Never hardcode hex values** — always reference `themeColors.*` (from `useTheme`) or specialized theme-wrapped components.

### Theme-Aware Styles Pattern
```typescript
// Screen.styles.ts
export const useStyles = () => {
    const { themeColors } = useTheme();
    return StyleSheet.create({
        container: { backgroundColor: themeColors.background }
    });
};
```

---

## Routing

Routes are defined as **enums** in `src/navigators/routes.ts`.

```typescript
enum MAIN_STACK_NAVIGATOR { HOME_TAB_NAVIGATOR = 'HOME_TAB_NAVIGATOR' }
enum AUTH_STACK_NAVIGATOR { LOGIN_SCREEN = 'LOGIN_SCREEN', HOME = 'HOME', ... }
enum HOME_TAB_NAVIGATOR { HOME = 'HOME', HOME_DETAILS = 'HOME_DETAILS' }
```

- Always import route names from `navigators/routes` — never use raw strings.
- Use `NavigationService` for imperative navigation outside of React components.
- Use `useNavigation<NavigationProp>()` typed with the stack's param list inside components/viewmodels.

---

## Networking — `HTTPService`

`src/networkConfig/HttpServices.ts` exposes a static class wrapping Axios.

```typescript
import HTTPService from 'networkConfig/HttpServices';

// GET
const data = await HTTPService.get<ResponseType>('/endpoint', { param: 'value' });

// POST
const result = await HTTPService.post<ResponseType>('/endpoint', { body: 'value' });

// PUT / DELETE follow the same pattern
```

### Interceptors (automatic — do not duplicate)
- **Request**: Attaches `Bearer` token from `StorageService`.
- **Response 401**: Queues requests, refreshes token, replays queue.
- **Response 403**: Calls `logoutUser()`.
- **Response 500**: Shows `Toast` with i18n message `network.server.error`.

### API endpoints
Define all endpoint strings in `src/networkConfig/Endpoints.ts` and import from there.

---

## Storage — `StorageService`

`src/utils/StorageService.ts` — singleton `StorageManager` instance.

```typescript
import StorageService from 'utils/StorageService';

// Secure storage (tokens, PII) — isSecure = true (default)
await StorageService.storeItem(StorageService.storageKeys.token, 'jwt', true);
const token = await StorageService.getItem<string>(StorageService.storageKeys.token, true);

// Regular storage (preferences, cache) — isSecure = false
await StorageService.storeItem('userPreferences', { theme: 'dark' }, false);
StorageService.removeItem('userPreferences', false);
StorageService.clearLocalStorage(); // clears both stores — use on logout only
```

### Predefined keys (`StorageService.storageKeys`)
| Key | Purpose |
|---|---|
| `isLoggedIn` | Auth flag |
| `token` | Access token |
| `refresh_token` | Refresh token |
| `theme` | Theme preference |
| `language` | i18n language |

- **Always use secure storage** for tokens, passwords, and personal data.
- **Use regular storage** for UI preferences and non-sensitive cache.

---

## Analytics & Monitoring SOPs

### 1. Firebase Analytics (`App.tsx`)
- Always log `app_open` on start.
- Capture `appInstanceId` and log with `logger.info`.
- Use `analytics().logEvent('event_name', { params })` for business logic tracking.

### 2. Sentry Monitoring (`SentryUtil.ts`)
- Initialise via `initSentry()` in `App.tsx`.
- Wrap the root component: `export default Sentry.wrap(App);`.
- **ViewModel Spans**: Use `Sentry.startSpan` to track performance of complex logic or API sequences.
- **Error Tracking**: User `Sentry.captureException(error)` in `catch` blocks.

---

## App Versioning Workflow

The project uses `auto-versioning.js` to synchronize versions across all layers.

```bash
# Options: patch (default), minor, major
node auto-versioning.js [patch|minor|major]
```

This script automatically updates:
1. `package.json` (`version`)
2. `android/app/build.gradle` (`versionCode` and `versionName`)
3. `ios/template/Info.plist` (`CFBundleShortVersionString`)

---

## Logging — `SecureLogger`

`src/utils/SecureLogger.ts` — singleton exported as `logger`.

```typescript
import { logger } from 'utils/SecureLogger';

logger.info('User logged in', { userId: 'user123' });
logger.warn('Slow network detected', { latency: 2000 });
logger.error('API call failed', { endpoint: '/api/data', error: errorMessage });
logger.debug('State update', { prevState, nextState }); // dev only
```

### Rules
- **Always pass context as the second argument** (an object) — never concatenate sensitive data into the message string.
- The logger automatically redacts PHI (emails, SSNs, tokens, names, passwords, etc.) before storage.
- Initialise once in `App.tsx`: `await initializeLogger();`
- In tests, mock the logger; never let it write to the real MMKV in test environments.
- Console logging is enabled in `__DEV__` only.

---

## Sentry — `SentryUtil`

`src/utils/SentryUtil.ts` provides convenience wrappers.

```typescript
import Sentry, { logError, setContext, setUserContext, trackEvent } from 'utils/SentryUtil';

// Track a custom event
trackEvent('Login Attempt', { username });

// Set user identity
setUserContext(userId, email);

// Set additional context
setContext('checkout_info', { cart_size: 3 });

// Log a caught error
logError(error, { screen: 'Login', action: 'handleLogin' });

// Wrap an operation in a performance span
await Sentry.startSpan({ name: 'User Login', op: 'auth.login' }, async (span) => {
  // ... work ...
  span?.setStatus({ code: 1, message: 'ok' });
});
```

---

## Validation — `ValidationSchemas`

`src/utils/ValidationSchemas.ts` holds Yup schemas and helpers.

```typescript
import { loginSchema, validateData, validateField } from 'utils/ValidationSchemas';

// Full form validation
const result = await validateData({ email, password }, loginSchema);
if (!result.isValid) { /* result.errors.email, result.errors.password */ }

// Single-field blur validation
const fieldResult = await validateField('email', value, loginSchema);
if (!fieldResult.isValid) { /* fieldResult.error */ }
```

---

## Shared Components Reference

All shared components live in `src/components/` and are re-exported from `src/components/index.ts`.

### ReusableButton
```typescript
interface ReusableButtonProps {
  title?: string;           // Button text (default: 'Button')
  onPress?: () => void;     // Press handler
  style?: StyleProp<ViewStyle>;      // Additional container styles
  textStyle?: StyleProp<TextStyle>;  // Text styles
  disabled?: boolean;       // Disable state (default: false)
}

// Usage
<ReusableButton 
  title="Login" 
  onPress={handleLogin}
  style={styles.loginButton}
  disabled={isLoading}
/>
```

### TextInputComponent
```typescript
interface TextInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;
  style?: StyleProp<ViewStyle>;
  isError?: boolean;        // Show error state
  errorMsg?: string;        // Error message to display
  onBlur?: () => void;      // Blur handler for validation
}

// Usage
<TextInputComponent
  value={email}
  onChangeText={setEmail}
  placeholder="Email"
  keyboardType="email-address"
  isError={hasError}
  errorMsg={errorMessage}
  onBlur={validateEmail}
/>
```

### Text Component
```typescript
// Theme-aware text component
import Text from 'components/Text';

<Text style={styles.title}>Title</Text>
<Text style={getTypographyStyle(TypographyStyleEnum.BODY)}>Body text</Text>
```

### Image Component
```typescript
import Image from 'components/Image';

<Image 
  source={ImageConstants.LogoPng}
  style={styles.logo}
  resizeMode="contain"
/>
```

### Other Components
| Component | Purpose | Key Features |
|---|---|---|
| `Flatlist` | Performance-optimized list rendering | Uses @shopify/flash-list |
| `Header` | Navigation header | Theme-aware, back button |
| `ErrorHandler` | Error boundary | Fallback UI for errors |

**Always import from the barrel** when multiple components are needed:
```typescript
import { Header, ReusableButton, TextInputComponent, Text } from 'components';
```

---

## State Management — Redux

- Store config: `src/redux/app/store.ts`
- Slices: `src/redux/reducer/<SliceName>/index.ts`
- Access typed selector: `import { useTypedSelector } from 'hooks/useTypedSelector'`
- Dispatch: standard `useDispatch` from `react-redux`

### Adding a new slice
```bash
yarn generateReduxSlice
```
This scaffolds the slice file and wires it into the store automatically.

---

## i18n

Translation keys live in `src/language/`. Use `useTranslation` from `react-i18next` inside ViewModels.

```typescript
const { t } = useTranslation();
t('login.input.email.placeholder');
```

- Never write user-facing strings directly in JSX — always use translation keys.
- Network error messages (`network.server.error`, `network.generic.error`) are already defined.

---

## Environment Configuration

### Available Environments
| File | Environment | Purpose |
|---|---|---|
| `.env` / `.env.development` | Development | Local development and debugging |
| `.env.qa` | QA | Quality assurance testing |
| `.env.staging` | Staging | Pre-production testing |
| `.env.uat` | UAT | User acceptance testing |
| `.env.production` | Production | Live deployment |

### Environment Variables Usage
```typescript
import Config from 'react-native-config';

// Common environment variables
const API_BASE_URL = Config.API_BASE_URL;
const SENTRY_DSN = Config.SENTRY_DSN;
const ENVIRONMENT = Config.ENVIRONMENT;
const IS_PRODUCTION = Config.IS_PRODUCTION === 'true';
const LOG_LEVEL = Config.LOG_LEVEL;

// Usage in HTTPService
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
});
```

### Build Scripts by Environment

#### iOS Build Scripts
```bash
# Development
yarn ios:run:templateDevelopment:debug    # Development build
yarn ios:run:templateDevelopment:release  # Development release

# QA
yarn ios:run:templateQA:debug              # QA build
yarn ios:run:templateQA:release            # QA release

# Staging
yarn ios:run:templateStaging:debug         # Staging build
yarn ios:run:templateStaging:release       # Staging release

# UAT
yarn ios:run:templateUAT:debug             # UAT build
yarn ios:run:templateUAT:release           # UAT release

# Production
yarn ios:run:template:debug                # Production build
yarn ios:run:template:release              # Production release
```

#### Android Build Scripts
```bash
# Development
yarn android:dev                           # Development debug
yarn android:dev-release                   # Development release

# QA
yarn android:qa                            # QA debug
yarn android:qa-release                    # QA release

# Staging
yarn android:staging                       # Staging debug
yarn android:staging-release               # Staging release

# UAT
yarn android:uat                           # UAT debug
yarn android:uat-release                   # UAT release

# Production
yarn android:prod                          # Production debug
yarn android:prod-release                 # Production release
```

### Environment-Specific Configuration
- **Development**: Console logging enabled, debug endpoints, relaxed security
- **QA/Staging/UAT**: Production-like setup with test data and services
- **Production**: Optimized build, no console logging, production endpoints

### Common Environment Variables
```bash
# API Configuration
API_BASE_URL=https://api.example.com
API_TIMEOUT=20000

# Sentry Configuration
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id

# Feature Flags
ENABLE_BIOMETRICS=true
ENABLE_ANALYTICS=true

# Build Configuration
IS_PRODUCTION=false
LOG_LEVEL=debug
```

---

## Build & Run Scripts

```bash
# iOS
yarn ios                         # Debug (default scheme)
yarn ios:run:template:debug
yarn ios:run:templateQA:debug
yarn ios:run:templateStaging:debug
yarn ios:run:templateUAT:debug
yarn ios:run:templateDevelopment:debug

# Android
yarn android                     # Debug
yarn android:dev                 # Development debug
yarn android:qa                  # QA debug
yarn android:staging             # Staging debug
yarn android:uat                 # UAT debug
yarn android:prod                # Production debug

# Tests
yarn test                        # Run all tests
yarn test:coverage               # Coverage report
yarn test:ci                     # CI mode (JSON output, force exit)

# Code quality
yarn lint
yarn pretty

# Versioning
yarn version-patch               # x.x.PATCH
yarn version-minor               # x.MINOR.x
yarn version-major               # MAJOR.x.x
```

---

## Module Aliases

Defined in `babel.config.js` and `tsconfig.json`. Use these aliases — never relative paths from deep files.

```typescript
import X from 'components/X';
import { logger } from 'utils/SecureLogger';
import StorageService from 'utils/StorageService';
import HTTPService from 'networkConfig/HttpServices';
import { AUTH_STACK_NAVIGATOR } from 'navigators/routes';
import NavigationService from 'navigators/NavigationService';
```

---

## Coding Conventions

### General
- All files are **TypeScript** (`.ts` / `.tsx`). No plain JS in `src/`.
- Use `const` arrow functions for components and hooks.
- Export components as `export default`, utilities as named exports.
- Barrel `index.ts` exports for `components/` and `screens/`.
- Use `async/await` — no raw `.then()` chains except in interceptors.
- Wrap all async operations in `try/catch`; log errors with `logger.error`.

### Naming
| Item | Convention |
|---|---|
| Components / HOCs | `PascalCase.tsx` |
| Hooks | `useCamelCase.ts` |
| ViewModels | `<ScreenName>.viewmodel.ts` |
| Styles | `<ScreenName>.styles.ts` |
| Redux slices | `<Name>Slice/index.ts` |
| Constants | `UPPER_SNAKE_CASE` |
| Enums | `PascalCase` enum, `UPPER_SNAKE_CASE` values |
| Types / Interfaces | `PascalCase` |

### Error Handling Patterns

#### Try-Catch with Logging
```typescript
try {
  // API call or async operation
  const result = await HTTPService.post('/endpoint', data);
} catch (error) {
  // Always log with context
  logger.error('Operation failed', { error, endpoint: '/endpoint' });
  
  // Report to Sentry with context
  logError(error, { 
    screen: 'ScreenName', 
    action: 'functionName',
    userId: 'user123' 
  });
  
  // Show user feedback
  Toast.show({
    type: TOAST_TYPE.ERROR,
    text1: t('error.general'),
  });
}
```

#### Validation Error Handling
```typescript
const onSubmit = async () => {
  const result = await validateData(formData, schema);
  if (!result.isValid) {
    // Set specific error messages
    if (result.errors.email) setEmailError(result.errors.email);
    if (result.errors.password) setPasswordError(result.errors.password);
    return;
  }
  // Continue with submission
};
```

#### Async Operation Error Handling
```typescript
const loadData = async () => {
  await Sentry.startSpan({ name: 'Load Data', op: 'db.query' }, async (span) => {
    try {
      const data = await HTTPService.get('/api/data');
      setData(data);
      span?.setStatus({ code: 1, message: 'Success' });
    } catch (error) {
      logger.error('Failed to load data', { error });
      logError(error, { screen: 'DataScreen', action: 'loadData' });
      span?.setStatus({ code: 2, message: 'Failed' });
      Toast.show({
        type: TOAST_TYPE.ERROR,
        text1: t('error.load_data'),
      });
    }
  });
};
```

#### Error Handling Rules
1. **Catch errors at the ViewModel level** - Never let errors bubble to the View
2. **Log with context** - Always include relevant context in error logs
3. **Report to Sentry** - Use `logError()` with screen and action context
4. **Show user feedback** - Use Toast messages for user-facing errors
5. **Never swallow errors silently** - Always log or report errors
6. **Use Sentry spans** - Track performance of critical operations

### Testing
- Test files live in `__tests__/` or co-located with a `.test.ts` suffix.
- Mock `StorageService`, `logger`, and `NavigationService` in every test.
- Use `@testing-library/react-native` for component tests.
- Run `yarn test:ci` before merging.

### Commits
Follow **conventional commits**:
```
feat: add biometric login
fix: token refresh race condition
chore: update dependencies
refactor: extract validation logic
```
Enforced by commitlint + Husky.

---

## Security & PHI Compliance

- **Never log raw PII** (email, name, token, password) in message strings — pass as context so `SecureLogger` can redact them.
- **Always use secure storage** (`isSecure: true`) for tokens and personal data.
- Run `StorageService.clearLocalStorage()` on logout to purge all stored data.
- `SecureLogger` automatically redacts: SSNs, credit cards, emails, phone numbers, patient IDs, names, tokens, passwords.

---

## Theme Selection (CLI)

Claude Code was initialised with **Dark mode (colorblind-friendly)** theme (option 3).
To change: run `/theme` inside the Claude Code CLI.

---

## Third-Party SDK Installation Protocol

Whenever a new third-party SDK or native module is required, follow this **mandatory sequence** exactly.
Never skip steps. Never copy-paste snippets without first reading the official docs for the target version.

---

### Step 1 — Read the Documentation First

Before writing a single line of code:

1. Fetch the SDK's **official installation guide** for the exact version being installed.
2. Read the **iOS setup** section completely (CocoaPods, permissions, `AppDelegate`, `Info.plist`).
3. Read the **Android setup** section completely (Gradle, `AndroidManifest.xml`, ProGuard).
4. Read the **React Native / JS** setup section (linking, initialisation, peer dependencies).
5. Note any **minimum OS requirements**, breaking changes, or migration notes.
6. Check whether **auto-linking** is supported (RN ≥ 0.60) or manual linking is needed.

> ⚠️ **Never assume** that a snippet from a tutorial or Stack Overflow is correct for the installed version.
> Always verify against `node_modules/<sdk>/README.md` or the official docs.

---

### Step 2 — Install the Package

```bash
# Preferred: yarn (matches existing lockfile)
yarn add <package-name>@<exact-version>

# For dev/test-only packages
yarn add --dev <package-name>@<exact-version>
```

After installation:

- Confirm the entry appears in `package.json` under the correct section (`dependencies` / `devDependencies`).
- Check for required **peer dependencies** listed in the SDK docs and install them if not already present.
- Search `node_modules/<package-name>/package.json` for `peerDependencies` and reconcile.

---

### Step 3 — iOS Configuration

Run `cd ios && pod install && cd ..` after any native iOS change.

| File | What to configure |
|---|---|
| `ios/Podfile` | Add SDK-specific pods inside the target block; honour minimum iOS deployment target |
| `ios/<App>/AppDelegate.mm` | Import the SDK header and call its setup method in `didFinishLaunchingWithOptions` |
| `ios/<App>/Info.plist` | Add all required `NSUsageDescription` keys and background modes |
| Xcode Capabilities | Enable Push Notifications, Keychain Sharing, Background Modes etc. as required |
| Build Settings | Set `SWIFT_VERSION`, `ENABLE_BITCODE`, or any flags the SDK requires |

---

### Step 4 — Android Configuration

| File | What to configure |
|---|---|
| `android/build.gradle` | Add SDK Maven repositories and classpath plugins |
| `android/app/build.gradle` | Add `apply plugin`, `implementation` dep, `defaultConfig` / `manifestPlaceholders`; verify `minSdkVersion` |
| `android/app/src/main/AndroidManifest.xml` | Add required `<uses-permission>`, `<service>`, `<receiver>`, `<meta-data>` entries |
| `MainApplication.kt` / `.java` | Import and initialise the SDK in `onCreate()` |
| `android/app/proguard-rules.pro` | Copy ProGuard / R8 keep-rules verbatim from the SDK's official docs |

---

### Step 5 — React Native / JavaScript Initialisation

- **Auto-linking**: Confirm module appears after `pod install` / Gradle sync; if not, register in `react-native.config.js`.
- **Wrapper file**: Create `src/utils/<SDKName>Util.ts` following the `SentryUtil.ts` pattern — wraps all SDK calls, logs init with `logger.info/error`.
- **Init call**: Add to `App.tsx` alongside `initializeLogger()`.
- **API keys**: Store in the appropriate `.env.*` file; read via `react-native-config`. Never hardcode keys.

---

---

### Step 6 — Verification Checklist

- [ ] `yarn test` — no regressions
- [ ] `yarn lint` — no new ESLint errors
- [ ] iOS builds cleanly: `yarn ios:run:template:debug`
- [ ] Android builds cleanly: `yarn android:dev`
- [ ] SDK initialises without runtime errors on both platforms
- [ ] No duplicate symbols (Xcode) or duplicate class errors (Android)
- [ ] All required permissions declared and working on-device
- [ ] No raw PII logged — routed through `SecureLogger`
- [ ] API keys in `.env.*`, not committed to source control

---

### Step 7 — Document the SDK in CLAUDE.md

Append a row to the **Installed SDKs Registry** table below and update the Tech Stack table at the top of this file.

---

## Installed SDKs Registry

Track every third-party SDK here. This table is the single source of truth for what is installed,
why it was added, and where its initialisation code lives.

| SDK | NPM Package | Version | Purpose | Init File | Docs |
|---|---|---|---|---|---|
| Notifee | `@notifee/react-native` | ^9.1.8 | Local push notifications | `App.tsx` | [notifee.app](https://notifee.app/react-native/docs/installation) |
| Firebase Analytics | `@react-native-firebase/analytics` | ^23.8.8 | User event analytics | `App.tsx` | [rnfirebase.io](https://rnfirebase.io/analytics/usage) |
| Firebase App | `@react-native-firebase/app` | ^23.8.8 | Firebase core initialisation | `App.tsx` | [rnfirebase.io](https://rnfirebase.io) |
| Firebase Crashlytics | `@react-native-firebase/crashlytics` | ^23.8.8 | Crash reporting | `App.tsx` | [rnfirebase.io](https://rnfirebase.io/crashlytics/usage) |
| Sentry | `@sentry/react-native` | ^8.6.0 | Error monitoring & performance | `src/utils/SentryUtil.ts` | [docs.sentry.io](https://docs.sentry.io/platforms/react-native) |
| Biometrics | `@sbaiahmed1/react-native-biometrics` | ^0.14.0 | Face ID / Fingerprint auth | `src/hooks/useBiometrics.ts` | [npm](https://www.npmjs.com/package/@sbaiahmed1/react-native-biometrics) |
| Flash List | `@shopify/flash-list` | ^2.3.1 | Performant list rendering | `src/components/Flatlist.tsx` | [shopify.github.io](https://shopify.github.io/flash-list) |
| React Navigation | `@react-navigation/native` | ^7.2.2 | Navigation stack/tabs | `src/navigators/` | [reactnavigation.org](https://reactnavigation.org/docs/getting-started) |
| Redux Toolkit | `@reduxjs/toolkit` | ^2.11.2 | State management | `src/redux/app/store.ts` | [redux-toolkit.js.org](https://redux-toolkit.js.org) |
| Axios | `axios` | ^1.14.0 | HTTP networking | `src/networkConfig/HttpServices.ts` | [axios-http.com](https://axios-http.com/docs/intro) |
| MMKV | `react-native-mmkv` | ^4.3.0 | Fast encrypted storage | `src/utils/StorageService.ts` | [github](https://github.com/mrousavy/react-native-mmkv) |
| Keychain | `react-native-keychain` | ^10.0.0 | Secure credential storage (iOS Keychain / Android Keystore) | `src/utils/StorageService.ts` | [github](https://github.com/oblador/react-native-keychain) |
| Bootsplash | `react-native-bootsplash` | ^7.2.0 | Splash screen | `App.tsx` | [github](https://github.com/zoontek/react-native-bootsplash) |
| Config | `react-native-config` | ^1.6.1 | Multi-environment variables | `.env.*` files | [github](https://github.com/lugg/react-native-config) |
| Safe Area Context | `react-native-safe-area-context` | ^5.7.0 | Safe area insets | `App.tsx` provider | [docs](https://docs.expo.dev/versions/latest/sdk/safe-area-context) |
| SVG | `react-native-svg` | ^15.15.4 | SVG rendering | `src/assets/` | [github](https://github.com/software-mansion/react-native-svg) |
| Toast Message | `react-native-toast-message` | ^2.3.3 | In-app toast notifications | `App.tsx` | [github](https://github.com/calintamas/react-native-toast-message) |
| i18next | `i18next` + `react-i18next` | ^26 / ^17 | Internationalisation | `src/language/` | [i18next.com](https://www.i18next.com) |
| Yup | `yup` | ^1.7.1 | Schema validation | `src/utils/ValidationSchemas.ts` | [github](https://github.com/jquense/yup) |

> When adding a new SDK, append a row to this table as part of the same PR/commit.
