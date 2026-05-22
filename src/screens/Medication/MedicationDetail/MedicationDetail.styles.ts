import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'utils/Dimensions';
import { fontFamily, fontSizes } from 'utils/FontUtils';
import { M_16, M_12, M_8, N_8, N_4, V_15 } from 'utils/SizeUtility';

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8FAFC',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: M_16,
      paddingTop: verticalScale(16),
      paddingBottom: verticalScale(12),
      backgroundColor: '#FFFFFF',
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
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
    headerActions: {
      flexDirection: 'row',
      gap: M_8,
    },
    actionBtn: {
      paddingHorizontal: M_12,
      paddingVertical: verticalScale(7),
      borderRadius: moderateScale(20),
    },
    editBtn: {
      backgroundColor: '#EFF6FF',
    },
    deleteBtn: {
      backgroundColor: '#FFF1F2',
    },
    editBtnText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSizes.F12,
      color: '#0077b6',
    },
    deleteBtnText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSizes.F12,
      color: '#E11D48',
    },
    scrollContent: {
      padding: M_16,
      paddingBottom: verticalScale(40),
    },
    statusBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: moderateScale(14),
      paddingHorizontal: M_16,
      paddingVertical: verticalScale(14),
      marginBottom: verticalScale(14),
    },
    statusBannerActive: {
      backgroundColor: '#F0FDF4',
    },
    statusBannerCompleted: {
      backgroundColor: '#F8FAFC',
    },
    statusBannerInactive: {
      backgroundColor: '#FFF1F2',
    },
    statusBannerLeft: {
      gap: verticalScale(2),
    },
    statusBannerLabel: {
      fontFamily: fontFamily.regular,
      fontSize: fontSizes.F11,
      color: '#94A3B8',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    statusBannerValue: {
      fontFamily: fontFamily.bold,
      fontSize: fontSizes.F16,
      color: '#1A1A2E',
    },
    statusPill: {
      paddingHorizontal: M_12,
      paddingVertical: verticalScale(6),
      borderRadius: moderateScale(20),
    },
    statusPillActive: {
      backgroundColor: '#DCFCE7',
    },
    statusPillCompleted: {
      backgroundColor: '#E2E8F0',
    },
    statusPillInactive: {
      backgroundColor: '#FFE4E6',
    },
    statusPillText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSizes.F12,
    },
    statusPillTextActive: {
      color: '#15803D',
    },
    statusPillTextCompleted: {
      color: '#64748B',
    },
    statusPillTextInactive: {
      color: '#E11D48',
    },
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: moderateScale(14),
      paddingVertical: verticalScale(4),
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
      paddingHorizontal: M_16,
      paddingTop: verticalScale(14),
      paddingBottom: verticalScale(6),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingHorizontal: M_16,
      paddingVertical: verticalScale(12),
    },
    rowDivider: {
      borderBottomWidth: 1,
      borderBottomColor: '#F1F5F9',
    },
    rowLabel: {
      fontFamily: fontFamily.regular,
      fontSize: fontSizes.F13,
      color: '#94A3B8',
      flex: 1,
    },
    rowValue: {
      fontFamily: fontFamily.medium,
      fontSize: fontSizes.F13,
      color: '#1E293B',
      flex: 2,
      textAlign: 'right',
    },
    formBadge: {
      paddingHorizontal: N_8,
      paddingVertical: N_4,
      borderRadius: moderateScale(6),
    },
    formBadgeTablet: {
      backgroundColor: '#DBEAFE',
    },
    formBadgeCapsule: {
      backgroundColor: '#EDE9FE',
    },
    formBadgeSyrup: {
      backgroundColor: '#DCFCE7',
    },
    formBadgeText: {
      fontSize: fontSizes.F12,
      fontFamily: fontFamily.semiBold,
    },
    formBadgeTextTablet: {
      color: '#1D4ED8',
    },
    formBadgeTextCapsule: {
      color: '#7C3AED',
    },
    formBadgeTextSyrup: {
      color: '#15803D',
    },
    timeChipsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: N_8,
      justifyContent: 'flex-end',
      flex: 2,
    },
    timeChip: {
      backgroundColor: '#F1F5F9',
      paddingHorizontal: N_8,
      paddingVertical: N_4,
      borderRadius: moderateScale(6),
    },
    timeChipText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSizes.F11,
      color: '#475569',
    },
    clinicalText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSizes.F13,
      color: '#475569',
      lineHeight: fontSizes.F13 * 1.6,
      flex: 2,
      textAlign: 'right',
    },
  });
};
