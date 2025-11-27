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
import Cars from './components/Cars';
import About from './components/About';
import Contact from './components/Contact';
import { useState } from 'react';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen flex flex-col">
          <Routes>
            {/* Public Routes with Header & Footer */}
            <Route path="/*" element={<PublicLayout />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

function PublicLayout() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          {/* Homepage with Hero and CarList */}
          <Route path="/" element={
            <div className="w-full">
              <Hero onSearch={setSearchTerm} />
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <CarList searchTerm={searchTerm} />
              </div>
            </div>
          } />
          
          {/* Dedicated Cars Page */}
          <Route path="/cars" element={
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
              <Cars />
            </div>
          } />
          
          {/* About Page */}
          <Route path="/about" element={
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
              <About />
            </div>
          } />
          
          {/* Contact Page */}
          <Route path="/contact" element={
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
              <Contact />
            </div>
          } />
          
          {/* Rental Process Routes */}
          <Route path="/rent-car/:carId" element={
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
              <RentalForm />
            </div>
          } />
          <Route path="/rental-confirmation/:carId" element={
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
              <RentalConfirmation />
            </div>
          } />
          
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/admin/login" />;
}

export default App;