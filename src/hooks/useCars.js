import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';

export const useCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'cars'));
      const carsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCars(carsData);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCar = async (carData, imageFile) => {
    try {
      let imageUrl = '';
      
      if (imageFile) {
        const imageRef = ref(storage, `cars/${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      const carWithImage = {
        ...carData,
        image: imageUrl,
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'cars'), carWithImage);
      await fetchCars();
    } catch (error) {
      console.error('Error adding car:', error);
      throw error;
    }
  };

  const updateCar = async (carId, carData, imageFile) => {
    try {
      let imageUrl = carData.image;
      
      if (imageFile) {
        const imageRef = ref(storage, `cars/${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      const carWithImage = {
        ...carData,
        image: imageUrl,
        updatedAt: new Date().toISOString()
      };

      await updateDoc(doc(db, 'cars', carId), carWithImage);
      await fetchCars();
    } catch (error) {
      console.error('Error updating car:', error);
      throw error;
    }
  };

  const deleteCar = async (carId) => {
    try {
      await deleteDoc(doc(db, 'cars', carId));
      await fetchCars();
    } catch (error) {
      console.error('Error deleting car:', error);
      throw error;
    }
  };

  return {
    cars,
    loading,
    addCar,
    updateCar,
    deleteCar,
    refetch: fetchCars
  };
};