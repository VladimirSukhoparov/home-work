import { useState, useMemo, useLayoutEffect } from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18n = useServices().i18n;
  const api = useServices().api;

  const [lang, setLang] = useState(i18n.getLang());
  const t = i18n.translate.bind(i18n);

  const changeLang = (value) => {
    setLang(value);
    i18n.setLang(value);
  };

  const unsubscribe = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return i18n.subscribe((value) => {
      setLang(value);
    });
  }, []); // Нет зависимостей - исполнится один раз

  // Отписка от store при демонтировании компонента
  useLayoutEffect(() => unsubscribe, [unsubscribe]);

  return { lang, changeLang, t };
}
