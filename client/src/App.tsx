import { Route, Routes } from "react-router-dom";
import "./App.css";
import CartPage from "./pages/CartPage/CartPage";
import OrderConfirmPage from "./pages/OrderConfirmPage/OrderConfirmPage";
import { CartProvider } from "./pages/CartPage/CartContext";
import { CartSelectionProvider } from "./pages/CartPage/CartSelectionContext";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";

function App() {
  return (
    <Routes>
      <Route
        path="cart"
        element={
          <CartProvider cartId={1}>
            <CartSelectionProvider>
              <CartPage />
            </CartSelectionProvider>
          </CartProvider>
        }
      />
      <Route path="checkout/:checkoutId" element={<CheckoutPage />} />
      <Route path="cart/order-confirm" element={<OrderConfirmPage />} />
    </Routes>
  );
}

export default App;
