import { useCars } from '../hooks/useCars';
import CarCard from './CarCard';
import './CarList.css';

const CarList = ({ searchTerm }) => {
  const { cars, loading } = useCars();

  if (loading) {
    return <div className="loading">Loading cars...</div>;
  }

  const filteredCars = cars.filter(car =>
    car.name?.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
    car.type?.toLowerCase().includes(searchTerm?.toLowerCase() || '')
  );

  return (
    <section className="car-list">
      <div className="container">
        <h2>Available Cars ({filteredCars.length})</h2>
        <div className="cars-grid">
          {filteredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        {filteredCars.length === 0 && (
          <div className="no-cars">No cars found matching your search.</div>
        )}
      </div>
    </section>
  );
};

export default CarList;