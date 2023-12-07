import StoreModule from "../module";

class Article extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      item: {},
    };
  }

  async load(_id) {
    const response = await fetch(
      `/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        item: json.result,
      },
      "Загружен товар из АПИ"
    );
  }
}

export default Article;
