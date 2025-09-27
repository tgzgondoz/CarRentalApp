import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CarCard.css';

const CarCard = ({ car, currentRental }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');
  const navigate = useNavigate();

  // Check if this car is currently rented
  const isRented = currentRental && currentRental.carId === car.id && currentRental.status === 'active';

  useEffect(() => {
    let interval;
    
    if (isRented && currentRental.rentalEndTime) {
      // Update time remaining every minute
      interval = setInterval(() => {
        const now = new Date();
        const endTime = new Date(currentRental.rentalEndTime);
        const diff = endTime - now;
        
        if (diff <= 0) {
          setTimeRemaining('Rental expired');
          clearInterval(interval);
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setTimeRemaining(`${hours}h ${minutes}m remaining`);
        }
      }, 60000);
      
      // Initial calculation
      const now = new Date();
      const endTime = new Date(currentRental.rentalEndTime);
      const diff = endTime - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeRemaining(`${hours}h ${minutes}m remaining`);
    }

    return () => clearInterval(interval);
  }, [isRented, currentRental]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (e) => {
    setImageError(true);
    e.target.src = '/placeholder-car.jpg';
  };

  const isPremium = car.price > 150 || car.type?.toLowerCase().includes('premium') || car.type?.toLowerCase().includes('luxury');

  const features = Array.isArray(car.features) 
    ? car.features 
    : car.features?.split(',').map(f => f.trim()).filter(f => f) || [];

  const handleRentClick = () => {
    if (car.available && !isRented) {
      navigate(`/rent-car/${car.id}`);
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

  return (
    <div className={`car-card ${isRented ? 'rented' : ''}`}>
      <div className={`car-image ${!imageLoaded && !imageError ? 'loading' : ''}`}>
        <img 
          src={imageError ? '/placeholder-car.jpg' : (car.image || '/placeholder-car.jpg')} 
          alt={car.name}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        {isPremium && (
          <div className="premium-badge">Premium</div>
        )}
        <div className={`car-status ${isRented ? 'rented' : car.available ? 'available' : 'unavailable'}`}>
          {isRented ? 'Rented' : car.available ? 'Available' : 'Not Available'}
        </div>
        {isRented && <div className="rented-overlay">Currently Rented</div>}
      </div>
      
      <div className="car-info">
        <h3>{car.name}</h3>
        <p className="car-type">{car.type}</p>
        <p className="car-price">${car.price}/day</p>
        <p className="car-description">{car.description}</p>
        
        {/* Rental Information Display */}
        {isRented && currentRental && (
          <div className="rental-info">
            <div className="rental-message">
              <strong>Rented by: {currentRental.customerName}</strong>
            </div>
            <div className="rental-time">
              <span>Start: {formatRentalDate(currentRental.rentalStartTime)}</span>
              <span>End: {formatRentalDate(currentRental.rentalEndTime)}</span>
              <span className="time-remaining">{timeRemaining}</span>
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
            className={`rent-btn ${isRented ? 'disabled' : ''}`}
            onClick={handleRentClick}
            disabled={!car.available || isRented}
          >
            {isRented ? 'Currently Rented' : (car.available ? 'Rent Now' : 'Not Available')}
          </button>
          
          {isRented && (
            <button 
              className="return-btn"
              onClick={() => navigate(`/return-car/${car.id}`)}
            >
              Return Car
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarCard;