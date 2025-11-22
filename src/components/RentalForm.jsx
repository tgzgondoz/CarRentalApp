import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCars } from '../hooks/useCars';
import { db } from '../firebase/config';
import { ref, push, update } from 'firebase/database';

const RentalForm = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { cars, loading } = useCars();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [car, setCar] = useState(null);

  const [rentalData, setRentalData] = useState({
    customerName: '',
    email: '',
    phone: '',
    rentalDays: 1,
    startDate: new Date().toISOString().split('T')[0],
    idNumber: '',
    licenseNumber: ''
  });

  useEffect(() => {
    if (cars && carId) {
      const foundCar = cars.find(c => c.id === carId);
      if (foundCar && !foundCar.available) {
        alert('This car is not available for rental!');
        navigate('/cars');
        return;
      }
      setCar(foundCar);
    }
  }, [cars, carId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRentalData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = [];
    
    if (!rentalData.customerName.trim()) {
      errors.push('Please enter your full name');
    }
    
    if (!rentalData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.push('Please enter a valid email address');
    }
    
    if (!rentalData.phone.match(/^[\+]?[1-9][\d]{0,15}$/)) {
      errors.push('Please enter a valid phone number');
    }
    
    if (rentalData.rentalDays < 1 || rentalData.rentalDays > 30) {
      errors.push('Rental days must be between 1 and 30');
    }
    
    if (!rentalData.idNumber.trim()) {
      errors.push('Please enter your ID number');
    } else if (!/^[A-Za-z0-9\-]{8,20}$/.test(rentalData.idNumber)) {
      errors.push('ID number must be 8-20 characters (letters, numbers, hyphens only)');
    }
    
    if (!rentalData.licenseNumber.trim()) {
      errors.push('Please enter your driver\'s license number');
    } else if (!/^[A-Za-z0-9]{8,15}$/.test(rentalData.licenseNumber)) {
      errors.push('License number must be 8-15 characters (letters and numbers only)');
    }
    
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return false;
    }
    
    return true;
  };

  const handleSubmitRental = async (e) => {
    e.preventDefault();

    if (!car || !car.available) {
      alert('This car is not available for rental!');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create rental record
      const rentalRecord = {
        carId: carId,
        carName: car.name,
        carImage: car.image || '',
        carType: car.type || '',
        customerName: rentalData.customerName.trim(),
        email: rentalData.email.toLowerCase(),
        phone: rentalData.phone,
        rentalDays: parseInt(rentalData.rentalDays),
        startDate: rentalData.startDate,
        totalPrice: car.price * parseInt(rentalData.rentalDays),
        idNumber: rentalData.idNumber.trim(),
        licenseNumber: rentalData.licenseNumber.trim(),
        rentalDate: new Date().toISOString(),
        rentalStartTime: new Date().toISOString(),
        rentalEndTime: new Date(new Date().getTime() + parseInt(rentalData.rentalDays) * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Save rental record to Realtime Database
      const rentalsRef = ref(db, 'rentals');
      const newRentalRef = push(rentalsRef);
      await update(newRentalRef, rentalRecord);
      const rentalId = newRentalRef.key;

      // Update car availability
      const carRef = ref(db, `cars/${carId}`);
      await update(carRef, { 
        available: false,
        lastRented: new Date().toISOString(),
        rentalId: rentalId
      });

      console.log('Rental submitted successfully with ID:', rentalId);
      
      navigate(`/rental-confirmation/${rentalId}`, { 
        state: { 
          rentalRecord: {
            ...rentalRecord,
            id: rentalId
          } 
        } 
      });

    } catch (error) {
      console.error('Error submitting rental:', error);
      alert('Error submitting rental. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Car Not Found</h2>
          <p className="text-gray-600 mb-6">The requested car could not be found.</p>
          <button 
            onClick={() => navigate('/cars')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Browse Cars
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Cars
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Car Summary */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Rent {car.name}</h1>
                <p className="text-gray-600">Complete the form to confirm your rental</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <img 
                    src={car.image || '/placeholder-car.jpg'} 
                    alt={car.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{car.name}</h3>
                    <p className="text-gray-600 mb-2">{car.type}</p>
                    <p className="text-2xl font-bold text-blue-600 mb-2">${car.price}/day</p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Available
                    </span>
                  </div>
                </div>
              </div>

              {/* Rental Summary */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-4">Rental Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-blue-800">
                    <span>{rentalData.rentalDays} days × ${car.price}/day</span>
                    <span>${car.price * rentalData.rentalDays}</span>
                  </div>
                  <div className="border-t border-blue-200 pt-2">
                    <div className="flex justify-between font-bold text-lg text-blue-900">
                      <span>Total Amount</span>
                      <span>${car.price * rentalData.rentalDays}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rental Form */}
            <form onSubmit={handleSubmitRental} className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Rental Information</h3>
              
              {/* Personal Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={rentalData.customerName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={rentalData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={rentalData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+1234567890"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Rental Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rental Days (1-30) *
                  </label>
                  <input
                    type="number"
                    name="rentalDays"
                    min="1"
                    max="30"
                    value={rentalData.rentalDays}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={rentalData.startDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Identification */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID Number *
                  </label>
                  <input
                    type="text"
                    name="idNumber"
                    value={rentalData.idNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your government ID number"
                    maxLength="20"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                  <p className="mt-1 text-sm text-gray-500">8-20 characters (letters, numbers, hyphens only)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Driver's License Number *
                  </label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={rentalData.licenseNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your driver's license number"
                    maxLength="15"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                  <p className="mt-1 text-sm text-gray-500">8-15 characters (letters and numbers only)</p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex space-x-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => navigate(-1)}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    'Confirm Rental'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalForm;