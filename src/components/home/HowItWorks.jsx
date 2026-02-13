import './HowItWorks.css';

const steps = [
  { num: 1, title: 'Choose Your Service', text: 'Select the restoration option that best fits your photo.' },
  { num: 2, title: 'Upload Your Photo', text: 'Securely upload your digital photo for processing.' },
  { num: 3, title: 'AI Enhancement', text: 'Our advanced AI restores and enhances your image to perfection.' },
  { num: 4, title: 'Premium Framing', text: 'Your restored portrait arrives in a museum-quality frame.' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-grid">
          {steps.map((s) => (
            <div className="step" key={s.num}>
              <div className="step-number">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
