import StoreModule from "../module";

class Locale extends StoreModule {
  initState() {
    return {
      lang: "ru",
    };
  }

  changeLang(lang) {
    this.setState({ lang }, `Изменение языка`);
  }
}

export default Locale;
