import { useTranslation } from 'react-i18next';

export function useLocalized() {
    const { i18n } = useTranslation();
    const lang = i18n.resolvedLanguage || i18n.language;

    // field-ը կարող է լինել {hy,en,ru} օբյեկտ կամ հին string
    return (field) => {
        if (field == null) return '';
        if (typeof field === 'string') return field;
        return field[lang] || field.hy || '';
    };
}