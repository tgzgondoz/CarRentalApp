import './CarCard.css';

const CarCard = ({ car }) => {
  return (
    <div className="car-card">
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
        <p className="car-type">{car.type}</p>
        <p className="car-price">${car.price}/day</p>
        <p className="car-description">{car.description}</p>
        {car.features && (
          <p className="car-features">Features: {car.features}</p>
        )}
        <div className={`car-status ${car.available ? 'available' : 'unavailable'}`}>
          {car.available ? 'Available' : 'Not Available'}
        </div>
      </div>
    </div>
  );
};

export default CarCard;