import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './RentalConfirmation.css';

const RentalConfirmation = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [rentalRecord, setRentalRecord] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (location.state?.rentalRecord) {
      setRentalRecord(location.state.rentalRecord);
      calculateTimeLeft(location.state.rentalRecord.rentalEndTime);
    }
  }, [location]);

  const calculateTimeLeft = (endTime) => {
    const difference = new Date(endTime).getTime() - new Date().getTime();
    if (difference <= 0) return;

    setTimeLeft({
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    });
  };

  useEffect(() => {
    if (!rentalRecord) return;

    const timer = setInterval(() => {
      calculateTimeLeft(rentalRecord.rentalEndTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [rentalRecord]);

  if (!rentalRecord) {
    return (
      <div className="rental-confirmation">
        <div className="confirmation-container">
          <h2>Rental Not Found</h2>
          <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="rental-confirmation">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <div className="success-icon">✓</div>
          <h2>Rental Confirmed!</h2>
          <p>Your rental has been successfully processed</p>
        </div>

        <div className="confirmation-details">
          <div className="car-info">
            <h3>{rentalRecord.carName}</h3>
            <p>Rental Period: {rentalRecord.rentalDays} days</p>
            <p>Total Amount: ${rentalRecord.totalPrice}</p>
          </div>

          {timeLeft && (
            <div className="countdown-section">
              <h4>Rental Time Remaining</h4>
              <div className="countdown-timer">
                <div className="time-unit">
                  <span>{timeLeft.days}</span>
                  <small>Days</small>
                </div>
                <div className="time-unit">
                  <span>{timeLeft.hours}</span>
                  <small>Hours</small>
                </div>
                <div className="time-unit">
                  <span>{timeLeft.minutes}</span>
                  <small>Minutes</small>
                </div>
                <div className="time-unit">
                  <span>{timeLeft.seconds}</span>
                  <small>Seconds</small>
                </div>
              </div>
            </div>
          )}

          <div className="customer-info">
            <h4>Customer Details</h4>
            <p>Name: {rentalRecord.customerName}</p>
            <p>Email: {rentalRecord.email}</p>
            <p>Phone: {rentalRecord.phone}</p>
          </div>
        </div>

        <div className="confirmation-actions">
          <button onClick={() => navigate('/')}>Back to Home</button>
          <button onClick={() => navigate('/my-rentals')}>View My Rentals</button>
        </div>
      </div>
    </div>
  );
};

export default RentalConfirmation;