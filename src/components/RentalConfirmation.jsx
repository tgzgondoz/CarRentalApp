import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const RentalConfirmation = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [rentalRecord, setRentalRecord] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (location.state?.rentalRecord) {
      setRentalRecord(location.state.rentalRecord);
      calculateTimeLeft(location.state.rentalRecord.rentalEndTime);
    }
  }, [location]);

  const calculateTimeLeft = (endTime) => {
    const difference = new Date(endTime).getTime() - new Date().getTime();
    if (difference <= 0) return;

    setTimeLeft({
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    });
  };

  useEffect(() => {
    if (!rentalRecord) return;

    const timer = setInterval(() => {
      calculateTimeLeft(rentalRecord.rentalEndTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [rentalRecord]);

  if (!rentalRecord) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Rental Not Found</h2>
          <p className="text-gray-600 mb-6">The rental information could not be found. Please check your rental history or contact support.</p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Rental Confirmed!</h2>
          <p className="text-xl text-gray-600">Your rental has been successfully processed</p>
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-green-800 font-medium">
              Confirmation ID: <span className="font-mono">{rentalRecord.id}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Car Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Car Details Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Rental Details</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Vehicle</span>
                  <span className="font-semibold text-gray-900">{rentalRecord.carName}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Rental Period</span>
                  <span className="font-semibold text-gray-900">{rentalRecord.rentalDays} days</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Daily Rate</span>
                  <span className="font-semibold text-gray-900">${rentalRecord.dailyRate || Math.round(rentalRecord.totalPrice / rentalRecord.rentalDays)}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600 text-lg font-semibold">Total Amount</span>
                  <span className="text-2xl font-bold text-green-600">${rentalRecord.totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Full Name</span>
                  <span className="font-medium text-gray-900">{rentalRecord.customerName}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Email Address</span>
                  <span className="font-medium text-gray-900">{rentalRecord.email}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Phone Number</span>
                  <span className="font-medium text-gray-900">{rentalRecord.phone}</span>
                </div>
                {rentalRecord.idNumber && (
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">ID Number</span>
                    <span className="font-medium text-gray-900">{rentalRecord.idNumber}</span>
                  </div>
                )}
                {rentalRecord.licenseNumber && (
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">License Number</span>
                    <span className="font-medium text-gray-900">{rentalRecord.licenseNumber}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Countdown and Actions */}
          <div className="space-y-6">
            {/* Countdown Timer */}
            {timeLeft && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Rental Time Remaining</h3>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <div className="text-center">
                    <div className="bg-blue-600 text-white rounded-lg p-3 mb-2">
                      <span className="text-2xl font-bold block">{timeLeft.days.toString().padStart(2, '0')}</span>
                    </div>
                    <span className="text-xs text-gray-600 font-medium">DAYS</span>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-600 text-white rounded-lg p-3 mb-2">
                      <span className="text-2xl font-bold block">{timeLeft.hours.toString().padStart(2, '0')}</span>
                    </div>
                    <span className="text-xs text-gray-600 font-medium">HOURS</span>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-600 text-white rounded-lg p-3 mb-2">
                      <span className="text-2xl font-bold block">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                    </div>
                    <span className="text-xs text-gray-600 font-medium">MINUTES</span>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-600 text-white rounded-lg p-3 mb-2">
                      <span className="text-2xl font-bold block">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                    </div>
                    <span className="text-xs text-gray-600 font-medium">SECONDS</span>
                  </div>
                </div>
                <div className="text-center text-sm text-gray-600">
                  Rental ends on {new Date(rentalRecord.rentalEndTime).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Next Steps</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/my-rentals')}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  View My Rentals
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                >
                  Back to Home
                </button>
                <button 
                  onClick={() => window.print()}
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Print Confirmation
                </button>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
              <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
              <p className="text-blue-800 text-sm mb-3">
                Our customer support team is available 24/7 to assist you.
              </p>
              <div className="space-y-1 text-sm text-blue-700">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (263) 783 242 506
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  tgzgondozz@gmail.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalConfirmation;