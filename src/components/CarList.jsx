import { useCars } from '../hooks/useCars';
import CarCard from './CarCard';
import './CarList.css';

const CarList = ({ searchTerm }) => {
  const { cars, loading } = useCars();

  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading cars...</div>;
  }

  return (
    <section className="car-list">
      <div className="container">
        <h2>Available Cars ({filteredCars.length})</h2>
        <div className="cars-grid">
          {filteredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarList;