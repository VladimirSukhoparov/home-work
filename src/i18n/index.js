import * as translations from './translations';

class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.lang = config.defaultLang || 'ru';
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  getLang() {
    return this.lang;
  }

  setLang(value) {
    this.lang = value;
    this.services.api.setHeader('Accept-Language', value);
    for (const listener of this.listeners) {
      listener(this.lang);
    }
  }

  translate(text, lang, plural) {
    if (!lang) {
      lang = this.lang;
    }
    let result =
      translations[lang] && text in translations[lang]
        ? translations[lang][text]
        : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }
}

export default I18nService;
