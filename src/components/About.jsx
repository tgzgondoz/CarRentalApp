import { useState } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      bio: 'Former automotive industry executive with 15+ years of experience.'
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      role: 'Chief Operations Officer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      bio: 'Operations expert specializing in fleet management and customer experience.'
    },
    {
      id: 3,
      name: 'Emily Watson',
      role: 'Head of Customer Success',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      bio: 'Dedicated to ensuring every customer has an exceptional experience.'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Technology Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      bio: 'Tech innovator driving our digital transformation and platform development.'
    }
  ];

  const values = [
    {
      icon: '🚀',
      title: 'Innovation',
      description: 'Constantly evolving our services and technology to provide the best car rental experience.'
    },
    {
      icon: '🤝',
      title: 'Trust',
      description: 'Building lasting relationships through transparency, reliability, and exceptional service.'
    },
    {
      icon: '⭐',
      title: 'Excellence',
      description: 'Setting the highest standards in vehicle quality, maintenance, and customer care.'
    },
    {
      icon: '🌱',
      title: 'Sustainability',
      description: 'Committed to environmental responsibility through our growing electric vehicle fleet.'
    }
  ];

  const milestones = [
    { year: '2018', event: 'DriveEasy Founded', description: 'Started with 10 vehicles in a single location.' },
    { year: '2019', event: 'Expanded to 3 Cities', description: 'Grew our fleet to 50+ vehicles across multiple locations.' },
    { year: '2020', event: 'Digital Platform Launch', description: 'Introduced our mobile app and online booking system.' },
    { year: '2021', event: 'Electric Fleet Initiative', description: 'Added 20+ electric vehicles to our fleet.' },
    { year: '2022', event: 'National Expansion', description: 'Expanded operations to 10 major cities nationwide.' },
    { year: '2023', event: '100+ Vehicle Milestone', description: 'Reached 100+ premium vehicles in our fleet.' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Premium Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-white/90">ESTABLISHED 2018</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Crafting Excellence
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Where automotive passion meets unparalleled service. We don't just rent vehicles—we curate experiences that redefine mobility for the modern era.
            </p>
          </div>
        </div>
      </section>

      {/* Premium Mission & Vision Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Philosophy</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Redefining mobility through innovation, craftsmanship, and unwavering commitment to excellence.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-200/50">
              <nav className="flex -mb-px">
                {[
                  { id: 'mission', label: 'Our Mission' },
                  { id: 'vision', label: 'Our Vision' },
                  { id: 'approach', label: 'Our Approach' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-6 px-8 text-center font-semibold text-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-12">
              {activeTab === 'mission' && (
                <div className="text-center max-w-4xl mx-auto">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 text-white shadow-lg">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
                  <p className="text-gray-600 text-xl leading-relaxed">
                    To elevate transportation into an art form, providing meticulously curated vehicles and white-glove service that transforms every journey into an unforgettable experience. We believe mobility should inspire, empower, and delight.
                  </p>
                </div>
              )}

              {activeTab === 'vision' && (
                <div className="text-center max-w-4xl mx-auto">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 text-white shadow-lg">
                    <span className="text-3xl">🔭</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h3>
                  <p className="text-gray-600 text-xl leading-relaxed">
                    To establish the global benchmark for premium mobility services, where technology, sustainability, and luxury converge to create the world's most sophisticated transportation ecosystem.
                  </p>
                </div>
              )}

              {activeTab === 'approach' && (
                <div className="text-center max-w-4xl mx-auto">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 text-white shadow-lg">
                    <span className="text-3xl">💎</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Approach</h3>
                  <p className="text-gray-600 text-xl leading-relaxed">
                    Through obsessive attention to detail, cutting-edge technology, and a commitment to perfection, we craft experiences that anticipate desires and exceed the highest expectations of the most discerning clients.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Pillars of Excellence</h2>
            <p className="text-gray-600 text-lg">The foundation upon which we build extraordinary experiences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group text-center p-8 bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow-sm hover:shadow-2xl border border-gray-100 hover:border-blue-200 transition-all duration-500 hover:transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl">{value.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Timeline Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Evolution</h2>
            <p className="text-gray-600 text-lg">From visionary concept to industry benchmark</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-600"></div>
            
            {/* Milestones */}
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}>
                  {/* Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-blue-200 transition-all duration-500 group">
                      <div className="text-blue-600 font-bold text-xl mb-3 group-hover:scale-105 transition-transform duration-300">{milestone.year}</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{milestone.event}</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-white shadow-xl"></div>
                  
                  {/* Spacer */}
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Architects of Excellence</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Visionary leaders and specialists dedicated to crafting the future of premium mobility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="group text-center bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow-sm hover:shadow-2xl border border-gray-100 hover:border-blue-200 transition-all duration-500 hover:transform hover:-translate-y-2 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Experience Perfection
          </h2>
          <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Join the elite circle of clients who demand nothing but the extraordinary. Your journey to unparalleled mobility begins here.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link
              to="/"
              className="group relative bg-white text-gray-900 px-10 py-5 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 overflow-hidden text-lg"
            >
              <span className="relative z-10">Explore Our Collection</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <button className="group border-2 border-white/30 text-white px-10 py-5 rounded-xl font-bold hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300 text-lg">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;