import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCars } from '../hooks/useCars';
import './RentalForm.css';

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
    idFile: null,
    licenseFile: null
  });

  useEffect(() => {
    if (cars && carId) {
      const foundCar = cars.find(c => c.id === carId);
      setCar(foundCar);
    }
  }, [cars, carId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRentalData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setRentalData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const uploadFileToFirebase = async (file, path) => {
    // Implement Firebase Storage upload
    try {
      // const storageRef = ref(storage, path);
      // const snapshot = await uploadBytes(storageRef, file);
      // return await getDownloadURL(snapshot.ref);
      return `https://example.com/${path}`;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const handleSubmitRental = async (e) => {
    e.preventDefault();
    if (!car) return;

    setIsSubmitting(true);

    try {
      // Upload files
      let idFileUrl = '';
      let licenseFileUrl = '';

      if (rentalData.idFile) {
        idFileUrl = await uploadFileToFirebase(rentalData.idFile, `ids/${carId}_${Date.now()}_id`);
      }

      if (rentalData.licenseFile) {
        licenseFileUrl = await uploadFileToFirebase(rentalData.licenseFile, `licenses/${carId}_${Date.now()}_license`);
      }

      // Save rental record
      const rentalRecord = {
        carId: carId,
        carName: car.name,
        customerName: rentalData.customerName,
        email: rentalData.email,
        phone: rentalData.phone,
        rentalDays: parseInt(rentalData.rentalDays),
        startDate: rentalData.startDate,
        totalPrice: car.price * parseInt(rentalData.rentalDays),
        idFileUrl,
        licenseFileUrl,
        rentalStartTime: new Date().toISOString(),
        rentalEndTime: new Date(new Date(rentalData.startDate).getTime() + parseInt(rentalData.rentalDays) * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active'
      };

      // Save to Firebase
      // await addDoc(collection(db, 'rentals'), rentalRecord);
      // await updateDoc(doc(db, 'cars', carId), { available: false });

      console.log('Rental submitted:', rentalRecord);
      navigate(`/rental-confirmation/${carId}`, { state: { rentalRecord } });

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
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Rental Days *</label>
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
            <label>ID Document (PDF, JPG, PNG) *</label>
            <input
              type="file"
              name="idFile"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Driver's License (PDF, JPG, PNG) *</label>
            <input
              type="file"
              name="licenseFile"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              required
            />
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