import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { ref, query, orderByChild, equalTo, onValue, off } from 'firebase/database';

const MyRentals = () => {
  const { currentUser } = useAuth();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    if (!currentUser) return;

    const rentalsRef = ref(db, 'rentals');
    const userRentalsQuery = query(
      rentalsRef,
      orderByChild('userId'),
      equalTo(currentUser.uid)
    );

    const fetchRentals = () => {
      try {
        setLoading(true);
        onValue(userRentalsQuery, (snapshot) => {
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
          
          // Sort by creation date, newest first
          rentalsList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setRentals(rentalsList);
          setLoading(false);
        }, (error) => {
          console.error('Error fetching rentals:', error);
          setLoading(false);
        });

      } catch (error) {
        console.error('Error setting up rentals listener:', error);
        setLoading(false);
      }
    };

    fetchRentals();

    return () => {
      off(userRentalsQuery);
    };
  }, [currentUser]);

  const filteredRentals = rentals.filter(rental => {
    if (activeTab === 'active') return rental.status === 'active';
    if (activeTab === 'completed') return rental.status === 'completed';
    if (activeTab === 'cancelled') return rental.status === 'cancelled';
    return true;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
      
      if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ${hours} hour${hours > 1 ? 's' : ''} remaining`;
      } else {
        return `${hours} hour${hours > 1 ? 's' : ''} remaining`;
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-orange-100 text-orange-800', label: 'Active' },
      completed: { color: 'bg-green-100 text-green-800', label: 'Completed' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
      pending: { color: 'bg-blue-100 text-blue-800', label: 'Pending' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your rentals</h2>
          <p className="text-gray-600">You need to be logged in to access your rental history.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your rentals...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Rentals</h1>
          <p className="text-gray-600">Manage and view your current and past vehicle rentals</p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{rentals.length}</div>
            <div className="text-gray-600 text-sm">Total Rentals</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {rentals.filter(r => r.status === 'active').length}
            </div>
            <div className="text-gray-600 text-sm">Active</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {rentals.filter(r => r.status === 'completed').length}
            </div>
            <div className="text-gray-600 text-sm">Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {rentals.filter(r => r.status === 'pending').length}
            </div>
            <div className="text-gray-600 text-sm">Pending</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                { id: 'all', label: 'All Rentals', count: rentals.length },
                { id: 'active', label: 'Active', count: rentals.filter(r => r.status === 'active').length },
                { id: 'completed', label: 'Completed', count: rentals.filter(r => r.status === 'completed').length },
                { id: 'cancelled', label: 'Cancelled', count: rentals.filter(r => r.status === 'cancelled').length }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Rentals List */}
          <div className="p-6">
            {filteredRentals.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No rentals found</h3>
                <p className="text-gray-600">
                  {activeTab === 'all' 
                    ? "You haven't made any rentals yet."
                    : `You don't have any ${activeTab} rentals.`
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRentals.map(rental => (
                  <div key={rental.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      {/* Rental Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {rental.carName}
                            </h3>
                            <p className="text-gray-600 text-sm">{rental.carType}</p>
                          </div>
                          {getStatusBadge(rental.status)}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Rental Period:</span>
                            <span className="ml-2 font-medium">{rental.rentalDays} days</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Start Date:</span>
                            <span className="ml-2 font-medium">{formatDate(rental.rentalStartTime)}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">End Date:</span>
                            <span className="ml-2 font-medium">{formatDate(rental.rentalEndTime)}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Total Price:</span>
                            <span className="ml-2 font-bold text-green-600">${rental.totalPrice}</span>
                          </div>
                        </div>

                        {/* Time Remaining for Active Rentals */}
                        {rental.status === 'active' && (
                          <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-orange-800 font-medium">Time remaining:</span>
                              <span className="text-orange-600 font-semibold">
                                {calculateTimeRemaining(rental.rentalEndTime)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 lg:w-48">
                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm">
                          View Details
                        </button>
                        {rental.status === 'active' && (
                          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium text-sm">
                            Extend Rental
                          </button>
                        )}
                        {rental.status === 'active' && (
                          <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium text-sm">
                            Cancel Rental
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRentals;