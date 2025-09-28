import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCars } from '../hooks/useCars';
import { db } from '../firebase/config';
import { ref, onValue, off, update } from 'firebase/database';
import CarForm from './CarForm';
import './AdminPanel.css';

const AdminPanel = () => {
  const { logout, currentUser } = useAuth();
  const { cars, loading, deleteCar, addCar, updateCar } = useCars();
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [rentals, setRentals] = useState([]);
  const [rentalsLoading, setRentalsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'available', 'rented'
  const navigate = useNavigate();

  // Fetch rentals data from Firebase Realtime Database
  useEffect(() => {
    const rentalsRef = ref(db, 'rentals');
    
    const fetchRentals = () => {
      try {
        setRentalsLoading(true);
        
        onValue(rentalsRef, (snapshot) => {
          const rentalsData = snapshot.val();
          const rentalsList = [];
          
          if (rentalsData) {
            Object.keys(rentalsData).forEach(key => {
              rentalsList.push({
                id: key,
                ...rentalsData[key]
              });
            });
          }
          
          setRentals(rentalsList);
          setRentalsLoading(false);
        }, (error) => {
          console.error('Error fetching rentals:', error);
          setRentalsLoading(false);
        });

      } catch (error) {
        console.error('Error setting up rentals listener:', error);
        setRentalsLoading(false);
      }
    };

    fetchRentals();

    // Cleanup function to remove listener
    return () => {
      off(rentalsRef);
    };
  }, []);

  const handleEdit = (car) => {
    setEditingCar(car);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingCar(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCar(null);
  };

  const handleFormSubmit = async (carData) => {
    try {
      if (editingCar) {
        await updateCar(editingCar.id, carData);
      } else {
        await addCar(carData);
      }
      handleFormClose();
    } catch (error) {
      alert('Error saving car: ' + error.message);
    }
  };

  const handleDelete = async (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await deleteCar(carId);
      } catch (error) {
        alert('Error deleting car: ' + error.message);
      }
    }
  };

  const handleBackToSite = () => {
    navigate('/');
  };

  // Mark rental as completed and make car available again
  const handleCompleteRental = async (rentalId, carId) => {
    if (window.confirm('Are you sure you want to mark this rental as completed?')) {
      try {
        // Update rental status
        const rentalRef = ref(db, `rentals/${rentalId}`);
        await update(rentalRef, {
          status: 'completed',
          completedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });

        // Make car available again
        const carRef = ref(db, `cars/${carId}`);
        await update(carRef, {
          available: true,
          rentalId: null
        });

        alert('Rental marked as completed successfully!');
      } catch (error) {
        console.error('Error completing rental:', error);
        alert('Error completing rental: ' + error.message);
      }
    }
  };

  // Calculate time remaining for rented cars
  const calculateTimeRemaining = (rentalEndTime) => {
    const now = new Date();
    const endTime = new Date(rentalEndTime);
    const diff = endTime - now;
    
    if (diff <= 0) {
      return 'Rental expired';
    } else {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (days > 0) {
        return `${days}d ${hours}h ${minutes}m remaining`;
      } else {
        return `${hours}h ${minutes}m remaining`;
      }
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

  // Get active rentals only
  const activeRentals = rentals.filter(rental => rental.status === 'active');

  // Get rented cars with their rental information
  const getRentedCars = () => {
    return cars.map(car => {
      const rental = activeRentals.find(r => r.carId === car.id);
      return {
        ...car,
        rentalInfo: rental
      };
    });
  };

  const filteredCars = getRentedCars().filter(car => {
    switch (activeTab) {
      case 'rented':
        return car.rentalInfo;
      case 'available':
        return !car.rentalInfo && car.available;
      default:
        return true;
    }
  });

  if (loading && cars.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <div className="admin-actions">
          <span>Welcome, {currentUser?.email}</span>
          <button onClick={handleAddNew} className="btn btn-primary">Add New Car</button>
          <button onClick={handleBackToSite} className="btn btn-secondary">Back to Site</button>
          <button onClick={logout} className="btn btn-danger">Logout</button>
        </div>
      </div>

      {showForm && (
        <CarForm 
          car={editingCar} 
          onSubmit={handleFormSubmit}
          onClose={handleFormClose} 
        />
      )}

      {/* Rental Statistics */}
      <div className="rental-stats">
        <div className="stat-card">
          <h3>Total Cars</h3>
          <span className="stat-number">{cars.length}</span>
        </div>
        <div className="stat-card">
          <h3>Active Rentals</h3>
          <span className="stat-number rented">{activeRentals.length}</span>
        </div>
        <div className="stat-card">
          <h3>Completed Rentals</h3>
          <span className="stat-number completed">{rentals.filter(r => r.status === 'completed').length}</span>
        </div>
        <div className="stat-card">
          <h3>Available Cars</h3>
          <span className="stat-number available">
            {cars.filter(car => car.available && !activeRentals.find(r => r.carId === car.id)).length}
          </span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Cars ({cars.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'rented' ? 'active' : ''}`}
          onClick={() => setActiveTab('rented')}
        >
          Rented Cars ({activeRentals.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'available' ? 'active' : ''}`}
          onClick={() => setActiveTab('available')}
        >
          Available Cars ({cars.filter(car => car.available && !activeRentals.find(r => r.carId === car.id)).length})
        </button>
      </div>

      <div className="cars-list">
        <h2>
          {activeTab === 'all' && 'All Cars'}
          {activeTab === 'rented' && 'Currently Rented Cars'}
          {activeTab === 'available' && 'Available Cars'}
        </h2>
        
        {rentalsLoading ? (
          <div className="loading">Loading rental data...</div>
        ) : (
          <div className="cars-grid">
            {filteredCars.map(car => (
              <div key={car.id} className={`admin-car-card ${car.rentalInfo ? 'rented' : ''}`}>
                <div className="car-image">
                  <img 
                    src={car.image || '/placeholder-car.jpg'} 
                    alt={car.name}
                    onError={(e) => {
                      e.target.src = '/placeholder-car.jpg';
                    }}
                  />
                  {car.rentalInfo && (
                    <div className="rented-badge">RENTED</div>
                  )}
                </div>
                
                <div className="car-info">
                  <h3>{car.name}</h3>
                  <p>Type: {car.type}</p>
                  <p>Price: ${car.price}/day</p>
                  <p className={`status ${car.rentalInfo ? 'rented' : car.available ? 'available' : 'unavailable'}`}>
                    Status: {car.rentalInfo ? 'Rented' : car.available ? 'Available' : 'Not Available'}
                  </p>
                  
                  {/* Rental Information */}
                  {car.rentalInfo && (
                    <div className="rental-details">
                      <h4>Rental Information:</h4>
                      <div className="rental-info-item">
                        <strong>Customer:</strong> {car.rentalInfo.customerName}
                      </div>
                      <div className="rental-info-item">
                        <strong>Email:</strong> {car.rentalInfo.email}
                      </div>
                      <div className="rental-info-item">
                        <strong>Contact:</strong> {car.rentalInfo.phone}
                      </div>
                      <div className="rental-info-item">
                        <strong>ID Number:</strong> {car.rentalInfo.idNumber || 'N/A'}
                      </div>
                      <div className="rental-info-item">
                        <strong>License:</strong> {car.rentalInfo.licenseNumber || 'N/A'}
                      </div>
                      <div className="rental-info-item">
                        <strong>Rental Period:</strong> {car.rentalInfo.rentalDays} days
                      </div>
                      <div className="rental-info-item">
                        <strong>Start:</strong> {formatRentalDate(car.rentalInfo.rentalStartTime)}
                      </div>
                      <div className="rental-info-item">
                        <strong>End:</strong> {formatRentalDate(car.rentalInfo.rentalEndTime)}
                      </div>
                      <div className="rental-info-item">
                        <strong>Time Remaining:</strong> 
                        <span className="time-remaining">
                          {calculateTimeRemaining(car.rentalInfo.rentalEndTime)}
                        </span>
                      </div>
                      <div className="rental-info-item total">
                        <strong>Total:</strong> ${car.rentalInfo.totalPrice}
                      </div>
                      
                      <div className="rental-actions">
                        <button 
                          onClick={() => handleCompleteRental(car.rentalInfo.id, car.id)}
                          className="btn btn-success"
                        >
                          Mark as Completed
                        </button>
                        <button 
                          onClick={() => navigate(`/rental-details/${car.rentalInfo.id}`)}
                          className="btn btn-info"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="car-actions">
                    <button onClick={() => handleEdit(car)} className="btn btn-primary">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(car.id)} className="btn btn-danger">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {filteredCars.length === 0 && (
          <div className="no-cars">
            <p>No cars found for the selected filter.</p>
          </div>
        )}
      </div>

      {/* All Rentals Table */}
      <div className="rentals-section">
        <h2>All Rentals</h2>
        <div className="rentals-table-container">
          <table className="rentals-table">
            <thead>
              <tr>
                <th>Car</th>
                <th>Customer</th>
                <th>Contact</th>
                <th>Period</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map(rental => (
                <tr key={rental.id} className={`status-${rental.status}`}>
                  <td>
                    <div className="car-info-small">
                      <strong>{rental.carName}</strong>
                      <small>{rental.carType}</small>
                    </div>
                  </td>
                  <td>
                    <div>
                      <strong>{rental.customerName}</strong>
                      <small>{rental.email}</small>
                    </div>
                  </td>
                  <td>{rental.phone}</td>
                  <td>{rental.rentalDays} days</td>
                  <td>{formatRentalDate(rental.rentalStartTime)}</td>
                  <td>{formatRentalDate(rental.rentalEndTime)}</td>
                  <td>${rental.totalPrice}</td>
                  <td>
                    <span className={`status-badge ${rental.status}`}>
                      {rental.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button 
                        onClick={() => navigate(`/rental-details/${rental.id}`)}
                        className="btn btn-sm btn-info"
                      >
                        View
                      </button>
                      {rental.status === 'active' && (
                        <button 
                          onClick={() => handleCompleteRental(rental.id, rental.carId)}
                          className="btn btn-sm btn-success"
                        >
                          Complete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {rentals.length === 0 && !rentalsLoading && (
            <div className="no-rentals">
              <p>No rental records found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;