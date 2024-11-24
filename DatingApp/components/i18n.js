import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import ngôn ngữ
import vi from './locales/vi.json';
import en from './locales/en.json';

const resources = {
  en: { translation: en },
  vi: { translation: vi },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'vi', // Ngôn ngữ mặc định
    fallbackLng: 'en', // Ngôn ngữ dự phòng nếu không tìm thấy bản dịch
    interpolation: {
      escapeValue: false, // React đã tự escape HTML
    },
  });

export default i18n;
