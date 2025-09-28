import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CarCard.css';

const CarCard = ({ car, currentRental, onRentalUpdate }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [localRental, setLocalRental] = useState(currentRental);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
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

  // Handle rental confirmation
  const handleRentalConfirmation = (rentalData) => {
    if (rentalData.carId === normalizedCar.id) {
      setLocalRental({
        ...rentalData,
        status: 'active'
      });
      
      if (onRentalUpdate) {
        onRentalUpdate(rentalData);
      }
    }
  };

  // Image zoom handlers
  const handleImageClick = (e) => {
    e.stopPropagation();
    setIsImageZoomed(true);
  };

  const handleZoomedImageClick = (e) => {
    e.stopPropagation();
    setIsImageZoomed(false);
  };

  const handleZoomedImageMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

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
            setTimeRemaining(`${days}d ${hours}h ${minutes}m remaining`);
          } else {
            setTimeRemaining(`${hours}h ${minutes}m remaining`);
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
        setTimeRemaining(`${days}d ${hours}h ${minutes}m remaining`);
      } else {
        setTimeRemaining(`${hours}h ${minutes}m remaining`);
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
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const activeRental = localRental || currentRental;

  return (
    <>
      <div className={`car-card ${isRented ? 'rented' : ''}`}>
        <div 
          className={`car-image ${!imageLoaded && !imageError ? 'loading' : ''}`}
          onClick={handleImageClick}
        >
          <img 
            src={imageError ? '/placeholder-car.jpg' : normalizedCar.image} 
            alt={normalizedCar.name}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          {isPremium && (
            <div className="premium-badge">P</div>
          )}
          <div className={`car-status ${isRented ? 'rented' : normalizedCar.available ? 'available' : 'unavailable'}`}>
            {isRented ? 'RENTED' : normalizedCar.available ? 'A' : 'X'}
          </div>
          {isRented && <div className="rented-overlay">CURRENTLY RENTED</div>}
        </div>
        
        <div className="car-info">
          <h3>{normalizedCar.name}</h3>
          <p className="car-type">{normalizedCar.type}</p>
          <p className="car-price">From ${normalizedCar.price}/day</p>
          <p className="car-description">{normalizedCar.description}</p>
          
          {/* Rental Information Display */}
          {isRented && activeRental && (
            <div className="rental-info">
              <div className="rental-message">
                <strong>Rented by: {activeRental.customerName}</strong>
              </div>
              <div className="rental-dates">
                <div className="rental-date-item">
                  <span className="date-label">Start:</span>
                  <span className="date-value">{formatRentalDate(activeRental.rentalStartTime)}</span>
                </div>
                <div className="rental-date-item">
                  <span className="date-label">End:</span>
                  <span className="date-value">{formatRentalDate(activeRental.rentalEndTime)}</span>
                </div>
                <div className="rental-date-item">
                  <span className="date-label">Duration:</span>
                  <span className="date-value">{activeRental.rentalDays} days</span>
                </div>
              </div>
              <div className="time-remaining-section">
                <span className="time-remaining-label">Time until return:</span>
                <span className="time-remaining-value">{timeRemaining}</span>
              </div>
            </div>
          )}
          
          {features.length > 0 && (
            <div className="car-features">
              {features.slice(0, 3).map((feature, index) => (
                <span key={index} className="feature-tag">{feature}</span>
              ))}
              {features.length > 3 && (
                <span className="feature-tag">+{features.length - 3} more</span>
              )}
            </div>
          )}
          
          <div className="car-action">
            <button 
              className={`rent-btn ${isRented ? 'disabled' : normalizedCar.available ? 'available' : 'unavailable'}`}
              onClick={handleRentClick}
              disabled={!normalizedCar.available || isRented}
            >
              {isRented ? 'CURRENTLY RENTED' : (normalizedCar.available ? 'RENT NOW' : 'NOT AVAILABLE')}
            </button>
            
            {isRented && (
              <button 
                className="return-btn"
                onClick={() => navigate(`/return-car/${normalizedCar.id}`)}
              >
                RETURN CAR
              </button>
            )}
          </div>
          
          {/* Rental Confirmation Message */}
          {isRented && activeRental && (
            <div className="rental-confirmation-message">
              <div className="confirmation-icon">✓</div>
              <div className="confirmation-text">
                <strong>RENTAL CONFIRMED!</strong>
                <span>Your rental is active until {formatRentalDate(activeRental.rentalEndTime)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Zoom Overlay */}
      {isImageZoomed && (
        <div 
          className="image-zoom-overlay" 
          onClick={handleZoomedImageClick}
        >
          <div className="zoomed-image-container">
            <img 
              src={imageError ? '/placeholder-car.jpg' : normalizedCar.image}
              alt={normalizedCar.name}
              className="zoomed-image"
              onClick={handleZoomedImageClick}
              onMouseMove={handleZoomedImageMove}
              style={{
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
              }}
            />
            <div className="zoom-controls">
              <button 
                className="zoom-close-btn"
                onClick={handleZoomedImageClick}
              >
                ✕
              </button>
              <div className="zoom-hint">Scroll to zoom • Click to close</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarCard;