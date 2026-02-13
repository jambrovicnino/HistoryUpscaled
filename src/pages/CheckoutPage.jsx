import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useCart } from '../context/CartContext';
import OrderSummary from '../components/checkout/OrderSummary';
import PayPalCheckout from '../components/checkout/PayPalCheckout';
import './CheckoutPage.css';

const PAYPAL_OPTIONS = {
  'client-id': 'test',
  currency: 'USD',
};

export default function CheckoutPage() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleSuccess = (ref) => {
    navigate('/confirmation', { state: { ref } });
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page container checkout-empty">
        <h2>Nothing to checkout</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <PayPalScriptProvider options={PAYPAL_OPTIONS}>
      <div className="checkout-page container">
        <h1>Checkout</h1>
        <div className="checkout-layout">
          <OrderSummary />
          <PayPalCheckout onSuccess={handleSuccess} />
        </div>
      </div>
    </PayPalScriptProvider>
  );
}
