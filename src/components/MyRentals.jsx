// components/MyRentals.jsx
import { useAuth } from '../context/AuthContext';

const MyRentals = () => {
  const { currentUser } = useAuth();
  // Fetch and display user's rentals
  return (
    <div className="my-rentals">
      <h2>My Rentals</h2>
      {/* Display rental history */}
    </div>
  );
};

export default MyRentals;