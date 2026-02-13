import { useCart } from '../../context/CartContext';
import './OrderSummary.css';

export default function OrderSummary() {
  const { cart, subtotal } = useCart();

  return (
    <div className="order-summary">
      <h3>Your Order</h3>
      <div className="order-items">
        {cart.map((item) => (
          <div className="order-item" key={item.id}>
            <div className="order-item-info">
              <span className="order-item-name">{item.serviceName}</span>
              <span className="order-item-meta">
                {item.frameSizeLabel} &middot; {item.frameColorLabel}
              </span>
            </div>
            <span className="order-item-qty">x{item.quantity}</span>
            <span className="order-item-price">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <hr />
      <div className="order-total">
        <span>Total</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
    </div>
  );
}
