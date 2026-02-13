import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import './CartPage.css';

export default function CartPage() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-page container cart-empty">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any items yet.</p>
        <Link to="/" className="cta-button">Browse Services</Link>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h1>Shopping Cart</h1>
      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <CartSummary />
      </div>
    </div>
  );
}
