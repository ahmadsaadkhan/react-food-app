import { useState } from 'react'
import Cart from './Components/Cart/Cart';

import Header from "./Components/Layout/Header";
import Meals from './Components/Meals/Meals';
import CartProvider from './Store/cart-provider';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
      setCartIsShown(true);
  }
  const hideCartHandler = () => {
      setCartIsShown(false);
  }
  return (
    <CartProvider>
      {cartIsShown && <Cart onHideCart={hideCartHandler} /> }
      <Header onShowCart={showCartHandler} />
      <Meals />
    </CartProvider>
  );
}

export default App;
