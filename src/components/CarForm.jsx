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

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Car name is required';
    }

    if (!formData.type) {
      newErrors.type = 'Car type is required';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a valid number greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const carData = {
        ...formData,
        price: parseFloat(formData.price),
        name: formData.name.trim(),
        description: formData.description.trim(),
        features: formData.features.trim()
      };

      await onSubmit(carData);
    } catch (error) {
      alert('Error saving car: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="car-form-overlay">
      <div className="car-form-modal">
        <div className="car-form-header">
          <h2>{car ? 'Edit Car' : 'Add New Car'}</h2>
          <button 
            type="button" 
            className="close-btn" 
            onClick={onClose}
            disabled={loading}
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="car-form">
          <div className="form-section">
            <h3 className="section-title">Basic Information</h3>
            
            <div className="form-group">
              <label htmlFor="name" className="form-label">Car Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="Enter car name"
                disabled={loading}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="type" className="form-label">Car Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`form-select ${errors.type ? 'error' : ''}`}
                disabled={loading}
              >
                <option value="">Select Type</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Sports">Sports</option>
                <option value="Luxury">Luxury</option>
                <option value="Electric">Electric</option>
                <option value="Convertible">Convertible</option>
                <option value="Minivan">Minivan</option>
                <option value="Pickup Truck">Pickup Truck</option>
              </select>
              {errors.type && <span className="error-text">{errors.type}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="price" className="form-label">Price per Day ($)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`form-input ${errors.price ? 'error' : ''}`}
                min="0"
                step="0.01"
                placeholder="0.00"
                disabled={loading}
              />
              {errors.price && <span className="error-text">{errors.price}</span>}
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Media & Details</h3>
            
            <div className="form-group">
              <label htmlFor="image" className="form-label">Image URL</label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="form-input"
                placeholder="https://example.com/car-image.jpg"
                disabled={loading}
              />
              <small className="help-text">Provide a direct link to the car image</small>
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="form-textarea"
                placeholder="Enter car description"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="features" className="form-label">Features</label>
              <input
                type="text"
                id="features"
                name="features"
                value={formData.features}
                onChange={handleChange}
                className="form-input"
                placeholder="GPS, Bluetooth, Air Conditioning, etc."
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-section">
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                  disabled={loading}
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                Available for rent
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={onClose} 
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : (car ? 'Update Car' : 'Add Car')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarForm;