import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Basket from "./components/basket";
import Item from "./components/item";


/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const basket = store.getState().basket;
  const sum = store.getState().sum;
  const counter = store.getState().counter;
  const [isOpen, setIsOpen] = useState(false);

  const callbacks = {
    addBasket: useCallback(
      (id) => {
        store.addBasket(id);
      },
      [basket]
    ),
    deleteBasket: useCallback(
      (item) => {
        store.deleteBasket(item);
      },
      [basket]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        caption={"Перейти"}
        basket={basket}
        title={"В корзине:"}
        setIsOpen={setIsOpen}
        counter={counter}
        sum={sum}
      />
      <List
        children={list.map((item) => (
          <Item item={item} onAddBasket={callbacks.addBasket} />
        ))}
      />
      {isOpen && (
        <Modal
          children={
            <Basket
              basket={basket}
              setIsOpen={setIsOpen}
              sum={sum}
              onDeleteBasket={callbacks.deleteBasket}
            />
          }
        />
      )}
    </PageLayout>
  );
}

export default App;
