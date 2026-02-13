import { useCart } from '../../context/CartContext';
import './CartItem.css';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="cart-item">
      {item.thumbnail && (
        <img src={item.thumbnail} alt="Upload" className="cart-thumb" />
      )}
      <div className="cart-item-details">
        <h4>{item.serviceName}</h4>
        <p>
          {item.frameSizeLabel} &middot; {item.frameColorLabel} frame
        </p>
        <p className="cart-item-file">{item.fileName}</p>
      </div>
      <div className="cart-item-qty">
        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
      </div>
      <div className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</div>
      <button className="cart-item-remove" onClick={() => removeItem(item.id)} title="Remove">
        &times;
      </button>
    </div>
  );
}
