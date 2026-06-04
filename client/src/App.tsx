import { Route, Routes } from "react-router-dom";
import "./App.css";
import CartPage from "./pages/CartPage/CartPage";
import OrderConfirmPage from "./pages/OrderConfirmPage/OrderConfirmPage";

function App() {
  return (
    <Routes>
      <Route path="cart" element={<CartPage cartId={1}></CartPage>} />
      <Route path="cart/order-confirm" element={<OrderConfirmPage />} />
    </Routes>
  );
}

export default App;
