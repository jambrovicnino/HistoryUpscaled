import { Link, useLocation } from 'react-router-dom';
import './ConfirmationPage.css';

export default function ConfirmationPage() {
  const { state } = useLocation();
  const ref = state?.ref || 'HU-XXXXXX';

  return (
    <div className="confirmation-page container">
      <div className="confirmation-card">
        <div className="confirmation-icon">&#10003;</div>
        <h1>Order Confirmed!</h1>
        <p className="confirmation-ref">Reference: <strong>{ref}</strong></p>
        <p>
          Thank you for your order. We'll begin working on your photos right away.
          You'll receive an email confirmation shortly.
        </p>
        <Link to="/" className="cta-button">Return Home</Link>
      </div>
    </div>
  );
}
