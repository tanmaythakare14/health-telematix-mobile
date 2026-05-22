import {StyleSheet} from 'react-native';
import {moderateScale, screenWidth, verticalScale} from 'utils/Dimensions';
import {
  M_1,
  M_2,
  M_4,
  M_8,
  M_12,
  M_16,
  M_22,
  M_24,
  M_44,
  N_12,
  N_13,
  N_14,
  N_16,
  N_18,
  N_20,
  N_24,
  N_32,
  V_6,
  V_8,
  V_12,
  V_16,
  V_24,
  V_32,
  V_40,
  V_48,
} from 'utils/SizeUtility';
import {useTheme} from '../../../contexts/ThemeContext';

export const useStyles = () => {
  const {themeColors} = useTheme();

  // OTP box width: fill available width evenly with M_8 gaps between 6 boxes
  const OTP_BOX_SIZE = (screenWidth - M_24 * 2 - M_8 * 5) / 6;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    flex: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    safeArea: {
      flex: 1,
      paddingHorizontal: M_24,
    },

    // ─── Brand ───────────────────────────────────────────────────────────────
    brandSection: {
      alignItems: 'center',
      paddingTop: verticalScale(28),
      paddingBottom: V_12,
    },
    illustrationWrapper: {
      alignItems: 'center',
      paddingBottom: V_24,
    },
    logoMark: {
      width: moderateScale(64),
      height: moderateScale(64),
      borderRadius: moderateScale(18),
      backgroundColor: themeColors.primary[90],
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: V_12,
      shadowColor: themeColors.primary[90],
      shadowOffset: {width: 0, height: moderateScale(6)},
      shadowOpacity: 0.35,
      shadowRadius: moderateScale(14),
      elevation: 10,
    },
    logoInitials: {
      fontSize: N_24,
      fontWeight: '800',
      color: themeColors.surface,
      letterSpacing: moderateScale(1.5),
    },
    brandName: {
      fontSize: N_14,
      fontWeight: '600',
      color: themeColors.inputPlaceholder,
      letterSpacing: moderateScale(1.2),
      textTransform: 'uppercase',
    },

    // ─── Content ─────────────────────────────────────────────────────────────
    contentSection: {
      flex: 1,
      paddingBottom: V_48,
    },

    // ─── Back button (OTP step) ───────────────────────────────────────────────
    backButton: {
      width: M_44,
      height: M_44,
      borderRadius: M_22,
      borderWidth: M_1,
      borderColor: themeColors.inputBorder,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: V_24,
      alignSelf: 'flex-start',
    },
    backIcon: {
      fontSize: N_20,
      color: themeColors.text,
      lineHeight: N_20 * 1.2,
    },

    // ─── Headlines ───────────────────────────────────────────────────────────
    headline: {
      fontSize: N_24,
      fontWeight: '700',
      color: themeColors.text,
      letterSpacing: -moderateScale(0.3),
      lineHeight: N_24 * 1.25,
      marginBottom: V_8,
    },
    subtitle: {
      fontSize: N_16,
      fontWeight: '400',
      color: themeColors.inputPlaceholder,
      lineHeight: N_16 * 1.6,
      marginBottom: V_24,
    },

    // ─── Input label ─────────────────────────────────────────────────────────
    inputLabel: {
      fontSize: N_12,
      fontWeight: '700',
      color: themeColors.inputPlaceholder,
      letterSpacing: moderateScale(0.8),
      textTransform: 'uppercase',
      marginBottom: V_8,
    },

    // ─── Phone input ─────────────────────────────────────────────────────────
    phoneInputWrapper: {
      marginBottom: M_4,
    },
    phoneInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: verticalScale(56),
      borderRadius: M_12,
      borderWidth: M_1,
      borderColor: themeColors.inputBorder,
      backgroundColor: themeColors.surface,
      overflow: 'hidden',
    },
    phoneInputContainerFocused: {
      borderWidth: M_2,
      borderColor: themeColors.primary[50],
    },
    phoneInputContainerError: {
      borderWidth: M_2,
      borderColor: themeColors.error,
    },
    countryCodeTouchable: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: M_16,
      height: '100%',
    },
    countryFlag: {
      fontSize: N_18,
      marginRight: M_4,
    },
    countryCode: {
      fontSize: N_16,
      fontWeight: '600',
      color: themeColors.text,
    },
    countryArrow: {
      fontSize: N_12,
      color: themeColors.inputPlaceholder,
      marginLeft: M_4,
    },
    inputDivider: {
      width: M_1,
      height: V_24,
      backgroundColor: themeColors.inputBorder,
    },
    phoneInput: {
      flex: 1,
      height: '100%',
      paddingHorizontal: M_16,
      fontSize: N_18,
      fontWeight: '500',
      color: themeColors.text,
      letterSpacing: moderateScale(0.5),
    },

    // ─── Error text ──────────────────────────────────────────────────────────
    errorText: {
      fontSize: N_13,
      color: themeColors.error,
      marginTop: V_6,
      marginLeft: M_4,
      lineHeight: N_13 * 1.5,
    },

    // ─── OTP section ─────────────────────────────────────────────────────────
    otpSection: {
      marginBottom: V_32,
    },
    otpRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: V_8,
    },
    otpBox: {
      width: OTP_BOX_SIZE,
      height: verticalScale(56),
      borderRadius: M_12,
      borderWidth: M_2,
      borderColor: themeColors.inputBorder,
      backgroundColor: 'transparent',
      fontSize: N_24,
      fontWeight: '500',
      color: themeColors.text,
      textAlign: 'center',
    },
    otpBoxFilled: {
      backgroundColor: themeColors.otpFilledBg,
    },

    // ─── Resend ──────────────────────────────────────────────────────────────
    resendContainer: {
      alignItems: 'center',
      paddingVertical: V_16,
    },
    timerText: {
      fontSize: N_14,
      color: themeColors.inputPlaceholder,
      lineHeight: N_14 * 1.5,
    },
    resendButton: {
      paddingVertical: V_8,
      paddingHorizontal: M_16,
    },
    resendText: {
      fontSize: N_16,
      fontWeight: '600',
      color: themeColors.primary[50],
    },

    // ─── CTA button ──────────────────────────────────────────────────────────
    ctaButton: {
      height: verticalScale(56),
      borderRadius: M_12,
      backgroundColor: themeColors.primary[50],
      marginTop: V_24,
    },

    // ─── Privacy footer ──────────────────────────────────────────────────────
    privacyContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: V_32,
      paddingHorizontal: M_16,
    },
    privacyText: {
      fontSize: N_13,
      color: themeColors.inputPlaceholder,
      lineHeight: N_13 * 1.6,
    },
    privacyLink: {
      fontSize: N_13,
      fontWeight: '600',
      color: themeColors.primary[50],
      lineHeight: N_13 * 1.6,
    },
  });
};
