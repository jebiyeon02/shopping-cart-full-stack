import { Route, Routes } from "react-router-dom";
import "./App.css";
import CartPage from "./pages/CartPage/CartPage";
import OrderConfirmPage from "./pages/OrderConfirmPage/OrderConfirmPage";
import { CartProvider } from "./pages/CartPage/CartContext";
import { CheckedProductProvider } from "./pages/CartPage/CheckedProductContext";

function App() {
  return (
    <Routes>
      <Route
        path="cart"
        element={
          <CartProvider cartId={1}>
            <CheckedProductProvider>
              <CartPage cartId={1} />
            </CheckedProductProvider>
          </CartProvider>
        }
      />
      <Route path="cart/order-confirm" element={<OrderConfirmPage />} />
    </Routes>
  );
}

export default App;
