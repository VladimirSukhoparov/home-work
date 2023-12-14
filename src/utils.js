/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = "ru-RU") {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || "";
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = "ru-RU", options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/* export function categoryFormat(categories) {
  let result = [];

  function sortCategory(arr) {
    for (let item of arr) {
      if (!item.parent) {
        item.value = item._id;
        result.push(item);
      } else {
        if (
          result.find(
            (el) =>
              el._id === item.parent._id &&
              el.parent !== null &&
              el.title.includes("- - ")
          )
        ) {
          item.title = "- - - " + item.title;
          item.value = item._id;
          result.splice(
            result.indexOf(
              result.find(
                (el) =>
                  el._id === item.parent._id &&
                  el.parent !== null &&
                  el.title.includes("- - ")
              )
            ) + 1,
            0,
            item
          );
        } else if (
          result.find(
            (el) =>
              el._id === item.parent._id &&
              el.parent !== null &&
              el.title.includes("- ")
          )
        ) {
          item.value = item._id;
          item.title = "- - " + item.title;
          result.splice(
            result.indexOf(
              result.find(
                (el) =>
                  el._id === item.parent._id &&
                  el.parent !== null &&
                  el.title.includes("- ")
              )
            ) + 1,
            0,
            item
          );
        } else if (
          result.find((el) => el._id === item.parent._id && el.parent === null)
        ) {
          item.value = item._id;
          item.title = "- " + item.title;
          result.push(item);
        }
      }
    }
  }

  sortCategory(categories);
  return result;
} */

export function categoryFormat(arr) {
  let result = [];
  let parent = [];
  let child = [];

  for (let item of arr) {
    item.parent ? child.push(item) : parent.push(item);
  }

  const sortArr = (el, repeat = 0, prefix = "- ") => {
    if (parent === undefined) return;
    el.value = el._id;
    el.title = prefix.repeat(repeat) + el.title;
    result.push(el);

    child.forEach((child) => {
      if (child.parent._id === el._id) {
        sortArr(child, repeat + 1);
      }
    });
  };

  parent.forEach((item) => sortArr(item));

  return result;
}
