import './CarCard.css'

const CarCard = ({ car }) => {
  return (
    <div className="car-card">
      <div className="car-image">
        <img src={car.image} alt={car.name} />
        <div className="car-type">{car.type}</div>
      </div>
      <div className="car-info">
        <h3>{car.name}</h3>
        <div className="car-features">
          {car.features.map((feature, index) => (
            <span key={index} className="feature-tag">{feature}</span>
          ))}
        </div>
        <div className="car-price">
          <span>${car.price}</span> / day
        </div>
        <button className="btn btn-primary">Rent Now</button>
      </div>
    </div>
  )
}

export default CarCard