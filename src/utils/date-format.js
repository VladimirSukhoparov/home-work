/**
 * Форматирует дату в строку вида "DD month YYYY в HH:MM"
 * @returns string
 */
export function formatDate(str) {
  const newDate = new Date(str);
  const optionsDate = {day: '2-digit', month: 'long', year: 'numeric'}
  const optionsTime = {hour: "numeric", minute: "numeric"}
  const date = new Intl.DateTimeFormat('ru-RU', optionsDate).format(newDate).slice(0, -3);
  const time = new Intl.DateTimeFormat('ru-RU', optionsTime).format(newDate);
  return `${date} в ${time}`;
}
