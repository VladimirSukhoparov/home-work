import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
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

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление в корзину
   */
  addBasket(id) {
    if (this.state.basket.find((el) => el.id === id)) {
      this.setState({
        ...this.state,
        basket: this.state.basket.map((el) => {
          if (el.id === id) {
            el.count = el.count + 1;
          }
          return el;
        }),
        sum:
          this.state.sum + this.state.basket.find((el) => el.id === id).price,
        counter: this.state.counter,
      });
    } else {
      this.setState({
        ...this.state,
        basket: [
          ...this.state.basket,
          { ...this.state.list.find((el) => el.id === id), count: 1 },
        ],
        sum: this.state.sum + this.state.list.find((el) => el.id === id).price,
        counter: this.state.counter + 1,
      });
    }
  }

  /**
   * Удаление товара
   * @param item
   */
  deleteBasket(item) {
    this.setState({
      ...this.state,
      basket: this.state.basket.filter((el) => el.id !== item.id),
      sum:this.state.sum - item.count*item.price,
      counter:this.state.counter - 1
    });
  }
}

export default Store;
