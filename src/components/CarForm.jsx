import { useState, useEffect } from 'react';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {car ? 'Edit Car' : 'Add New Car'}
          </h2>
          <button 
            type="button" 
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors duration-200 text-xl font-light"
            onClick={onClose}
            disabled={loading}
          >
            ×
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Basic Information Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Basic Information
            </h3>
            
            <div className="space-y-4">
              {/* Car Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Car Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  placeholder="Enter car name"
                  disabled={loading}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Car Type */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Car Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    errors.type ? 'border-red-500' : 'border-gray-300'
                  } ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
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
                {errors.type && (
                  <p className="mt-1 text-sm text-red-600">{errors.type}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Day ($)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  } ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  disabled={loading}
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
              </div>
            </div>
          </div>

          {/* Media & Details Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Media & Details
            </h3>
            
            <div className="space-y-4">
              {/* Image URL */}
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    loading ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="https://example.com/car-image.jpg"
                  disabled={loading}
                />
                <p className="mt-1 text-sm text-gray-500">Provide a direct link to the car image</p>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    loading ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="Enter car description"
                  disabled={loading}
                />
              </div>

              {/* Features */}
              <div>
                <label htmlFor="features" className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>
                <input
                  type="text"
                  id="features"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    loading ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="GPS, Bluetooth, Air Conditioning, etc."
                  disabled={loading}
                />
                <p className="mt-1 text-sm text-gray-500">Separate features with commas</p>
              </div>
            </div>
          </div>

          {/* Availability Section */}
          <div className="mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="available"
                name="available"
                checked={formData.available}
                onChange={handleChange}
                disabled={loading}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="available" className="ml-2 text-sm font-medium text-gray-700">
                Available for rent
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                car ? 'Update Car' : 'Add Car'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarForm;