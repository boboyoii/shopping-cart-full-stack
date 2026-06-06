import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartItemListPage from './CartPage';
import OrderConfirmPage from './OrderConfirmPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CartItemListPage />} />
        <Route path="/order-confirm" element={<OrderConfirmPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
