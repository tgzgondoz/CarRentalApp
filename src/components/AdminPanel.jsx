import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCars } from '../hooks/useCars';
import { db } from '../firebase/config';
import { ref, onValue, off, update } from 'firebase/database';
import CarForm from './CarForm';

const AdminPanel = () => {
  const { logout, currentUser } = useAuth();
  const { cars, loading, deleteCar, addCar, updateCar } = useCars();
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [rentals, setRentals] = useState([]);
  const [rentalsLoading, setRentalsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [expandedCards, setExpandedCards] = useState({});
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

    return () => {
      off(rentalsRef);
    };
  }, []);

  const toggleCardExpansion = (carId) => {
    setExpandedCards(prev => ({
      ...prev,
      [carId]: !prev[carId]
    }));
  };

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

  const handleCompleteRental = async (rentalId, carId) => {
    if (window.confirm('Are you sure you want to mark this rental as completed?')) {
      try {
        const rentalRef = ref(db, `rentals/${rentalId}`);
        await update(rentalRef, {
          status: 'completed',
          completedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });

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
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-gray-600 text-sm">Welcome, {currentUser?.email}</span>
            <button 
              onClick={handleAddNew}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Add New Car
            </button>
            <button 
              onClick={handleBackToSite}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
            >
              Back to Site
            </button>
            <button 
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
            >
              Logout
            </button>
          </div>
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Total Cars</h3>
          <span className="text-2xl font-bold text-gray-900">{cars.length}</span>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Active Rentals</h3>
          <span className="text-2xl font-bold text-orange-600">{activeRentals.length}</span>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Completed Rentals</h3>
          <span className="text-2xl font-bold text-green-600">
            {rentals.filter(r => r.status === 'completed').length}
          </span>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Available Cars</h3>
          <span className="text-2xl font-bold text-blue-600">
            {cars.filter(car => car.available && !activeRentals.find(r => r.carId === car.id)).length}
          </span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button 
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              activeTab === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All Cars ({cars.length})
          </button>
          <button 
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              activeTab === 'rented' 
                ? 'bg-orange-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('rented')}
          >
            Rented Cars ({activeRentals.length})
          </button>
          <button 
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              activeTab === 'available' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('available')}
          >
            Available Cars ({cars.filter(car => car.available && !activeRentals.find(r => r.carId === car.id)).length})
          </button>
        </div>
      </div>

      {/* Cars List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {activeTab === 'all' && 'All Cars'}
          {activeTab === 'rented' && 'Currently Rented Cars'}
          {activeTab === 'available' && 'Available Cars'}
        </h2>
        
        {rentalsLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading rental data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCars.map(car => {
              const isExpanded = expandedCards[car.id];
              const hasRental = !!car.rentalInfo;
              
              return (
                <div 
                  key={car.id} 
                  className={`bg-white border rounded-xl shadow-sm transition-all duration-200 cursor-pointer ${
                    hasRental ? 'border-orange-300 bg-orange-50' : 'border-gray-200'
                  } ${isExpanded ? 'ring-2 ring-blue-500' : 'hover:shadow-md'}`}
                  onClick={() => !isExpanded && toggleCardExpansion(car.id)}
                >
                  {/* Card Header */}
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="relative flex-shrink-0">
                        <img 
                          src={car.image || '/placeholder-car.jpg'} 
                          alt={car.name}
                          className="w-20 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = '/placeholder-car.jpg';
                          }}
                        />
                        {hasRental && (
                          <div className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                            RENTED
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-grow min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{car.name}</h3>
                        <p className="text-gray-600 text-sm">{car.type}</p>
                        <p className="text-blue-600 font-medium">${car.price}/day</p>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                          hasRental 
                            ? 'bg-orange-100 text-orange-800' 
                            : car.available 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {hasRental ? 'Rented' : car.available ? 'Available' : 'Unavailable'}
                        </div>
                      </div>
                      
                      <button 
                        className={`flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors duration-200 ${
                          isExpanded ? 'transform rotate-180' : ''
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCardExpansion(car.id);
                        }}
                      >
                        ▼
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 p-4">
                      {hasRental ? (
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Rental Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                              <div>
                                <span className="text-gray-600">Customer:</span>
                                <span className="ml-2 font-medium">{car.rentalInfo.customerName}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Email:</span>
                                <span className="ml-2 font-medium">{car.rentalInfo.email}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Contact:</span>
                                <span className="ml-2 font-medium">{car.rentalInfo.phone}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">ID Number:</span>
                                <span className="ml-2 font-medium">{car.rentalInfo.idNumber || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">License:</span>
                                <span className="ml-2 font-medium">{car.rentalInfo.licenseNumber || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Rental Period:</span>
                                <span className="ml-2 font-medium">{car.rentalInfo.rentalDays} days</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Start:</span>
                                <span className="ml-2 font-medium">{formatRentalDate(car.rentalInfo.rentalStartTime)}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">End:</span>
                                <span className="ml-2 font-medium">{formatRentalDate(car.rentalInfo.rentalEndTime)}</span>
                              </div>
                              <div className="md:col-span-2">
                                <span className="text-gray-600">Time Remaining:</span>
                                <span className={`ml-2 font-medium ${
                                  calculateTimeRemaining(car.rentalInfo.rentalEndTime).includes('expired') 
                                    ? 'text-red-600' 
                                    : 'text-orange-600'
                                }`}>
                                  {calculateTimeRemaining(car.rentalInfo.rentalEndTime)}
                                </span>
                              </div>
                              <div className="md:col-span-2 pt-2 border-t border-gray-200">
                                <span className="text-gray-600 font-semibold">Total:</span>
                                <span className="ml-2 font-bold text-lg text-green-600">${car.rentalInfo.totalPrice}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCompleteRental(car.rentalInfo.id, car.id);
                              }}
                              className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
                            >
                              Mark as Completed
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/rental-details/${car.rentalInfo.id}`);
                              }}
                              className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-gray-600">This car is currently available for rental.</p>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(car);
                          }}
                          className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                        >
                          Edit Car
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(car.id);
                          }}
                          className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
                        >
                          Delete Car
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        
        {filteredCars.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No cars found for the selected filter.</p>
          </div>
        )}
      </div>

      {/* All Rentals Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">All Rentals</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Car</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Contact</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Period</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Start Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">End Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map(rental => (
                <tr key={rental.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{rental.carName}</div>
                      <div className="text-sm text-gray-600">{rental.carType}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{rental.customerName}</div>
                      <div className="text-sm text-gray-600">{rental.email}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{rental.phone}</td>
                  <td className="py-3 px-4 text-gray-900">{rental.rentalDays} days</td>
                  <td className="py-3 px-4 text-gray-900 whitespace-nowrap">
                    {formatRentalDate(rental.rentalStartTime)}
                  </td>
                  <td className="py-3 px-4 text-gray-900 whitespace-nowrap">
                    {formatRentalDate(rental.rentalEndTime)}
                  </td>
                  <td className="py-3 px-4 font-semibold text-green-600">${rental.totalPrice}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      rental.status === 'active' 
                        ? 'bg-orange-100 text-orange-800'
                        : rental.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {rental.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => navigate(`/rental-details/${rental.id}`)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors duration-200"
                      >
                        View
                      </button>
                      {rental.status === 'active' && (
                        <button 
                          onClick={() => handleCompleteRental(rental.id, rental.carId)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors duration-200"
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
            <div className="text-center py-8">
              <p className="text-gray-600">No rental records found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;