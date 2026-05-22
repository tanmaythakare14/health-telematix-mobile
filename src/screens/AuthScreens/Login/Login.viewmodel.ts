import {useCallback, useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {logger} from 'utils/SecureLogger';
import Sentry, {logError, setUserContext, trackEvent} from 'utils/SentryUtil';
import StorageService from 'utils/StorageService';
import {ThemeOptions, AuthStackParamList} from 'types/types';
import {useTheme} from '../../../contexts/ThemeContext';
import {useStyles} from './Login.styles';
import {phoneSchema, otpSchema, validateData, validateField} from 'utils/ValidationSchemas';
import {setToken} from '../../../redux/reducer/AppSlice';
import {AppDispatch} from '../../../redux/app/store';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'LOGIN_SCREEN'>;

type LoginStep = 'phone' | 'otp';

const RESEND_COOLDOWN_SECONDS = 30;
const OTP_LENGTH = 6;

const useViewModel = () => {
  const [step, setStep] = useState<LoginStep>('phone');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [otpValues, setOtpValues] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [otpError, setOtpError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);

  const otpInputRefs = useRef<Array<TextInput | null>>(Array(OTP_LENGTH).fill(null));

  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const styles = useStyles();
  const {t} = useTranslation();
  const {theme} = useTheme();

  const isDark = theme === ThemeOptions.dark;

  // Countdown timer for OTP resend
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const maskedPhone =
    phone.length >= 6
      ? `+1 ${'•'.repeat(phone.length - 4)}${phone.slice(-4)}`
      : `+1 ${phone}`;

  // ─── Phone step handlers ──────────────────────────────────────────────────

  const handlePhoneChange = (text: string) => {
    const digits = text.replace(/[^0-9]/g, '');
    setPhone(digits);
    if (phoneError) {
      setPhoneError('');
    }
  };

  const onPhoneFocus = () => setIsPhoneFocused(true);

  const onPhoneBlur = async () => {
    setIsPhoneFocused(false);
    if (!phone) {
      return;
    }
    const result = await validateField('phone', phone, phoneSchema);
    if (!result.isValid) {
      setPhoneError(result.error);
    }
  };

  const onSendOtp = async () => {
    await Sentry.startSpan({name: 'Send OTP', op: 'auth.sendOtp'}, async span => {
      try {
        setIsLoading(true);

        const result = await validateData({phone}, phoneSchema);
        if (!result.isValid) {
          setPhoneError(result.errors.phone ?? t('login.phone.error'));
          return;
        }

        trackEvent('OTP Requested', {lastFour: phone.slice(-4)});

        // TODO: Replace with real API call
        // await HTTPService.post('/auth/send-otp', { phone: `+1${phone}` });

        logger.info('OTP sent', {lastFour: phone.slice(-4)});
        span?.setStatus({code: 1, message: 'OTP sent'});

        setStep('otp');
        setOtpValues(Array(OTP_LENGTH).fill(''));
        setOtpError('');
        setTimer(RESEND_COOLDOWN_SECONDS);
        setCanResend(false);

        // Auto-focus first OTP box after transition animation settles
        setTimeout(() => {
          otpInputRefs.current[0]?.focus();
        }, 350);
      } catch (error) {
        logger.error('Failed to send OTP', {error});
        logError(error, {screen: 'Login', action: 'onSendOtp'});
        trackEvent('OTP Send Failed', {error: String(error)});
        span?.setStatus({code: 2, message: 'unknown_error'});
      } finally {
        setIsLoading(false);
      }
    });
  };

  // ─── OTP step handlers ────────────────────────────────────────────────────

  const handleOtpChange = useCallback(
    (text: string, index: number) => {
      const digit = text.replace(/[^0-9]/g, '').slice(-1);
      const updated = [...otpValues];
      updated[index] = digit;
      setOtpValues(updated);

      if (otpError) {
        setOtpError('');
      }

      if (digit && index < OTP_LENGTH - 1) {
        otpInputRefs.current[index + 1]?.focus();
      }
    },
    [otpValues, otpError],
  );

  const handleOtpKeyPress = useCallback(
    (key: string, index: number) => {
      if (key === 'Backspace' && !otpValues[index] && index > 0) {
        const updated = [...otpValues];
        updated[index - 1] = '';
        setOtpValues(updated);
        otpInputRefs.current[index - 1]?.focus();
      }
    },
    [otpValues],
  );

  const onVerifyOtp = async () => {
    const otp = otpValues.join('');
    await Sentry.startSpan({name: 'Verify OTP', op: 'auth.verifyOtp'}, async span => {
      try {
        setIsLoading(true);

        const result = await validateData({otp}, otpSchema);
        if (!result.isValid) {
          setOtpError(result.errors.otp ?? t('login.otp.error'));
          return;
        }

        // TODO: Replace with real API call
        // const response = await HTTPService.post('/auth/verify-otp', { phone: `+1${phone}`, otp });

        setUserContext(phone, '');
        trackEvent('OTP Verified', {lastFour: phone.slice(-4)});
        span?.setStatus({code: 1, message: 'OTP verified'});

        await StorageService.storeItem(StorageService.storageKeys.isLoggedIn, true, true);
        dispatch(setToken('session-token'));
      } catch (error) {
        logger.error('OTP verification failed', {error});
        logError(error, {screen: 'Login', action: 'onVerifyOtp'});
        trackEvent('OTP Verify Failed', {error: String(error)});
        span?.setStatus({code: 2, message: 'unknown_error'});
      } finally {
        setIsLoading(false);
      }
    });
  };

  const handleResendOtp = async () => {
    if (!canResend || isLoading) {
      return;
    }
    setOtpValues(Array(OTP_LENGTH).fill(''));
    setOtpError('');
    trackEvent('OTP Resend Requested', {lastFour: phone.slice(-4)});
    await onSendOtp();
  };

  const onBackToPhone = () => {
    setStep('phone');
    setOtpValues(Array(OTP_LENGTH).fill(''));
    setOtpError('');
  };

  return {
    step,
    phone,
    phoneError,
    isPhoneFocused,
    otpValues,
    otpError,
    isLoading,
    timer,
    canResend,
    maskedPhone,
    isDark,
    otpInputRefs,
    handlePhoneChange,
    onPhoneFocus,
    onPhoneBlur,
    onSendOtp,
    handleOtpChange,
    handleOtpKeyPress,
    onVerifyOtp,
    handleResendOtp,
    onBackToPhone,
    styles,
    t,
  };
};

export default useViewModel;
