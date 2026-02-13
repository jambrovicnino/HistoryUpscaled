import services from '../../data/services';
import ServiceCard from './ServiceCard';
import './ServicesSection.css';

export default function ServicesSection() {
  return (
    <section id="services" className="services">
      <div className="container">
        <h2 className="section-title">Our Premium Services</h2>
        <p className="section-subtitle">
          Choose the perfect restoration option for your cherished memories
        </p>
        <div className="services-grid">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
