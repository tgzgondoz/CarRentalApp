import { useState, useEffect } from 'react';
import './CarForm.css';

const CarForm = ({ car, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    image: '',
    description: '',
    features: '',
    available: true
  });

  useEffect(() => {
    if (car) {
      setFormData({
        name: car.name || '',
        type: car.type || '',
        price: car.price || '',
        image: car.image || '',
        description: car.description || '',
        features: car.features || '',
        available: car.available !== undefined ? car.available : true
      });
    }
  }, [car]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.type || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }

    // Convert price to number
    const carData = {
      ...formData,
      price: parseFloat(formData.price)
    };

    onSubmit(carData);
  };

  return (
    <div className="car-form-overlay">
      <div className="car-form-modal">
        <div className="car-form-header">
          <h2>{car ? 'Edit Car' : 'Add New Car'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="car-form">
          <div className="form-group">
            <label htmlFor="name">Car Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Car Type *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Sports">Sports</option>
              <option value="Luxury">Luxury</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price per Day ($) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/car-image.jpg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="features">Features</label>
            <input
              type="text"
              id="features"
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="GPS, Bluetooth, Air Conditioning, etc."
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleChange}
              />
              Available for rent
            </label>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {car ? 'Update Car' : 'Add Car'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarForm;