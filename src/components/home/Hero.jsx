import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Upscale Your History</h1>
          <p className="hero-subtitle">
            Transform your old photos into stunning, premium framed portraits with AI
          </p>
          <Link to="/#services" className="cta-button">Get Started</Link>
        </div>
      </div>
    </section>
  );
}
