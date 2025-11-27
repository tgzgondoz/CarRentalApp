import { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactMethods = [
    {
      icon: '📞',
      title: 'Concierge Line',
      details: '+1 (555) 867-5309',
      description: 'Priority assistance Mon-Sun, 6am to 11pm EST',
      link: 'tel:+15558675309'
    },
    {
      icon: '✉️',
      title: 'Executive Email',
      details: 'concierge@driveeasy.com',
      description: 'Guaranteed response within 2 hours',
      link: 'mailto:concierge@driveeasy.com'
    },
    {
      icon: '📍',
      title: 'Flagship Location',
      details: 'One Premium Plaza, Suite 2500',
      description: 'By appointment only - valet parking included',
      link: 'https://maps.google.com'
    },
    {
      icon: '💎',
      title: 'VIP Service',
      details: 'Dedicated Manager',
      description: 'Personalized assistance for elite clients',
      link: '#vip'
    }
  ];

  const faqs = [
    {
      question: 'What documents are required for premium vehicle rental?',
      answer: 'We require a valid driver\'s license, primary credit card, and proof of insurance. For luxury and exotic vehicles, additional verification and security deposit may apply.'
    },
    {
      question: 'What is your cancellation policy for premium bookings?',
      answer: 'Premium reservations can be cancelled up to 48 hours prior without penalty. Within 48 hours, a 50% fee applies. VIP bookings have flexible cancellation terms.'
    },
    {
      question: 'Do you offer chauffeur services?',
      answer: 'Yes, we provide professional chauffeur services for all our premium vehicles. Advanced booking of 72 hours is recommended for executive chauffeur assignments.'
    },
    {
      question: 'What are your vehicle delivery options?',
      answer: 'We offer white-glove delivery service to airports, hotels, and residences within our service area. Same-day delivery available for VIP clients.'
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <span className="text-sm font-medium text-white/90">PRIORITY SUPPORT</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Concierge Access
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Your gateway to unparalleled service. Experience white-glove treatment with our dedicated team of mobility specialists, available to craft your perfect driving experience.
            </p>
          </div>
        </div>
      </section>

      {/* Premium Contact Methods */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Executive Communication Channels</h2>
            <p className="text-gray-600 text-lg">Multiple pathways to premium service excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-blue-200 transition-all duration-500 hover:transform hover:-translate-y-2 text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl">{method.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
                <p className="text-blue-600 font-semibold text-lg mb-2">{method.details}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{method.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Premium Contact Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Executive Inquiry Form</h2>
                <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                  Secure & Encrypted
                </div>
              </div>
              
              {submitStatus === 'success' && (
                <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-emerald-200 rounded-2xl">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl text-white">✓</span>
                    </div>
                    <div>
                      <p className="text-emerald-800 font-semibold text-lg">Message Received</p>
                      <p className="text-emerald-700">Your inquiry has been prioritized. An executive consultant will contact you within 30 minutes.</p>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl text-white">!</span>
                    </div>
                    <div>
                      <p className="text-red-800 font-semibold text-lg">Transmission Error</p>
                      <p className="text-red-700">Please try again or contact our concierge line directly for immediate assistance.</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                      placeholder="Johnathan Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                      placeholder="johnathan@enterprise.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-3">
                      Direct Line
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                      placeholder="+1 (555) 867-5309"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-3">
                      Inquiry Type *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    >
                      <option value="">Select priority level</option>
                      <option value="vip">VIP Concierge Service</option>
                      <option value="executive">Executive Fleet Inquiry</option>
                      <option value="chauffeur">Chauffeur Services</option>
                      <option value="corporate">Corporate Account</option>
                      <option value="partnership">Strategic Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-3">
                    Detailed Requirements *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm resize-vertical"
                    placeholder="Please describe your specific requirements, preferred vehicle types, dates, and any special accommodations needed..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 px-8 rounded-xl font-bold hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Processing Executive Request...
                    </>
                  ) : (
                    <>
                      Submit Priority Inquiry
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Premium Contact Info & FAQ */}
            <div className="space-y-8">
              {/* Executive Hours */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Service Excellence Hours</h3>
                <div className="space-y-6">
                  {[
                    { day: 'Monday - Friday', hours: '6:00 AM - 11:00 PM EST', badge: 'Premium' },
                    { day: 'Saturday', hours: '7:00 AM - 10:00 PM EST', badge: 'Elite' },
                    { day: 'Sunday', hours: '8:00 AM - 9:00 PM EST', badge: 'Select' },
                    { day: '24/7 Emergency', hours: 'Always Available', badge: 'VIP' }
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-4 border-b border-gray-100 last:border-b-0">
                      <div>
                        <span className="text-gray-800 font-semibold text-lg">{schedule.day}</span>
                        <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                          {schedule.badge}
                        </span>
                      </div>
                      <span className="text-blue-600 font-bold">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium FAQ */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">Executive FAQ</h3>
                  <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                    Most Inquired
                  </div>
                </div>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
                      <h4 className="font-bold text-gray-900 text-lg mb-3">{faq.question}</h4>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
                <Link
                  to="/faq"
                  className="inline-flex items-center text-blue-600 font-semibold mt-6 hover:text-blue-700 transition-colors group"
                >
                  Access Full Knowledge Base
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Map Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Flagship Experience Center</h2>
            <p className="text-gray-600 text-lg">Visit our exclusive showroom for a personalized consultation</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-2xl overflow-hidden h-96 relative border border-gray-200">
            {/* Premium Mock Map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-2xl">
                  <span className="text-3xl">🏛️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">DriveEasy Flagship</h3>
                <p className="text-gray-600 mb-2">One Premium Plaza, Suite 2500</p>
                <p className="text-gray-500 text-sm mb-6">Valet parking available • By appointment</p>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300">
                  Schedule Private Tour
                </button>
              </div>
            </div>
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
            Ready for Extraordinary Mobility?
          </h2>
          <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience the pinnacle of automotive excellence with our curated collection of premium vehicles and unparalleled service.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link
              to="/"
              className="group relative bg-white text-gray-900 px-12 py-5 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 overflow-hidden text-lg"
            >
              <span className="relative z-10">Explore Master Collection</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <button className="group border-2 border-white/30 text-white px-12 py-5 rounded-xl font-bold hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300 text-lg">
              Immediate Concierge
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;