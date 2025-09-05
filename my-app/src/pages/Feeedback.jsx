import React, { useState, useEffect } from 'react'; // Add useEffect import
import { motion } from 'framer-motion';
import { FaEnvelope, FaPaperPlane, FaStar, FaUserCircle } from 'react-icons/fa';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [feedbackType, setFeedbackType] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    state: '',
    city: ''
  });

  // Simple state->cities mapping (sample)
  const stateToCities = {
    Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Junagadh'],
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
    Rajasthan: ['Jaipur', 'Udaipur', 'Jodhpur'],
    Karnataka: ['Bengaluru', 'Mysuru', 'Mangaluru']
  };
  const stateOptions = Object.keys(stateToCities);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []); // Empty dependency array ensures this runs only on mount

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: custom => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // When state changes, reset city if it is no longer valid
  useEffect(() => {
    if (formData.state && !stateToCities[formData.state]?.includes(formData.city)) {
      setFormData(prev => ({ ...prev, city: '' }));
    }
  }, [formData.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ ...formData, rating, feedbackType });
  };

  const feedbackTypes = [
    { id: 'general', label: 'General Feedback', color: 'bg-blue-500' },
    { id: 'bug', label: 'Report a Bug', color: 'bg-red-500' },
    { id: 'feature', label: 'Feature Request', color: 'bg-green-500' },
    { id: 'complaint', label: 'Complaint', color: 'bg-yellow-500' }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 mt-15 py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={cardVariants}
        custom={0}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: 'Poppins' }}
        >
          We Value <span className="text-green-500">Your Feedback</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Your feedback helps us improve our services and create a better experience for everyone in our community.
        </motion.p>
      </motion.div>

      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          variants={cardVariants}
          custom={1}
          className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {feedbackTypes.map((type, index) => (
                <motion.button
                  key={type.id}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFeedbackType(type.id)}
                  className={`p-4 rounded-xl ${
                    feedbackType === type.id
                      ? type.color + ' text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  } transition-all duration-300 flex flex-col items-center justify-center text-center`}
                >
                  <span className="font-medium">{type.label}</span>
                </motion.button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Rate your experience
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="focus:outline-none"
                  >
                    <FaStar
                      className={`text-2xl ${
                        star <= (hoveredStar || rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div whileHover={{ scale: 1.02 }}>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="Your name"
                  required
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }}>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="your.email@example.com"
                  required
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div whileHover={{ scale: 1.02 }}>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  State
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="">Select State</option>
                  {stateOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }}>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  City
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  required
                  disabled={!formData.state}
                >
                  <option value="">{formData.state ? 'Select City' : 'Select State first'}</option>
                  {(stateToCities[formData.state] || []).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </motion.div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                placeholder="Brief subject of your feedback"
                required
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                placeholder="Share your thoughts with us..."
                required
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <FaPaperPlane />
              <span>Submit Feedback</span>
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          variants={cardVariants}
          custom={2}
          className="space-y-6"
        >
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <FaEnvelope className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a href="mailto:support@civicvoice.com" className="text-green-600 hover:text-green-700">
                    support@civicvoice.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">When will I hear back?</h4>
                <p className="text-gray-600 text-sm mt-1">We typically respond within 24-48 hours on business days.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Is my feedback anonymous?</h4>
                <p className="text-gray-600 text-sm mt-1">Your feedback can be anonymous if you prefer. Simply don't include personal details.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Feedback</h3>
            <div className="space-y-4">
              {[
                { name: 'John D.', comment: 'Great platform for community engagement!' },
                { name: 'Sarah M.', comment: 'Very responsive support team.' }
              ].map((feedback, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50"
                >
                  <FaUserCircle className="text-2xl text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{feedback.name}</p>
                    <p className="text-gray-600 text-sm">{feedback.comment}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Feedback;