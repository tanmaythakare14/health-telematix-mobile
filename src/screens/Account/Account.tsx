import React from 'react';
import { View } from 'react-native';
import { Header, ReusableButton } from 'components';
import { SafeAreaView } from 'react-native-safe-area-context';
import useViewModel from './Account.viewmodel';

const Account = () => {
  const { styles, t, isDark, handleChangeTheme, handleChangeLanguage, handleLogout } = useViewModel();

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Header title={t('account.title')} />
        <View style={styles.item}>
          <ReusableButton
            title={isDark ? t('account.button.theme.light') : t('account.button.theme.dark')}
            onPress={handleChangeTheme}
            style={styles.btnStyle}
          />
          <ReusableButton
            title={t('account.button.language.english')}
            onPress={() => handleChangeLanguage('en')}
            style={styles.btnStyle}
          />
          <ReusableButton
            title={t('account.button.language.spanish')}
            onPress={() => handleChangeLanguage('spanish')}
            style={styles.btnStyle}
          />
          <ReusableButton
            title={t('account.button.logout')}
            onPress={handleLogout}
            style={styles.btnStyle}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Account;
