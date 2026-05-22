import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LayoutDashboard, ClipboardList, Pill, Cpu } from 'lucide-react-native';
import Home from 'screens/Home/Home';
import CarePlan from 'screens/CarePlan/CarePlan';
import Devices from 'screens/Devices/Devices';
import { HomeTabParamList } from 'types/types';
import { HOME_TAB_NAVIGATOR } from './routes';
import MedicationStackNavigator from './MedicationStackNavigator';

const Tab = createBottomTabNavigator<HomeTabParamList>();

const TAB_ACTIVE   = '#1A2D45';
const TAB_INACTIVE = '#94A3B8';
const ICON_SIZE    = 22;

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: TAB_ACTIVE,
        tabBarInactiveTintColor: TAB_INACTIVE,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
      }}>

      <Tab.Screen
        name={HOME_TAB_NAVIGATOR.HOME}
        component={Home}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <LayoutDashboard size={ICON_SIZE} color={color} strokeWidth={2} />
          ),
        }}
      />

      <Tab.Screen
        name={HOME_TAB_NAVIGATOR.CARE_PLAN}
        component={CarePlan}
        options={{
          tabBarLabel: 'Care Plan',
          tabBarIcon: ({ color }) => (
            <ClipboardList size={ICON_SIZE} color={color} strokeWidth={2} />
          ),
        }}
      />

      <Tab.Screen
        name={HOME_TAB_NAVIGATOR.MEDICATION}
        component={MedicationStackNavigator}
        options={{
          tabBarLabel: 'Medication',
          tabBarIcon: ({ color }) => (
            <Pill size={ICON_SIZE} color={color} strokeWidth={2} />
          ),
        }}
      />

      <Tab.Screen
        name={HOME_TAB_NAVIGATOR.DEVICES}
        component={Devices}
        options={{
          tabBarLabel: 'Devices',
          tabBarIcon: ({ color }) => (
            <Cpu size={ICON_SIZE} color={color} strokeWidth={2} />
          ),
        }}
      />

    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F4F8',
    height: Platform.OS === 'ios' ? 82 : 62,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingTop: 8,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabItem: {
    paddingTop: 2,
  },
  tabLabel: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    marginTop: 2,
  },
});

export default HomeTabNavigator;
