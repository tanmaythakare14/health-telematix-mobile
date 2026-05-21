import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { useTheme } from 'contexts/ThemeContext';
import useTypedSelector from 'hooks/useTypedSelector';
import { AUTH_STACK_NAVIGATOR } from 'navigators/routes';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/app/store';
import { Home } from 'screens';
import useViewModel from 'screens/Home/Home.viewmodel';
import { AuthStackParamList } from 'types/types';

// Mock navigation to allow useNavigation to be stubbed in tests
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

type HomeScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'HOME'>;

jest.mock('screens/Home/Home.viewmodel', () => jest.fn());

jest.mock('contexts/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

jest.mock('../src/redux/reducer/DashboardSlice', () => ({
  getMoviesData: jest.fn(() => ({ type: 'dashboard/getMoviesData' })),
}));

describe('Home Screen', () => {
  let mockDispatch: jest.Mock;
  let mockNavigation: Partial<HomeScreenNavigationProp>;
  let mockToggleSwitch: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock Redux dispatch
    mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch as AppDispatch);

    // Mock navigation
    mockNavigation = { navigate: jest.fn() } as Partial<HomeScreenNavigationProp>;
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);

    // Mock ViewModel
    mockToggleSwitch = jest.fn();
    (useViewModel as jest.Mock).mockReturnValue({
      styles: {
        container: {},
        safeView: {},
        listMain: {},
        listView: {},
        image: {},
        subText: {},
        dashboardFlatListSeparator: {},
      },
      t: (key: string) => key, // Mock translation function
      isEnabled: false,
      toggleSwitch: mockToggleSwitch,
    });

    // Mock Theme
    (useTheme as jest.Mock).mockReturnValue({
      themeColors: {
        primary: { 10: 'lightblue', 50: 'gray', 90: 'blue' },
        secondary: 'white',
      },
    });

    // Mock Redux Selector
    (useTypedSelector as jest.Mock).mockReturnValue({
      movieData: [
        {
          id: 1,
          name: 'Movie 1',
          publisher: 'Marvel',
          firstappearance: '2022',
          imageurl: 'https://example.com/movie1.jpg',
        },
      ],
    });
  });

  test('renders Home screen correctly', () => {
    const { getByText } = render(<Home />);
    expect(getByText('dashboard.list.title')).toBeTruthy();
  });

  test('dispatches getMoviesData on mount', async () => {
    render(<Home />);
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'dashboard/getMoviesData' });
    });
  });

  test('displays movies in FlatList', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Movie 1')).toBeTruthy();
    expect(getByText('Marvel')).toBeTruthy();
    expect(getByText('2022')).toBeTruthy();
  });

  test('navigates to details when movie is pressed', () => {
    const { getByText } = render(<Home />);
    fireEvent.press(getByText('Movie 1'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith(AUTH_STACK_NAVIGATOR.HOME_DETAILS, {
      data: {
        id: 1,
        name: 'Movie 1',
        publisher: 'Marvel',
        firstappearance: '2022',
        imageurl: 'https://example.com/movie1.jpg',
      },
    });
  });
});
