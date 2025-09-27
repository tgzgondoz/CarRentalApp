import { useCars } from '../hooks/useCars';
import CarCard from './CarCard';
import './CarList.css';

const CarList = ({ searchTerm }) => {
  const { cars, loading } = useCars();

  if (loading) {
    return (
      <section className="car-list">
        <div className="container">
          <div className="loading">
            <div className="loading-spinner"></div>
            Loading premium vehicles...
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
    <section className="car-list">
      <div className="container">
        {searchTerm ? (
          <div className="search-results-header">
            <h3>
              Search Results for: <span className="search-query">"{searchTerm}"</span>
            </h3>
            <p className="results-info">
              Found <span className="results-count">{filteredCars.length}</span> vehicles matching your criteria
            </p>
          </div>
        ) : (
          <h2>
            Available Cars 
            <span className="filter-badge">{filteredCars.length}</span>
          </h2>
        )}
        
        <div className="cars-grid">
          {filteredCars.map((car, index) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        
        {filteredCars.length === 0 && (
          <div className="no-cars">
            <h3>No vehicles found</h3>
            <p>We couldn't find any cars matching "{searchTerm}". Try searching with different keywords or browse our entire collection.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CarList;