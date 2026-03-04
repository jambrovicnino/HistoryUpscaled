import { frameStyles } from '../../data/frameOptions';
import './FramePreview.css';

// Izračunaj razmerje stranic iz sizeId (npr. "40x50" → 4/5 = 0.8)
function getAspectRatio(sizeId) {
  if (!sizeId) return 4 / 5; // privzeto
  const parts = sizeId.split('x').map(Number);
  if (parts.length !== 2 || !parts[0] || !parts[1]) return 4 / 5;
  return parts[0] / parts[1]; // širina / višina
}

// Sestavi border stil iz frame strip slike + CSS fallback
function getFrameStyle(frame) {
  if (!frame) return {};

  const borderWidth = frame.borderWidth || 16;

  // Uporabi strip sliko kot border-image z CSS gradient fallbackom
  return {
    borderWidth: `${borderWidth}px`,
    borderStyle: 'solid',
    borderImageSource: `url(${frame.stripImage})`,
    borderImageSlice: '100 fill',
    borderImageRepeat: 'stretch',
    boxShadow: frame.cssStyle?.boxShadow || 'inset 0 0 8px rgba(0,0,0,0.3), 0 4px 20px rgba(0,0,0,0.5)',
  };
}

export default function FramePreview({
  image,
  selectedFrame,
  selectedSize,
  sizeId,
  withFrame,
}) {
  const frame = frameStyles.find((f) => f.id === selectedFrame);
  const aspectRatio = getAspectRatio(sizeId);
  const frameStyle = withFrame ? getFrameStyle(frame) : {};

  return (
    <div className="frame-preview-wrap">
      <div
        className={`frame-preview ${withFrame ? 'has-frame' : ''}`}
        style={frameStyle}
      >
        <div
          className="frame-preview-canvas"
          style={{ aspectRatio: `${aspectRatio}` }}
        >
          <img
            src={image}
            alt="Predogled"
            className="frame-preview-image"
          />
        </div>
      </div>

      {selectedSize && (
        <p className="frame-preview-size">
          PREDOGLED VELIKOSTI: {selectedSize}
        </p>
      )}
    </div>
  );
}
