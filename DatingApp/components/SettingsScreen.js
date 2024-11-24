import React from 'react';
import { View, Button } from 'react-native';
import { useTranslation } from 'react-i18next';

const SettingsScreen = () => {
  const { t,i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // Thay đổi ngôn ngữ
  };

  return (
    <View>
      <Button title={t('Switch to Vietnamese')} onPress={() => changeLanguage('vi')} />
      <Button title={t('Switch to English')} onPress={() => changeLanguage('en')} />
    </View>
  );
};

export default SettingsScreen;
