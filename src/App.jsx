import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import CarList from './components/CarList';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import RentalForm from './components/RentalForm';
import RentalConfirmation from './components/RentalConfirmation';
import { useState } from 'react';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes with Header & Footer */}
            <Route path="/*" element={<PublicLayout />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

function PublicLayout() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Header />
      <main>
        <Routes>
          {/* Homepage with Hero and CarList */}
          <Route path="/" element={
            <>
              <Hero onSearch={setSearchTerm} />
              <CarList searchTerm={searchTerm} />
            </>
          } />
          
          {/* Rental Process Routes */}
          <Route path="/rent-car/:carId" element={<RentalForm />} />
          <Route path="/rental-confirmation/:carId" element={<RentalConfirmation />} />
          
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/admin/login" />;
}

export default App;