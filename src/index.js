import React from 'react';
import {createRoot} from 'react-dom/client';
import {generateCode} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    { id: generateCode(), title: "Название товара", price: 100 },
    { id: generateCode(), title: "Книга про React", price: 770 },
    { id: generateCode(), title: "Конфета", price: 33 },
    { id: generateCode(), title: "Трактор", price: 7955320 },
    { id: generateCode(), title: "Телефон iPhone XIXV", price: 120000 },
    { id: generateCode(), title: "Карандаши цветные", price: 111 },
    { id: generateCode(), title: "Товар сюрприз", price: 0 },
  ],
  basket: [],
  sum: 0,
  counter: 0
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
