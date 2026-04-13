/* eslint-disable import/no-named-as-default-member */
import { initReactI18next } from 'react-i18next';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

void i18next
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // debug: Boolean(process.env.debug),
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18next;
