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
      newErrors.name = 'Vehicle name is required';
    }

    if (!formData.type) {
      newErrors.type = 'Vehicle category is required';
    }

    if (!formData.price) {
      newErrors.price = 'Daily rate is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid amount greater than 0';
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
      alert('Error saving vehicle: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-gray-100">
        {/* Premium Header */}
        <div className="flex items-center justify-between p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {car ? 'Edit Vehicle' : 'Add Premium Vehicle'}
            </h2>
            <p className="text-gray-500 mt-1">
              {car ? 'Update vehicle details' : 'Curate a new addition to our elite fleet'}
            </p>
          </div>
          <button 
            type="button" 
            className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-gray-300 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all duration-300 text-xl font-light hover:scale-110 shadow-sm hover:shadow-md"
            onClick={onClose}
            disabled={loading}
          >
            ×
          </button>
        </div>
        
        {/* Premium Form */}
        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto max-h-[calc(90vh-120px)] bg-gradient-to-b from-white to-gray-50/50">
          {/* Basic Information Section */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Vehicle Identity
              </h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Vehicle Name */}
              <div className="lg:col-span-2">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                  Vehicle Title
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                    errors.name ? 'border-red-500 bg-red-50/50' : 'border-gray-200'
                  } ${loading ? 'bg-gray-100 cursor-not-allowed' : 'bg-white/80 backdrop-blur-sm'}`}
                  placeholder="e.g., BMW 7 Series Executive Sedan"
                  disabled={loading}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-4 h-4 mr-1">⚠</span>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Vehicle Category */}
              <div>
                <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-3">
                  Vehicle Category
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                    errors.type ? 'border-red-500 bg-red-50/50' : 'border-gray-200'
                  } ${loading ? 'bg-gray-100 cursor-not-allowed' : 'bg-white/80 backdrop-blur-sm'}`}
                  disabled={loading}
                >
                  <option value="">Select Category</option>
                  <option value="Executive Sedan">Executive Sedan</option>
                  <option value="Luxury SUV">Luxury SUV</option>
                  <option value="Sports Coupe">Sports Coupe</option>
                  <option value="Premium Convertible">Premium Convertible</option>
                  <option value="Electric Vehicle">Electric Vehicle</option>
                  <option value="Performance">Performance</option>
                  <option value="Grand Tourer">Grand Tourer</option>
                  <option value="Luxury Minivan">Luxury Minivan</option>
                </select>
                {errors.type && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-4 h-4 mr-1">⚠</span>
                    {errors.type}
                  </p>
                )}
              </div>

              {/* Daily Rate */}
              <div>
                <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-3">
                  Daily Rate ($)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                      errors.price ? 'border-red-500 bg-red-50/50' : 'border-gray-200'
                    } ${loading ? 'bg-gray-100 cursor-not-allowed' : 'bg-white/80 backdrop-blur-sm'}`}
                    min="0"
                    step="0.01"
                    placeholder="299.00"
                    disabled={loading}
                  />
                </div>
                {errors.price && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-4 h-4 mr-1">⚠</span>
                    {errors.price}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Media & Details Section */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Media & Specifications
              </h3>
            </div>
            
            <div className="space-y-6">
              {/* Image URL */}
              <div>
                <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-3">
                  Premium Image URL
                </label>
                <div className="relative">
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                      loading ? 'bg-gray-100 cursor-not-allowed' : 'bg-white/80 backdrop-blur-sm'
                    }`}
                    placeholder="https://assets.domain.com/premium-vehicle-image.jpg"
                    disabled={loading}
                  />
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">🖼️</span>
                </div>
                <p className="mt-2 text-sm text-gray-500 flex items-center">
                  <span className="w-4 h-4 mr-1">💡</span>
                  High-resolution image showcasing vehicle excellence
                </p>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-3">
                  Executive Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                    loading ? 'bg-gray-100 cursor-not-allowed' : 'bg-white/80 backdrop-blur-sm'
                  }`}
                  placeholder="Describe the vehicle's premium features, driving experience, and unique characteristics that set it apart..."
                  disabled={loading}
                />
              </div>

              {/* Features */}
              <div>
                <label htmlFor="features" className="block text-sm font-semibold text-gray-700 mb-3">
                  Premium Features
                </label>
                <input
                  type="text"
                  id="features"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                    loading ? 'bg-gray-100 cursor-not-allowed' : 'bg-white/80 backdrop-blur-sm'
                  }`}
                  placeholder="Panoramic Sunroof, Heated Leather Seats, Advanced Driver Assistance, Premium Sound System..."
                  disabled={loading}
                />
                <p className="mt-2 text-sm text-gray-500 flex items-center">
                  <span className="w-4 h-4 mr-1">🎯</span>
                  Separate premium features with commas for optimal display
                </p>
              </div>
            </div>
          </div>

          {/* Availability Section */}
          <div className="mb-8">
            <div className="flex items-center p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300">
              <input
                type="checkbox"
                id="available"
                name="available"
                checked={formData.available}
                onChange={handleChange}
                disabled={loading}
                className="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded-lg focus:ring-blue-500 focus:ring-2 transition-all duration-200"
              />
              <label htmlFor="available" className="ml-3 text-sm font-semibold text-gray-700">
                Available for Elite Reservations
              </label>
              <div className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {formData.available ? 'Active' : 'Inactive'}
              </div>
            </div>
          </div>

          {/* Premium Form Actions */}
          <div className="flex justify-end space-x-4 pt-8 border-t border-gray-100">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 font-semibold hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 font-semibold hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl group"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>{car ? 'Update Vehicle' : 'Add to Elite Fleet'}</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarForm;