import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'utils/Dimensions';
import { fontFamily, fontSizes } from 'utils/FontUtils';
import { M_16, M_12, M_8, M_4, N_8, N_4, V_15 } from 'utils/SizeUtility';

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8FAFC',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: M_16,
      paddingTop: verticalScale(16),
      paddingBottom: verticalScale(12),
      backgroundColor: '#FFFFFF',
      gap: M_8,
    },
    backButton: {
      width: moderateScale(36),
      height: moderateScale(36),
      borderRadius: moderateScale(18),
      backgroundColor: '#F1F5F9',
      alignItems: 'center',
      justifyContent: 'center',
    },
    backIcon: {
      fontSize: fontSizes.F18,
      color: '#1A1A2E',
      marginTop: -2,
    },
    headerTitle: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSizes.F17,
      color: '#1A1A2E',
    },
    scrollContent: {
      padding: M_16,
      paddingBottom: verticalScale(40),
    },
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: moderateScale(14),
      paddingHorizontal: M_16,
      paddingVertical: verticalScale(14),
      marginBottom: verticalScale(14),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 2,
    },
    cardSectionTitle: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSizes.F12,
      color: '#94A3B8',
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      marginBottom: verticalScale(14),
    },
    fieldGroup: {
      marginBottom: verticalScale(16),
    },
    fieldLabel: {
      fontFamily: fontFamily.medium,
      fontSize: fontSizes.F13,
      color: '#475569',
      marginBottom: verticalScale(6),
    },
    textInput: {
      backgroundColor: '#F8FAFC',
      borderWidth: 1,
      borderColor: '#E2E8F0',
      borderRadius: moderateScale(10),
      paddingHorizontal: M_12,
      paddingVertical: verticalScale(11),
      fontFamily: fontFamily.regular,
      fontSize: fontSizes.F14,
      color: '#1E293B',
    },
    textInputError: {
      borderColor: '#E11D48',
    },
    textInputMultiline: {
      height: verticalScale(80),
      textAlignVertical: 'top',
    },
    errorText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSizes.F11,
      color: '#E11D48',
      marginTop: verticalScale(4),
    },
    dosageRow: {
      flexDirection: 'row',
      gap: M_8,
    },
    dosageField: {
      flex: 1,
    },
    pillsField: {
      flex: 1,
    },
    chipsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: N_8,
    },
    chip: {
      paddingHorizontal: M_12,
      paddingVertical: verticalScale(8),
      borderRadius: moderateScale(20),
      backgroundColor: '#F1F5F9',
      borderWidth: 1,
      borderColor: '#E2E8F0',
    },
    chipActive: {
      backgroundColor: '#EFF6FF',
      borderColor: '#0077b6',
    },
    chipText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSizes.F12,
      color: '#64748B',
    },
    chipTextActive: {
      color: '#0077b6',
      fontFamily: fontFamily.semiBold,
    },
    mealRow: {
      flexDirection: 'row',
      borderRadius: moderateScale(10),
      backgroundColor: '#F1F5F9',
      padding: M_4,
    },
    mealOption: {
      flex: 1,
      paddingVertical: verticalScale(9),
      alignItems: 'center',
      borderRadius: moderateScale(8),
    },
    mealOptionActive: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    mealOptionText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSizes.F12,
      color: '#94A3B8',
    },
    mealOptionTextActive: {
      fontFamily: fontFamily.semiBold,
      color: '#0077b6',
    },
    submitButton: {
      backgroundColor: '#0077b6',
      borderRadius: moderateScale(14),
      paddingVertical: verticalScale(15),
      alignItems: 'center',
      marginTop: verticalScale(4),
      shadowColor: '#0077b6',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 4,
    },
    submitButtonText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSizes.F15,
      color: '#FFFFFF',
      letterSpacing: 0.2,
    },
  });
};
