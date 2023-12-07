import { memo, useCallback, useEffect } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import LocaleSwitcher from "../../components/locale-switcher";
import useLocale from "../../store/use-locale";
import NavBar from "../../components/nav-bar";

function Main() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    pageCount: state.catalog.pageCount,
    lang: state.locale.lang,
  }));

  useEffect(() => {
    store.actions.catalog.load(select.currentPage);
  }, [select.currentPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    switchPage: useCallback(
      (pageNumber) => store.actions.catalog.switchPage(pageNumber),
      [store]
    ),
    changeLang: useCallback(
      (e) => store.actions.locale.changeLang(e),
      [select.lang]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} id={item._id} url={'/article/'} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
  };
  const translation = useLocale();

  return (
    <PageLayout>
      <Head title={translation("storeTitle")}>
        <LocaleSwitcher changeLang={callbacks.changeLang} lang={select.lang} />
      </Head>
      <NavBar
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        switchPage={callbacks.switchPage}
      />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        currentPage={select.currentPage}
        pageCount={select.pageCount}
        switchPage={callbacks.switchPage}
      />
    </PageLayout>
  );
}

export default memo(Main);
