import { useRef, useState } from 'react';
import './PhotoUploader.css';

export default function PhotoUploader({ preview, onFileSelect }) {
  const inputRef = useRef();
  const [dragging, setDragging] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      alert('File too large. Max 50 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => onFileSelect(e.target.result, file.name);
    reader.readAsDataURL(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = (e) => { e.preventDefault(); setDragging(false); };

  if (preview) {
    return (
      <div className="preview-area">
        <img src={preview} alt="Preview" className="preview-image" />
        <div className="preview-actions">
          <button className="btn-secondary" onClick={() => onFileSelect(null, null)}>
            Change Photo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`upload-area ${dragging ? 'dragging' : ''}`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <div className="upload-icon">📤</div>
      <p>Drag and drop your photo here</p>
      <p className="upload-subtitle">or</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => handleFile(e.target.files[0])}
      />
      <button className="upload-btn" onClick={() => inputRef.current.click()}>
        Browse Files
      </button>
      <p className="upload-note">Supported formats: JPG, PNG, TIFF (Max 50MB)</p>
    </div>
  );
}
