/* eslint-disable @typescript-eslint/no-unused-expressions */
import { CommonActions, Route, StackActions, TabActions } from '@react-navigation/native';
import { isEmptyOrNull } from 'utils/ValidationUtils';
import { navigationRef } from './RootStackNavigator';

interface NavigationFunctions {
  navigate: (routeName: string, params?: object) => void;
  replace: (routeName: string, params?: object) => void;
  goBack: () => void;
  reset: (routeName: string, params?: object) => void;
  popToTop: (count?: number) => void;
  jumpTo: (routeName: string, params?: object) => void;
  getCurrentRoute: () => Route<string> | undefined;
}

export const NavigationService: NavigationFunctions = {
  navigate: (routeName: string, params?: object): void => {
    navigationRef.current && navigationRef.current.navigate(routeName, params);
  },
  replace: (routeName: string, params?: object): void => {
    navigationRef.current && navigationRef.current.dispatch(StackActions.replace(routeName, params));
  },
  goBack: (): void => {
    navigationRef.current && navigationRef.current.goBack();
  },
  reset: (routeName: string, params?: object): void => {
    navigationRef.current &&
      navigationRef.current.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: routeName, params }],
        }),
      );
  },
  popToTop: (count?: number): void => {
    if (isEmptyOrNull(String(count))) {
      navigationRef.current && navigationRef.current.dispatch(StackActions.popToTop());
    } else {
      navigationRef.current && navigationRef.current.dispatch(StackActions.pop(count));
    }
  },
  jumpTo: (routeName: string, params?: object): void => {
    navigationRef.current && navigationRef.current.dispatch(TabActions.jumpTo(routeName, params));
  },
  getCurrentRoute: (): Route<string> | undefined => {
    let navigator = navigationRef.current;
    let currentRoute = navigator?.getCurrentRoute();
    return currentRoute;
  },
};
