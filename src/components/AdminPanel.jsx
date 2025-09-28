import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCars } from '../hooks/useCars';
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

  // Fetch rentals data (mock implementation - replace with your actual rentals data source)
  useEffect(() => {
    const fetchRentals = async () => {
      try {
        setRentalsLoading(true);
        // Mock rentals data - replace with your actual API call
        const mockRentals = [
          {
            id: '1',
            carId: 'tata-punch',
            carName: 'Tata Punch',
            customerName: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            rentalDays: 3,
            startDate: '2024-01-15',
            rentalStartTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
            rentalEndTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
            totalPrice: 39,
            status: 'active',
            idFileUrl: '',
            licenseFileUrl: ''
          },
          {
            id: '2',
            carId: 'volvo-ex30',
            carName: 'Volvo EX30',
            customerName: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+0987654321',
            rentalDays: 7,
            startDate: '2024-01-10',
            rentalStartTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
            rentalEndTime: new Date(Date.now()).toISOString(), // Ending today
            totalPrice: 238,
            status: 'active',
            idFileUrl: '',
            licenseFileUrl: ''
          }
        ];
        setRentals(mockRentals);
      } catch (error) {
        console.error('Error fetching rentals:', error);
      } finally {
        setRentalsLoading(false);
      }
    };

    fetchRentals();
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

  // Get rented cars with their rental information
  const getRentedCars = () => {
    return cars.map(car => {
      const rental = rentals.find(r => r.carId === car.id && r.status === 'active');
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
          <h3>Rented Cars</h3>
          <span className="stat-number rented">{rentals.filter(r => r.status === 'active').length}</span>
        </div>
        <div className="stat-card">
          <h3>Available Cars</h3>
          <span className="stat-number available">{cars.filter(car => car.available && !rentals.find(r => r.carId === car.id && r.status === 'active')).length}</span>
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
          Rented Cars ({rentals.filter(r => r.status === 'active').length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'available' ? 'active' : ''}`}
          onClick={() => setActiveTab('available')}
        >
          Available Cars ({cars.filter(car => car.available && !rentals.find(r => r.carId === car.id && r.status === 'active')).length})
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
                        <strong>Contact:</strong> {car.rentalInfo.phone}
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
                    </div>
                  )}
                  
                  <div className="car-actions">
                    <button onClick={() => handleEdit(car)} className="btn btn-primary">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(car.id)} className="btn btn-danger">
                      Delete
                    </button>
                    {car.rentalInfo && (
                      <button 
                        onClick={() => navigate(`/rental-details/${car.rentalInfo.id}`)}
                        className="btn btn-info"
                      >
                        View Rental
                      </button>
                    )}
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
    </div>
  );
};

export default AdminPanel;