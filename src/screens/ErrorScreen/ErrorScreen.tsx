import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import useViewModel from './ErrorScreen.viewmodel';

const ErrorScreen = () => {
  const { styles, t, handleTryAgain } = useViewModel();

  return (
    <View style={styles.safeView}>
      <StatusBar />
      <TouchableOpacity
        style={styles.container}
        disabled={true}
      >
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.title}>{t('error.screen.title')}</Text>
        <Text style={styles.message}>{t('error.screen.message')}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleTryAgain}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>{t('error.screen.button.tryAgain')}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorScreen;
