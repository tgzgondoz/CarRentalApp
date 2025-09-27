import { useState } from 'react'
import CarCard from './CarCard'
import './CarList.css'

const CarList = ({ searchTerm }) => {
  const [cars] = useState([
    {
      id: 1,
      name: "Toyota Camry",
      type: "Sedan",
      price: 45,
      image: "/car1.jpg",
      features: ["Automatic", "5 Seats", "Air Conditioning"]
    },
    {
      id: 2,
      name: "Ford Mustang",
      type: "Sports",
      price: 75,
      image: "/car2.jpg",
      features: ["Manual", "4 Seats", "Premium Sound"]
    },
    {
      id: 3,
      name: "Honda CR-V",
      type: "SUV",
      price: 55,
      image: "/car3.jpg",
      features: ["Automatic", "7 Seats", "4WD"]
    },
    {
      id: 4,
      name: "BMW X5",
      type: "Luxury SUV",
      price: 95,
      image: "/car4.jpg",
      features: ["Automatic", "5 Seats", "Leather Seats"]
    },
    {
      id: 5,
      name: "Tesla Model 3",
      type: "Electric",
      price: 65,
      image: "/car5.jpg",
      features: ["Automatic", "5 Seats", "Self Driving"]
    },
    {
      id: 6,
      name: "Chevrolet Tahoe",
      type: "Large SUV",
      price: 85,
      image: "/car6.jpg",
      features: ["Automatic", "8 Seats", "Towing Package"]
    }
  ])

  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section className="car-list">
      <div className="container">
        <h2>Available Cars</h2>
        <div className="cars-grid">
          {filteredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CarList