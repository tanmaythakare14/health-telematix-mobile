import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from 'components';
import ReusableButton from 'components/ReusableButton';
import {isIos} from 'utils/Dimensions';
import useViewModel from './Login.viewmodel';
import LoginIllustration from './LoginIllustration';

const Login = () => {
  const {
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
  } = useViewModel();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={isIos ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <SafeAreaView style={styles.safeArea}>

            {/* ── Brand mark ─────────────────────────────────────────────── */}
            <View style={styles.brandSection}>
              <View style={styles.logoMark}>
                <Text style={styles.logoInitials}>HT</Text>
              </View>
              <Text style={styles.brandName}>Health Telematix</Text>
            </View>

            {/* ── Illustration ───────────────────────────────────────────── */}
            <View style={styles.illustrationWrapper}>
              <LoginIllustration />
            </View>

            {/* ── Content ────────────────────────────────────────────────── */}
            <View style={styles.contentSection}>

              {/* Back button — OTP step only */}
              {step === 'otp' && (
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={onBackToPhone}
                  accessibilityRole="button"
                  accessibilityLabel="Go back">
                  <Text style={styles.backIcon}>{'←'}</Text>
                </TouchableOpacity>
              )}

              {/* Headline */}
              <Text style={styles.headline}>
                {step === 'phone' ? t('login.welcome.title') : t('login.otp.title')}
              </Text>

              {/* Subtitle */}
              <Text style={styles.subtitle}>
                {step === 'phone'
                  ? t('login.welcome.subtitle')
                  : `${t('login.otp.subtitle')} ${maskedPhone}`}
              </Text>

              {/* ── STEP 1: Phone number ─────────────────────────────────── */}
              {step === 'phone' && (
                <View style={styles.phoneInputWrapper}>
                  <Text style={styles.inputLabel}>{t('login.phone.label')}</Text>

                  <View
                    style={[
                      styles.phoneInputContainer,
                      isPhoneFocused && styles.phoneInputContainerFocused,
                      !!phoneError && styles.phoneInputContainerError,
                    ]}>
                    {/* Country code — tappable for future picker */}
                    <TouchableOpacity
                      style={styles.countryCodeTouchable}
                      accessibilityRole="button"
                      accessibilityLabel="Country code">
                      <Text style={styles.countryFlag}>🇺🇸</Text>
                      <Text style={styles.countryCode}>
                        {t('login.phone.countryCode')}
                      </Text>
                      <Text style={styles.countryArrow}>▾</Text>
                    </TouchableOpacity>

                    <View style={styles.inputDivider} />

                    <TextInput
                      style={styles.phoneInput}
                      value={phone}
                      onChangeText={handlePhoneChange}
                      onFocus={onPhoneFocus}
                      onBlur={onPhoneBlur}
                      placeholder={t('login.phone.placeholder')}
                      keyboardType="number-pad"
                      maxLength={10}
                      returnKeyType="done"
                      textContentType="telephoneNumber"
                      accessibilityLabel={t('login.phone.label')}
                      accessibilityHint={t('login.phone.placeholder')}
                    />
                  </View>

                  {!!phoneError && (
                    <Text style={styles.errorText}>{phoneError}</Text>
                  )}
                </View>
              )}

              {/* ── STEP 2: OTP boxes ────────────────────────────────────── */}
              {step === 'otp' && (
                <View style={styles.otpSection}>
                  <View style={styles.otpRow}>
                    {otpValues.map((digit, index) => (
                      <TextInput
                        key={index}
                        ref={r => {
                          otpInputRefs.current[index] = r;
                        }}
                        style={[
                          styles.otpBox,
                          !!digit && styles.otpBoxFilled,
                        ]}
                        value={digit}
                        onChangeText={text => handleOtpChange(text, index)}
                        onKeyPress={({nativeEvent: {key}}) =>
                          handleOtpKeyPress(key, index)
                        }
                        keyboardType="number-pad"
                        maxLength={1}
                        textContentType="oneTimeCode"
                        selectTextOnFocus
                        accessibilityLabel={`OTP digit ${index + 1}`}
                      />
                    ))}
                  </View>

                  {!!otpError && (
                    <Text style={styles.errorText}>{otpError}</Text>
                  )}

                  {/* Resend timer / button */}
                  <View style={styles.resendContainer}>
                    {canResend ? (
                      <TouchableOpacity
                        style={styles.resendButton}
                        onPress={handleResendOtp}
                        accessibilityRole="button">
                        <Text style={styles.resendText}>
                          {t('login.otp.resend.button')}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <Text style={styles.timerText}>
                        {`${t('login.otp.resend.timer')} ${timer}${t('login.otp.resend.seconds')}`}
                      </Text>
                    )}
                  </View>
                </View>
              )}

              {/* ── CTA button ───────────────────────────────────────────── */}
              <ReusableButton
                title={
                  step === 'phone'
                    ? t('login.sendOtp.button')
                    : t('login.otp.verify.button')
                }
                onPress={step === 'phone' ? onSendOtp : onVerifyOtp}
                style={styles.ctaButton}
                disabled={isLoading}
              />

              {/* Privacy footer — phone step only */}
              {step === 'phone' && (
                <View style={styles.privacyContainer}>
                  <Text style={styles.privacyText}>
                    {`${t('login.privacy.text')} `}
                  </Text>
                  <TouchableOpacity accessibilityRole="link">
                    <Text style={styles.privacyLink}>
                      {t('login.privacy.link')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
