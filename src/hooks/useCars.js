import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { ref, onValue } from 'firebase/database';

export const useCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carsRef = ref(db, 'cars');
    
    const unsubscribe = onValue(carsRef, 
      (snapshot) => {
        try {
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
          setError(null);
        } catch (err) {
          setError('Error loading cars');
          setLoading(false);
        }
      },
      (error) => {
        setError('Failed to load cars: ' + error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // For admin functions (add, update, delete)
  const addCar = async (carData) => {
    try {
      const { push } = await import('firebase/database');
      const carsRef = ref(db, 'cars');
      await push(carsRef, {
        ...carData,
        createdAt: new Date().toISOString(),
        available: carData.available !== undefined ? carData.available : true
      });
    } catch (error) {
      throw new Error('Failed to add car: ' + error.message);
    }
  };

  const updateCar = async (carId, carData) => {
    try {
      const { update } = await import('firebase/database');
      const carRef = ref(db, `cars/${carId}`);
      await update(carRef, carData);
    } catch (error) {
      throw new Error('Failed to update car: ' + error.message);
    }
  };

  const deleteCar = async (carId) => {
    try {
      const { remove } = await import('firebase/database');
      const carRef = ref(db, `cars/${carId}`);
      await remove(carRef);
    } catch (error) {
      throw new Error('Failed to delete car: ' + error.message);
    }
  };

  return { cars, loading, error, addCar, updateCar, deleteCar };
};