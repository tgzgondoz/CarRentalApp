import { useCars } from '../hooks/useCars';
import CarCard from './CarCard';

const CarList = ({ searchTerm }) => {
  const { cars, loading } = useCars();

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 text-lg">Loading premium vehicles...</p>
          </div>
        </div>
      </section>
    );
  }

  const filteredCars = cars.filter(car =>
    car.name?.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
    car.type?.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
    car.brand?.toLowerCase().includes(searchTerm?.toLowerCase() || '')
  );

  return (
    <section className="py-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Results Header */}
        {searchTerm ? (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Search Results for: <span className="text-blue-600">"{searchTerm}"</span>
            </h3>
            <p className="text-gray-600">
              Found <span className="font-semibold text-blue-600">{filteredCars.length}</span> 
              {filteredCars.length === 1 ? ' vehicle' : ' vehicles'} matching your criteria
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Available Cars
            </h2>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {filteredCars.length}
            </span>
          </div>
        )}
        
        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        
        {/* No Results State */}
        {filteredCars.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg 
                  className="w-12 h-12 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No vehicles found
              </h3>
              <p className="text-gray-600">
                We couldn't find any cars matching "{searchTerm}". Try searching with different 
                keywords or browse our entire collection.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CarList;