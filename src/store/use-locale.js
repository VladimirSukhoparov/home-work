import useSelector from "./use-selector";
import useStore from "./use-store";
import rus from "../locales/ru.json";
import eng from "../locales/en.json";
/**
 * Хук для изменения языка страницы
 * @return {Function}
 */
export default function useLocale() {
  const lang = useSelector((state) => state.locale.lang);
  if (lang === "ru") {
    return function (key) {
      return rus[key];
    };
  } else {
    return function (key) {
      return eng[key];
    };
  }
}
