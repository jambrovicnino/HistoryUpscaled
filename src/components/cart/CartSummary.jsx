import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartSummary.css';

export default function CartSummary() {
  const { subtotal } = useCart();

  return (
    <div className="cart-summary">
      <h3>Order Summary</h3>
      <div className="summary-row">
        <span>Subtotal</span>
        <span className="summary-price">${subtotal.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Shipping</span>
        <span className="summary-free">FREE</span>
      </div>
      <hr />
      <div className="summary-row total">
        <span>Total</span>
        <span className="summary-price">${subtotal.toFixed(2)}</span>
      </div>
      <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
    </div>
  );
}
