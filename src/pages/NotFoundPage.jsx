import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '6rem 0' }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--dark)' }}>404</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Page not found</p>
      <Link to="/" className="cta-button">Go Home</Link>
    </div>
  );
}
