import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { ref, onValue, push, update, remove } from 'firebase/database';

export const useCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carsRef = ref(db, 'cars');
    
    const unsubscribe = onValue(carsRef, (snapshot) => {
      const carsData = snapshot.val();
      if (carsData) {
        const carsArray = Object.keys(carsData).map(key => ({
          id: key,
          ...carsData[key]
        }));
        setCars(carsArray);
      } else {
        setCars([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addCar = async (carData) => {
    try {
      const carsRef = ref(db, 'cars');
      await push(carsRef, {
        ...carData,
        createdAt: new Date().toISOString(),
        available: true
      });
    } catch (error) {
      throw new Error('Failed to add car: ' + error.message);
    }
  };

  const updateCar = async (carId, carData) => {
    try {
      const carRef = ref(db, `cars/${carId}`);
      await update(carRef, carData);
    } catch (error) {
      throw new Error('Failed to update car: ' + error.message);
    }
  };

  const deleteCar = async (carId) => {
    try {
      const carRef = ref(db, `cars/${carId}`);
      await remove(carRef);
    } catch (error) {
      throw new Error('Failed to delete car: ' + error.message);
    }
  };

  return { cars, loading, addCar, updateCar, deleteCar };
};