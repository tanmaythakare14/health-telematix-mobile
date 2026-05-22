import {ThemeOptions} from '../types/types';

export const colors = {
  [ThemeOptions.dark]: {
    primary: {
      [10]: '#4A6FA5',
      [50]: '#1A2D45',
      [90]: '#0D1825',
    },
    secondary: '#caf0f8',
    background: '#000814',
    headerBackground: '#001d3d',
    error: '#c1121f',
    text: '#ffffff',
    inputValue: '#ffffff',
    inputPlaceholder: '#b0b0b0',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    inputBorder: '#1a2a3a',
    surface: '#0d1b2a',
    otpFilledBg: '#001d3d',
  },
  [ThemeOptions.light]: {
    primary: {
      [10]: '#4A6FA5',
      [50]: '#1A2D45',
      [90]: '#0D1825',
    },
    secondary: '#caf0f8',
    background: '#f8f9fa',
    headerBackground: '#ffffff',
    error: '#c1121f',
    text: '#212529',
    inputValue: '#212529',
    inputPlaceholder: '#6c757d',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    inputBorder: '#e5e7eb',
    surface: '#ffffff',
    otpFilledBg: '#eff6ff',
  },
};
