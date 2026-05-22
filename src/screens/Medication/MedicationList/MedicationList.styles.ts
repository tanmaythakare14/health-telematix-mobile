import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'utils/Dimensions';
import { fontFamily, fontSizes } from 'utils/FontUtils';
import { M_16, M_12, M_8, M_4, V_15, N_8, N_12, N_4 } from 'utils/SizeUtility';

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
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
    headerTitle: {
      fontFamily: fontFamily.bold,
      fontSize: fontSizes.F20,
      color: '#1A1A2E',
      letterSpacing: -0.3,
    },
    addButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#0077b6',
      paddingHorizontal: M_12,
      paddingVertical: verticalScale(7),
      borderRadius: moderateScale(20),
      gap: M_4,
    },
    addButtonText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSizes.F12,
      color: '#FFFFFF',
    },
    addIcon: {
      fontFamily: fontFamily.bold,
      fontSize: fontSizes.F16,
      color: '#FFFFFF',
      lineHeight: fontSizes.F16 + 2,
    },
    tabRow: {
      flexDirection: 'row',
      paddingHorizontal: M_16,
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F5',
    },
    tab: {
      paddingVertical: verticalScale(12),
      marginRight: moderateScale(28),
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    tabActive: {
      borderBottomColor: '#0077b6',
    },
    tabText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSizes.F14,
      color: '#9CA3AF',
    },
    tabTextActive: {
      fontFamily: fontFamily.semiBold,
      color: '#0077b6',
    },
    listContent: {
      paddingHorizontal: M_16,
      paddingTop: verticalScale(16),
      paddingBottom: verticalScale(100),
    },
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: moderateScale(14),
      marginBottom: verticalScale(12),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 8,
      elevation: 3,
      flexDirection: 'row',
      overflow: 'hidden',
    },
    cardAccent: {
      width: moderateScale(5),
      backgroundColor: '#0077b6',
    },
    cardAccentPast: {
      backgroundColor: '#CBD5E1',
    },
    cardBody: {
      flex: 1,
      paddingVertical: verticalScale(14),
      paddingHorizontal: M_12,
    },
    cardTopRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: verticalScale(6),
    },
    cardNameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      gap: N_8,
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
      fontSize: fontSizes.F10,
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
    drugName: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSizes.F15,
      color: '#1A1A2E',
      flex: 1,
    },
    statusBadge: {
      paddingHorizontal: N_8,
      paddingVertical: N_4,
      borderRadius: moderateScale(6),
    },
    statusActive: {
      backgroundColor: '#DCFCE7',
    },
    statusCompleted: {
      backgroundColor: '#F1F5F9',
    },
    statusInactive: {
      backgroundColor: '#FEE2E2',
    },
    statusText: {
      fontSize: fontSizes.F10,
      fontFamily: fontFamily.semiBold,
    },
    statusTextActive: {
      color: '#15803D',
    },
    statusTextCompleted: {
      color: '#64748B',
    },
    statusTextInactive: {
      color: '#DC2626',
    },
    cardMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(4),
      marginBottom: verticalScale(2),
    },
    cardMetaLabel: {
      fontFamily: fontFamily.regular,
      fontSize: fontSizes.F12,
      color: '#94A3B8',
    },
    cardMetaValue: {
      fontFamily: fontFamily.medium,
      fontSize: fontSizes.F12,
      color: '#475569',
    },
    cardDot: {
      width: moderateScale(3),
      height: moderateScale(3),
      borderRadius: moderateScale(2),
      backgroundColor: '#CBD5E1',
    },
    cardArrow: {
      justifyContent: 'center',
      paddingRight: M_12,
      paddingLeft: M_8,
    },
    cardArrowText: {
      fontSize: fontSizes.F16,
      color: '#CBD5E1',
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: verticalScale(80),
    },
    emptyIcon: {
      fontSize: moderateScale(52),
      marginBottom: verticalScale(16),
    },
    emptyTitle: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSizes.F16,
      color: '#1A1A2E',
      marginBottom: verticalScale(6),
    },
    emptySubtitle: {
      fontFamily: fontFamily.regular,
      fontSize: fontSizes.F13,
      color: '#94A3B8',
      textAlign: 'center',
    },
  });
};
