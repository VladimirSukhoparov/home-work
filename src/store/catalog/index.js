import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      pageCount: 1,
    };
  }

  async load(n = 0) {
    const response = await fetch(
      `/api/v1/articles?limit=10&skip=${
        (n - 1) * 10
      }&fields=items(_id, title, price),count`
    );
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        pageCount: Math.ceil(json.result.count / 10),
      },
      "Загружены товары из АПИ"
    );
  }

  switchPage(pageNumber) {
    this.setState(
      {
        ...this.getState(),
        currentPage: pageNumber,
      },
      "Переключение номера страницы"
    );
  }
}

export default Catalog;
