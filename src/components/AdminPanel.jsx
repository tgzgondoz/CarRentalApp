import { useState } from 'react';
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
  const navigate = useNavigate();

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
          <button onClick={logout} className="btn btn-secondary">Logout</button>
        </div>
      </div>

      {showForm && (
        <CarForm 
          car={editingCar} 
          onSubmit={handleFormSubmit}
          onClose={handleFormClose} 
        />
      )}

      <div className="cars-list">
        <h2>Manage Cars ({cars.length})</h2>
        <div className="cars-grid">
          {cars.map(car => (
            <div key={car.id} className="admin-car-card">
              <div className="car-image">
                <img 
                  src={car.image || '/placeholder-car.jpg'} 
                  alt={car.name}
                  onError={(e) => {
                    e.target.src = '/placeholder-car.jpg';
                  }}
                />
              </div>
              <div className="car-info">
                <h3>{car.name}</h3>
                <p>Type: {car.type}</p>
                <p>Price: ${car.price}/day</p>
                <p>Status: {car.available ? 'Available' : 'Not Available'}</p>
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
      </div>
    </div>
  );
};

export default AdminPanel;