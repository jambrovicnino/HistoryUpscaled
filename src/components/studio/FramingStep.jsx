import FramePreview from './FramePreview';
import { displaySizes, frameStyles, getPrice, getSizeLabel } from '../../data/frameOptions';
import './FramingStep.css';

export default function FramingStep({
  image,
  selectedFrame,
  setSelectedFrame,
  selectedSize,
  setSelectedSize,
  withFrame,
  setWithFrame,
  dedication,
  setDedication,
  onAddToCart,
}) {
  const currentPrice = getPrice(selectedSize, withFrame, selectedFrame);
  const sizeLabel = getSizeLabel(selectedSize);

  return (
    <div className="framing-step">
      {/* Left — Frame preview */}
      <div className="framing-preview">
        <FramePreview
          image={image}
          selectedFrame={selectedFrame}
          selectedSize={sizeLabel}
          sizeId={selectedSize}
          withFrame={withFrame}
        />
      </div>

      {/* Right — Controls */}
      <div className="framing-controls">
        {/* Dedication */}
        <div className="framing-section">
          <label className="framing-label">POSVETILO</label>
          <div className="dedication-input-wrap">
            <input
              type="text"
              className="dedication-input"
              placeholder="Zapišite svoje posvetilo..."
              value={dedication}
              onChange={(e) => setDedication(e.target.value)}
            />
            <span className="dedication-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 19l7-7 3 3-7 7-3-3z" />
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                <path d="M2 2l7.586 7.586" />
                <circle cx="11" cy="11" r="2" />
              </svg>
            </span>
          </div>
        </div>

        {/* Frame selection */}
        <div className="framing-section">
          <label className="framing-label">OKVIR</label>
          <div className="frame-toggle">
            <button
              className={`toggle-btn ${withFrame ? 'active' : ''}`}
              onClick={() => setWithFrame(true)}
            >
              Z okvirjem
            </button>
            <button
              className={`toggle-btn ${!withFrame ? 'active' : ''}`}
              onClick={() => setWithFrame(false)}
            >
              Brez okvirja
            </button>
          </div>

          {withFrame && (
            <div className="frame-options">
              {frameStyles.map((frame) => (
                <button
                  key={frame.id}
                  className={`frame-option ${selectedFrame === frame.id ? 'selected' : ''}`}
                  onClick={() => setSelectedFrame(frame.id)}
                  title={`${frame.label} — ${frame.profileDimensions}`}
                >
                  <div className="frame-thumb">
                    <img
                      src={frame.stripImage}
                      alt={frame.label}
                      className="frame-thumb-img"
                    />
                  </div>
                  <span className="frame-option-label">{frame.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Size selection */}
        <div className="framing-section">
          <label className="framing-label">DIMENZIJE</label>
          <div className="size-options">
            {displaySizes.map((size) => (
              <button
                key={size.id}
                className={`size-option ${selectedSize === size.id ? 'selected' : ''}`}
                onClick={() => setSelectedSize(size.id)}
              >
                <span className="size-name">{size.displayName}</span>
                <span className="size-dims">{size.dimensions}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="framing-section">
          <label className="framing-label">SKUPAJ</label>
          <div className="framing-price">
            <span className="price-amount">{currentPrice} €</span>
            <span className="price-note">z DDV</span>
          </div>
        </div>

        {/* Add to cart */}
        <button className="btn-gold-large" onClick={onAddToCart}>
          DODAJ V KOŠARICO
        </button>
      </div>
    </div>
  );
}
