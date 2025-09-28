import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCars } from '../hooks/useCars';
import { db } from '../firebase/config';
import { ref, push, update } from 'firebase/database';
import './RentalForm.css';

// Firebase configuration
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAdwEeVAvHU6cUxHCaIfcGY1VHXjUW6fow",
  authDomain: "carrentalapp-b6862.firebaseapp.com",
  databaseURL: "https://carrentalapp-b6862-default-rtdb.firebaseio.com",
  projectId: "carrentalapp-b6862",
  storageBucket: "carrentalapp-b6862.firebasestorage.app",
  messagingSenderId: "722148486629",
  appId: "1:722148486629:web:beaf5205c436d40e88530c",
  measurementId: "G-NKT1P56X3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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

  if (loading) return <div className="loading">Loading...</div>;
  if (!car) return <div className="error">Car not found</div>;

  return (
    <div className="rental-form-page">
      <div className="rental-form-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back to Cars
        </button>
        
        <div className="car-summary">
          <img src={car.image || '/placeholder-car.jpg'} alt={car.name} />
          <div className="car-details">
            <h2>{car.name}</h2>
            <p className="car-type">{car.type}</p>
            <p className="car-price">${car.price}/day</p>
            <p className="availability" style={{color: 'green'}}>Available</p>
          </div>
        </div>

        <form onSubmit={handleSubmitRental} className="rental-form">
          <h3>Rental Information</h3>
          
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="customerName"
              value={rentalData.customerName}
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={rentalData.email}
              onChange={handleInputChange}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={rentalData.phone}
              onChange={handleInputChange}
              required
              placeholder="+1234567890"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Rental Days (1-30) *</label>
              <input
                type="number"
                name="rentalDays"
                min="1"
                max="30"
                value={rentalData.rentalDays}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={rentalData.startDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>ID Number *</label>
            <input
              type="text"
              name="idNumber"
              value={rentalData.idNumber}
              onChange={handleInputChange}
              required
              placeholder="Enter your government ID number"
              maxLength="20"
            />
            <small>8-20 characters (letters, numbers, hyphens only)</small>
          </div>

          <div className="form-group">
            <label>Driver's License Number *</label>
            <input
              type="text"
              name="licenseNumber"
              value={rentalData.licenseNumber}
              onChange={handleInputChange}
              required
              placeholder="Enter your driver's license number"
              maxLength="15"
            />
            <small>8-15 characters (letters and numbers only)</small>
          </div>

          <div className="rental-summary">
            <h4>Rental Summary</h4>
            <p>{rentalData.rentalDays} days × ${car.price}/day</p>
            <p className="total-price">Total: ${car.price * rentalData.rentalDays}</p>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="submit-btn"
            >
              {isSubmitting ? 'Processing...' : 'Confirm Rental'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RentalForm;