import { useCars } from '../hooks/useCars';
import CarCard from './CarCard';
import { useState, useEffect } from 'react';

const CarList = ({ searchTerm }) => {
  const { cars, loading } = useCars();
  const [filteredCars, setFilteredCars] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort cars
  useEffect(() => {
    let results = cars.filter(car =>
      car.name?.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
      car.type?.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
      car.brand?.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
      car.features?.some(feature => 
        feature.toLowerCase().includes(searchTerm?.toLowerCase() || '')
      )
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        results = results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results = results.sort((a, b) => b.price - a.price);
        break;
      case 'year-new':
        results = results.sort((a, b) => b.year - a.year);
        break;
      case 'year-old':
        results = results.sort((a, b) => a.year - b.year);
        break;
      case 'name':
        results = results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Featured sorting (default)
        break;
    }

    setFilteredCars(results);
  }, [cars, searchTerm, sortBy]);

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center py-20">
            {/* Enhanced loading animation */}
            <div className="relative mb-6">
              <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-4 border-blue-600 rounded-full animate-ping"></div>
            </div>
            <p className="text-gray-700 text-lg font-medium mb-2">Loading Premium Vehicles</p>
            <p className="text-gray-500 text-sm">Curating the best cars for you...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Enhanced Header Section */}
        <div className="mb-10">
          {searchTerm ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    Search Results for:{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      "{searchTerm}"
                    </span>
                  </h1>
                  <div className="flex items-center gap-4 text-gray-600">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-semibold text-gray-900">{filteredCars.length}</span>
                      {filteredCars.length === 1 ? ' vehicle found' : ' vehicles found'}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span>Ready for delivery</span>
                  </div>
                </div>
                
                {/* Sort Dropdown */}
                <div className="mt-4 lg:mt-0">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="year-new">Year: Newest First</option>
                    <option value="year-old">Year: Oldest First</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-6">
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">
                      Premium Collection
                    </h2>
                    <p className="text-gray-600 text-lg">
                      Discover our curated selection of luxury vehicles
                    </p>
                  </div>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                    {filteredCars.length} Vehicles
                  </span>
                </div>

                {/* Filter Toggle */}
                <div className="flex gap-3 mt-4 lg:mt-0">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-sm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                    </svg>
                    Filters
                  </button>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-6 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="year-new">Year: Newest First</option>
                    <option value="year-old">Year: Oldest First</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Price Range</label>
                  <div className="space-y-2">
                    <button className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      Under $30,000
                    </button>
                    <button className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      $30,000 - $50,000
                    </button>
                    <button className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      $50,000 - $80,000
                    </button>
                    <button className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      Over $80,000
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Vehicle Type</label>
                  <div className="space-y-2">
                    <button className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      SUV
                    </button>
                    <button className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      Sedan
                    </button>
                    <button className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      Sports Car
                    </button>
                    <button className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      Electric
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Brand</label>
                  <div className="space-y-2">
                    <button className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      BMW
                    </button>
                    <button className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      Mercedes
                    </button>
                    <button className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      Audi
                    </button>
                    <button className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      Tesla
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Year</label>
                  <div className="space-y-2">
                    <button className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      2020 - 2022
                    </button>
                    <button className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      2023
                    </button>
                    <button className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      2024
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Cars Grid */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          /* Enhanced No Results State */
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="text-center py-20 px-6">
              <div className="max-w-md mx-auto">
                {/* Animated illustration */}
                <div className="w-32 h-32 mx-auto mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full animate-pulse"></div>
                  <svg 
                    className="w-20 h-20 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  No vehicles found
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  We couldn't find any cars matching "{searchTerm}". Try searching with different 
                  keywords like "SUV", "Electric", or browse our entire collection.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Browse All Vehicles
                  </button>
                  <button className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Load More / Pagination (Optional) */}
        {filteredCars.length > 0 && (
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <p className="text-gray-600 mb-4">
                Showing {filteredCars.length} of {cars.length} premium vehicles
              </p>
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                Load More Vehicles
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CarList;