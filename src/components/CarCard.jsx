import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CarCard = ({ car, currentRental, onRentalUpdate }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [localRental, setLocalRental] = useState(currentRental);
  const [showImageModal, setShowImageModal] = useState(false);
  const navigate = useNavigate();

  // Normalize car data to handle different structures
  const normalizedCar = {
    id: car.id || car.name?.replace(/\s+/g, '-').toLowerCase(),
    name: car.name || 'Unknown Car',
    type: car.type || car.category || 'Standard',
    price: car.price || parseInt(car.priceText?.replace(/[^0-9]/g, '') || '0'),
    description: car.description || 'No description available',
    image: car.image || '/placeholder-car.jpg',
    available: car.available !== undefined ? car.available : true,
    features: Array.isArray(car.features) ? car.features : 
              car.features ? car.features.split(',').map(f => f.trim()) : []
  };

  // Check if this car is currently rented
  const isRented = (localRental && localRental.carId === normalizedCar.id && localRental.status === 'active') || 
                  (currentRental && currentRental.carId === normalizedCar.id && currentRental.status === 'active');

  // Sync local rental state with prop changes
  useEffect(() => {
    if (currentRental) {
      setLocalRental(currentRental);
    }
  }, [currentRental]);

  // Time remaining calculation
  useEffect(() => {
    let interval;
    
    const activeRental = localRental || currentRental;
    
    if (isRented && activeRental && activeRental.rentalEndTime) {
      interval = setInterval(() => {
        const now = new Date();
        const endTime = new Date(activeRental.rentalEndTime);
        const diff = endTime - now;
        
        if (diff <= 0) {
          setTimeRemaining('Rental expired');
          clearInterval(interval);
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          
          if (days > 0) {
            setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
          } else {
            setTimeRemaining(`${hours}h ${minutes}m`);
          }
        }
      }, 60000);
      
      // Initial calculation
      const now = new Date();
      const endTime = new Date(activeRental.rentalEndTime);
      const diff = endTime - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (days > 0) {
        setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeRemaining(`${hours}h ${minutes}m`);
      }
    }

    return () => clearInterval(interval);
  }, [isRented, localRental, currentRental]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (e) => {
    setImageError(true);
    e.target.src = '/placeholder-car.jpg';
  };

  const isPremium = normalizedCar.price > 150 || 
                   normalizedCar.type?.toLowerCase().includes('premium') || 
                   normalizedCar.type?.toLowerCase().includes('luxury');

  const features = normalizedCar.features || [];

  const handleRentClick = () => {
    if (normalizedCar.available && !isRented) {
      navigate(`/rent-car/${normalizedCar.id}`);
    }
  };

  const formatRentalDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const activeRental = localRental || currentRental;

  // Image modal handlers
  const handleImageClick = (e) => {
    e.stopPropagation();
    setShowImageModal(true);
  };

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setShowImageModal(false);
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowImageModal(false);
    }
  };

  return (
    <>
      <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md ${
        isRented ? 'ring-2 ring-orange-500 bg-orange-50' : ''
      }`}>
        {/* Image Container - Responsive */}
        <div 
          className={`relative cursor-pointer group ${
            !imageLoaded && !imageError ? 'bg-gray-200 animate-pulse' : ''
          }`}
          onClick={handleImageClick}
        >
          <div className="aspect-w-16 aspect-h-9 overflow-hidden">
            <img 
              src={imageError ? '/placeholder-car.jpg' : normalizedCar.image} 
              alt={normalizedCar.name}
              onLoad={handleImageLoad}
              onError={handleImageError}
              className="w-full h-40 xs:h-44 sm:h-48 md:h-52 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          {/* Premium Badge - Responsive */}
          {isPremium && (
            <div className="absolute top-2 left-2 xs:top-3 xs:left-3 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-xs xs:text-sm shadow-lg">
              P
            </div>
          )}
          
          {/* Status Indicator - Responsive */}
          <div className={`absolute top-2 right-2 xs:top-3 xs:right-3 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg ${
            isRented 
              ? 'bg-orange-500' 
              : normalizedCar.available 
                ? 'bg-green-500' 
                : 'bg-red-500'
          }`}>
            {isRented ? 'R' : normalizedCar.available ? 'A' : 'X'}
          </div>
          
          {/* Rented Overlay */}
          {isRented && (
            <div className="absolute inset-0 bg-orange-600 bg-opacity-90 flex items-center justify-center p-3">
              <div className="text-white text-center">
                <div className="text-sm xs:text-base sm:text-lg font-bold">CURRENTLY RENTED</div>
                <div className="text-xs xs:text-sm font-normal mt-1 opacity-90">Click to view details</div>
              </div>
            </div>
          )}
          
          {/* View Hint */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs px-2 xs:px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Click to view
          </div>
        </div>
        
        {/* Car Info - Responsive Padding */}
        <div className="p-3 xs:p-4 sm:p-5">
          {/* Title and Type */}
          <div className="mb-2 xs:mb-3">
            <h3 className="font-semibold text-gray-900 text-base xs:text-lg sm:text-xl mb-1 line-clamp-1">
              {normalizedCar.name}
            </h3>
            <p className="text-gray-600 text-sm xs:text-base mb-2">{normalizedCar.type}</p>
            <p className="text-blue-600 font-bold text-lg xs:text-xl sm:text-2xl mb-2 xs:mb-3">
              From ${normalizedCar.price}/day
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-xs xs:text-sm mb-3 xs:mb-4 line-clamp-2">
            {normalizedCar.description}
          </p>
          
          {/* Rental Information Display */}
          {isRented && activeRental && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 xs:p-3 mb-3 xs:mb-4">
              <div className="text-orange-800 font-semibold text-xs xs:text-sm mb-1 xs:mb-2">
                Rented by: {activeRental.customerName}
              </div>
              <div className="space-y-1 text-xs text-orange-700">
                <div className="flex justify-between">
                  <span>Start:</span>
                  <span className="font-medium text-right">{formatRentalDate(activeRental.rentalStartTime)}</span>
                </div>
                <div className="flex justify-between">
                  <span>End:</span>
                  <span className="font-medium text-right">{formatRentalDate(activeRental.rentalEndTime)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium">{activeRental.rentalDays} days</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-orange-200">
                <div className="flex justify-between text-xs">
                  <span className="text-orange-800">Time remaining:</span>
                  <span className={`font-semibold ${
                    timeRemaining.includes('expired') ? 'text-red-600' : 'text-orange-600'
                  }`}>
                    {timeRemaining}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {/* Features - Responsive */}
          {features.length > 0 && (
            <div className="flex flex-wrap gap-1 xs:gap-2 mb-3 xs:mb-4">
              {features.slice(0, 3).map((feature, index) => (
                <span 
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full whitespace-nowrap"
                >
                  {feature}
                </span>
              ))}
              {features.length > 3 && (
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                  +{features.length - 3} more
                </span>
              )}
            </div>
          )}
          
          {/* Action Buttons - Responsive */}
          <div className="space-y-2 xs:space-y-3">
            <button 
              className={`w-full py-2 xs:py-3 px-3 xs:px-4 rounded-lg font-semibold text-sm xs:text-base transition-all duration-200 min-h-[44px] ${
                isRented 
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                  : normalizedCar.available 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95' 
                    : 'bg-red-400 text-white cursor-not-allowed'
              }`}
              onClick={handleRentClick}
              disabled={!normalizedCar.available || isRented}
            >
              {isRented ? 'CURRENTLY RENTED' : (normalizedCar.available ? 'RENT NOW' : 'NOT AVAILABLE')}
            </button>
            
            {isRented && (
              <button 
                className="w-full py-2 xs:py-3 px-3 xs:px-4 bg-green-600 text-white rounded-lg font-semibold text-sm xs:text-base hover:bg-green-700 transition-colors duration-200 min-h-[44px]"
                onClick={() => navigate(`/return-car/${normalizedCar.id}`)}
              >
                RETURN CAR
              </button>
            )}
          </div>
          
          {/* Rental Confirmation Message */}
          {isRented && activeRental && (
            <div className="mt-2 xs:mt-3 p-2 xs:p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2 xs:gap-3">
              <div className="w-5 h-5 xs:w-6 xs:h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs xs:text-sm font-bold flex-shrink-0 mt-0.5">
                ✓
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-green-800 text-xs xs:text-sm">RENTAL CONFIRMED!</div>
                <div className="text-green-700 text-xs truncate">
                  Active until {formatRentalDate(activeRental.rentalEndTime)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal - Responsive */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-3 xs:p-4 sm:p-6"
          onClick={handleModalClick}
        >
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden mx-auto">
            <div className="flex items-center justify-between p-3 xs:p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 text-base xs:text-lg sm:text-xl truncate pr-2">
                {normalizedCar.name}
              </h3>
              <button 
                className="w-8 h-8 xs:w-10 xs:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors duration-200 flex-shrink-0"
                onClick={handleCloseModal}
              >
                ✕
              </button>
            </div>
            <div className="p-3 xs:p-4 max-h-[60vh] overflow-auto">
              <img 
                src={imageError ? '/placeholder-car.jpg' : normalizedCar.image}
                alt={normalizedCar.name}
                className="w-full h-auto rounded-lg max-w-full"
              />
            </div>
            <div className="p-3 xs:p-4 border-t border-gray-200 bg-gray-50">
              <p className="text-gray-600 text-sm xs:text-base">{normalizedCar.type}</p>
              <p className="text-blue-600 font-bold text-lg xs:text-xl sm:text-2xl">
                From ${normalizedCar.price}/day
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarCard;