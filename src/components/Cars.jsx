import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CarList from './CarList';
import SearchBar from './SearchBar';

const Cars = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const location = useLocation();

  // Handle search from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [location.search]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Premium Hero Section - Responsive */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white py-12 xs:py-16 sm:py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Premium Badge */}
            <div className="inline-flex items-center px-3 xs:px-4 py-1 xs:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 xs:mb-8">
              <span className="w-1.5 xs:w-2 h-1.5 xs:h-2 bg-emerald-400 rounded-full mr-1 xs:mr-2 animate-pulse"></span>
              <span className="text-xs xs:text-sm font-medium text-white/90">PREMIUM COLLECTION</span>
            </div>

            {/* Main Heading */}
            <div className="mb-6 xs:mb-8">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 xs:mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent px-2 xs:px-0">
                Elevate Your Drive
              </h1>
              <p className="text-base xs:text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed px-2 xs:px-0">
                Curated excellence meets automotive perfection. Experience unparalleled luxury with our hand-picked selection of premium vehicles designed for the discerning driver.
              </p>
            </div>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-4xl mx-auto px-2 xs:px-0">
              <div className="relative">
                <SearchBar
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onClear={handleClearSearch}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  placeholder="Discover your next masterpiece... (e.g., Performance, Luxury, Executive)"
                  className="transform transition-all duration-300 hover:scale-[1.02] backdrop-blur-lg bg-white/10 border-white/20"
                />
                
                {/* Premium Search Suggestions */}
                {isSearchFocused && !searchTerm && (
                  <div className="absolute top-full mt-2 xs:mt-3 w-full backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl xs:rounded-2xl shadow-2xl p-4 xs:p-6 z-50 max-h-[60vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-3 xs:mb-4">
                      <p className="text-white/80 text-xs xs:text-sm font-semibold">REFINE YOUR SEARCH</p>
                      <span className="text-xs text-white/60">AI-Powered</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 xs:gap-3">
                      {[
                        { label: 'Executive', emoji: '👑', count: '12' },
                        { label: 'Performance', emoji: '⚡', count: '8' },
                        { label: 'Luxury SUV', emoji: '🚙', count: '15' },
                        { label: 'Electric', emoji: '🔋', count: '9' },
                        { label: 'Coupe', emoji: '🏎️', count: '6' },
                        { label: 'Convertible', emoji: '🌅', count: '4' },
                        { label: 'German', emoji: '🇩🇪', count: '11' },
                        { label: 'British', emoji: '🇬🇧', count: '7' }
                      ].map((suggestion) => (
                        <button
                          key={suggestion.label}
                          onClick={() => setSearchTerm(suggestion.label)}
                          className="group p-2 xs:p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg xs:rounded-xl transition-all duration-200 text-left min-h-[60px] xs:min-h-0"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-base xs:text-lg">{suggestion.emoji}</span>
                            <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">
                              {suggestion.count}
                            </span>
                          </div>
                          <div className="text-white/90 font-medium text-xs xs:text-sm group-hover:text-white transition-colors">
                            {suggestion.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Stats Section - Responsive */}
      <section className="bg-white/80 backdrop-blur-sm py-8 xs:py-10 sm:py-12 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 sm:gap-8">
            {[
              { number: '50+', label: 'Curated Vehicles', suffix: 'units' },
              { number: '15+', label: 'Elite Brands', suffix: 'worldwide' },
              { number: '10+', label: 'Vehicle Classes', suffix: 'categories' },
              { number: '24/7', label: 'Concierge', suffix: 'support' }
            ].map((stat, index) => (
              <div key={stat.label} className="text-center group">
                <div className="relative inline-block">
                  <div className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-1 xs:mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 mx-auto"></div>
                </div>
                <div className="text-gray-600 font-medium text-sm xs:text-base">{stat.label}</div>
                <div className="text-xs text-gray-400 mt-0.5 xs:mt-1">{stat.suffix}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Car List Section */}
      <CarList searchTerm={searchTerm} />

      {/* Premium Features Section - Responsive */}
      {!searchTerm && (
        <section className="bg-gradient-to-b from-gray-50 to-white py-12 xs:py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 xs:mb-12 sm:mb-16">
              <div className="inline-flex items-center px-3 xs:px-4 py-1 xs:py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs xs:text-sm font-medium mb-3 xs:mb-4">
                WHY CHOOSE EXCELLENCE
              </div>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-3 xs:mb-4">
                The Premium Difference
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm xs:text-base sm:text-lg px-2 xs:px-0">
                Where exceptional service meets automotive perfection. Every detail crafted for your elevated experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: "Certified Excellence",
                  description: "Each vehicle undergoes our 200-point certification process, ensuring absolute perfection in every detail."
                },
                {
                  icon: (
                    <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ),
                  title: "Discrete Service",
                  description: "Experience unparalleled privacy and personalized attention with our exclusive concierge service."
                },
                {
                  icon: (
                    <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: "Instant Response",
                  description: "24/7 dedicated support team ensuring your needs are met with speed and precision at all times."
                }
              ].map((feature, index) => (
                <div key={feature.title} className="group p-4 xs:p-6 sm:p-8 bg-white rounded-xl xs:rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-100 transition-all duration-500">
                  <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl xs:rounded-2xl flex items-center justify-center text-white mb-4 xs:mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg xs:text-xl font-bold text-gray-900 mb-2 xs:mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm xs:text-base">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Enhanced CTA Section - Responsive */}
      {searchTerm && (
        <section className="bg-gradient-to-r from-gray-900 to-blue-900 py-12 xs:py-14 sm:py-16 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>
          
          <div className="relative max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-3 xs:mb-4">
              Ready for Excellence?
            </h2>
            <p className="text-blue-100 text-sm xs:text-base sm:text-lg mb-6 xs:mb-8 max-w-2xl mx-auto leading-relaxed px-2 xs:px-0">
              Your curated selection awaits. Schedule a private viewing or speak with our automotive specialists to experience perfection firsthand.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 justify-center items-center">
              <button className="group relative bg-white text-gray-900 px-6 xs:px-8 py-3 xs:py-4 rounded-lg xs:rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 overflow-hidden min-h-[50px] xs:min-h-0 w-full sm:w-auto text-sm xs:text-base">
                <span className="relative z-10">Schedule Private Viewing</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="group border-2 border-white/30 text-white px-6 xs:px-8 py-3 xs:py-4 rounded-lg xs:rounded-xl font-semibold hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300 min-h-[50px] xs:min-h-0 w-full sm:w-auto text-sm xs:text-base">
                Contact Concierge
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Cars;