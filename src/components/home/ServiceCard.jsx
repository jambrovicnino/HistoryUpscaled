import { Link } from 'react-router-dom';
import './ServiceCard.css';

export default function ServiceCard({ service }) {
  const { id, name, icon, description, features, basePrice, badge, cardClass } = service;

  return (
    <div className={`service-card ${cardClass}`}>
      {badge && (
        <span className={`badge ${cardClass === 'premium' ? 'premium-badge' : ''}`}>
          {badge}
        </span>
      )}
      <div className="service-icon">{icon}</div>
      <h3>{name}</h3>
      <p>{description}</p>
      <ul className="service-features">
        {features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <div className="service-price">From ${basePrice}</div>
      <Link to={`/service/${id}`} className="select-service-btn">Select Service</Link>
    </div>
  );
}
