import { useState, useEffect } from 'react';
import { useCars } from '../hooks/useCars';
import './CarForm.css';

const CarForm = ({ car, onClose }) => {
  const { addCar, updateCar } = useCars();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    features: '',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (car) {
      setFormData({
        name: car.name || '',
        type: car.type || '',
        price: car.price || '',
        features: car.features?.join(', ') || '',
        image: null
      });
      setImagePreview(car.image || '');
    }
  }, [car]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files[0]) {
      setFormData(prev => ({ ...prev, image: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const carData = {
        name: formData.name,
        type: formData.type,
        price: parseInt(formData.price),
        features: formData.features.split(',').map(f => f.trim()).filter(f => f)
      };

      if (car) {
        await updateCar(car.id, carData, formData.image);
      } else {
        await addCar(carData, formData.image);
      }
      
      onClose();
    } catch (error) {
      alert('Error saving car: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="car-form-overlay">
      <div className="car-form">
        <div className="form-header">
          <h2>{car ? 'Edit Car' : 'Add New Car'}</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Car Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Type:</label>
            <select name="type" value={formData.type} onChange={handleChange} required>
              <option value="">Select Type</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Sports">Sports</option>
              <option value="Luxury">Luxury</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          <div className="form-group">
            <label>Price per Day ($):</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Features (comma separated):</label>
            <input
              type="text"
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="Automatic, 5 Seats, Air Conditioning"
            />
          </div>

          <div className="form-group">
            <label>Car Image:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Saving...' : (car ? 'Update' : 'Add')} Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarForm;