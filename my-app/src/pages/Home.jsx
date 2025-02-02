import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FaCheckCircle, FaExclamationCircle, FaRegSmile } from 'react-icons/fa';
import { MdDoneAll, MdHourglassEmpty, MdSentimentSatisfiedAlt } from 'react-icons/md';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { FaThumbsUp, FaComments, FaRegHeart,FaHourglassHalf } from 'react-icons/fa'
import { ResponsiveContainer, BarChart, LineChart, Bar, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { motion,AnimatePresence  } from "framer-motion";
import Carousel from '../components/Carousel';
// Carousel Component with Full Width and Responsive Design




function Home() {

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.1, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" },
  };
  const barChartData = [
    { month: "Jan", problems: 20 },
    { month: "Feb", problems: 30 },
    { month: "Mar", problems: 50 },
    { month: "Apr", problems: 40 },
    { month: "May", problems: 60 },
    { month: "Jun", problems: 80 },
  ];

  // Example data for the line chart
  const lineChartData = [
    { month: "Jan", attempts: 30 },
    { month: "Feb", attempts: 40 },
    { month: "Mar", attempts: 60 },
    { month: "Apr", attempts: 50 },
    { month: "May", attempts: 70 },
    { month: "Jun", attempts: 90 },
  ];
  const slides = [
    { src: "https://media.istockphoto.com/id/465926255/photo/damaged-road.jpg?s=612x612&w=0&k=20&c=BpAIGaTwkmxrlJEJlpKIWtd1ccKITuozvaRxXMj3Zr0=", alt: "Image 1" },
    { src: "https://media.istockphoto.com/id/491712724/photo/road-in-mountains.jpg?s=612x612&w=0&k=20&c=kjikDkOyA3ynoWHalf-8V0lfjbDEOdpTaRVw6CJs7ek=", alt: "Image 2" },
    { src: "https://media.istockphoto.com/id/598171880/photo/broken-lamp.jpg?s=612x612&w=0&k=20&c=4LjHvpVxg0VUttmbWQtYBF5cS7R_9GVyTuKcXcEJCjw=", alt: "Image 3" },
     { src: "https://media.istockphoto.com/id/1262572647/photo/autumn-time.jpg?s=612x612&w=0&k=20&c=zf3bzapFIN05zvs8hfUJDudXRnXWlRFG_2ufIqQ8ai8=", alt: "Image 3" },
  ];
  const teamData = [
    {
      "name": "Hemanshu Tala",
      "role": "Full Stack Developer",
      "image": "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
      "socials": {
        "linkedin": "https://www.linkedin.com",

        "github": "https://github.com"
      }
    },
    {
      "name": "Manish Kumar",
      "role": "Full Stack Developer",
      "image": "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
      "socials": {
        "linkedin": "https://www.linkedin.com",

        "github": "https://github.com"
      }
    },
    {
      "name": "Jagrav Naik",
      "role": "Full Stack Developer",
      "image": "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
      "socials": {
        "linkedin": "https://www.linkedin.com",

        "github": "https://github.com"
      }
    },
    {
      "name": "Jay Movaliya",
      "role": "Full Stack Developer",
      "image": "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
      "socials": {
        "linkedin": "https://www.linkedin.com",

        "github": "https://github.com"
      }
    }

  ];
  
  const [stats, setStats] = useState([""])
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/complain/get-stats");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setStats(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchStats();
  }, []);

 
  return (
    <div className="w-full  text-center text-black font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Helmet for including Poppins font */}
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
        />
      </Helmet>
      <Carousel className="m-10" data={slides}/>
      {/* Banner Section */}
     

    

      <section id="complaints" className="mt-12 px-6 py-12 ">
  <div className="text-center mb-16">
    {/* Animated Heading */}
    <motion.h2
      className="text-5xl font-bold mb-6 text-gray-800 text-center relative"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      Complain Status
      <motion.div
        className="absolute w-32 h-1 bg-green-500 rounded-lg left-1/2 transform -translate-x-1/2 mt-2"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
      ></motion.div>
    </motion.h2>

    {/* Underline Animation */}
  </div>

  {/* Complaint Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
    {/* Solved Complaints */}
    <motion.div
      className="bg-green-100 p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
      whileHover={{ scale: 1.05 }}
    >
      <FaCheckCircle className="text-green-600 text-7xl mx-auto" />
      <h3 className="text-xl font-semibold text-green-700 mt-6">Completed Complaints</h3>
      <p className="text-5xl font-extrabold text-green-800 mt-2">{stats.completed}</p>
    </motion.div>

    {/* Pending Complaints */}
    <motion.div
      className="bg-yellow-100 p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
      whileHover={{ scale: 1.05 }}
    >
      <FaHourglassHalf className="text-yellow-600 text-7xl mx-auto" />
      <h3 className="text-xl font-semibold text-yellow-700 mt-6">Pending Complaints</h3>
      <p className="text-5xl font-extrabold text-yellow-800 mt-2">{stats.pending}</p>
    </motion.div>

    {/* Unsolved Complaints */}
    <motion.div
      className="bg-red-100 p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
      whileHover={{ scale: 1.05 }}
    >
      <FaExclamationCircle className="text-red-600 text-7xl mx-auto" />
      <h3 className="text-xl font-semibold text-red-700 mt-6">Total Complaints</h3>
      <p className="text-5xl font-extrabold text-red-800 mt-2">{stats.total}</p>
    </motion.div>
  </div>
</section>

      <motion.section
        className="mt-12 px-6 py-13 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Section Title */}
        <motion.h2
          className="text-5xl font-bold mb-8 text-gray-800 text-center relative"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Months vs Problems
          <motion.div
            className="absolute w-24 h-1 bg-green-500 rounded-lg left-1/2 transform -translate-x-1/2 mt-2"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
          ></motion.div>
        </motion.h2>

        {/* Charts Container */}
        <motion.div
          className="flex flex-col lg:flex-row gap-8 w-full"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Bar Chart */}
          <motion.div
            className="flex-1"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-700 text-center relative">
              Graph 1: Problems Solved
              <div className="absolute w-16 h-1 bg-green-400 rounded-lg left-1/2 transform -translate-x-1/2 mt-2"></div>
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="problems" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Line Chart */}
          <motion.div
            className="flex-1"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-700 text-center relative">
              Graph 2: Problems Attempted
              <div className="absolute w-16 h-1 bg-green-400 rounded-lg left-1/2 transform -translate-x-1/2 mt-2"></div>
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="attempts"
                  stroke="green"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>
      </motion.section>



      {/* How It Works Section */}
      <section id="how-it-works" className="mt-12 px-6 py-16">
        <motion.h2
          className="text-5xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          How It Works?
        </motion.h2>

        {/* Green Underline */}
        <motion.div
          className="h-1 w-32 bg-green-500 mx-auto rounded mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
        ></motion.div>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-400 to-blue-400"></div>

          {/* Timeline Steps */}
          <div className="grid grid-cols-1 gap-16 relative">
            {/* Step 1 */}
            <div className="group flex items-center">
              <div className="w-1/2 text-right pr-8">
                <p className="text-lg font-medium text-gray-700 group-hover:text-green-600 transition duration-700 delay-200">
                  Log in using your registered credentials.
                </p>
              </div>
              <div className="relative group-hover:animate-bounce">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-200 text-green-700 text-2xl font-extrabold shadow-lg group-hover:scale-110 transition duration-700">
                  1
                </div>
                <div className="absolute inset-0 w-full h-full rounded-full border-4 border-green-400 opacity-0 group-hover:opacity-100 transition duration-700"></div>
              </div>
              <div className="flex-1"></div>
            </div>

            {/* Step 2 */}
            <div className="group flex items-center flex-row-reverse">
              <div className="w-1/2 text-left pl-8">
                <p className="text-lg font-medium text-gray-700 group-hover:text-blue-600 transition duration-700 delay-300">
                  View the current status of your complaints.
                </p>
              </div>
              <div className="relative group-hover:animate-bounce">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 text-2xl font-extrabold shadow-lg group-hover:scale-110 transition duration-700">
                  2
                </div>
                <div className="absolute inset-0 w-full h-full rounded-full border-4 border-blue-400 opacity-0 group-hover:opacity-100 transition duration-700"></div>
              </div>
              <div className="flex-1"></div>
            </div>

            {/* Step 3 */}
            <div className="group flex items-center">
              <div className="w-1/2 text-right pr-8">
                <p className="text-lg font-medium text-gray-700 group-hover:text-yellow-600 transition duration-700 delay-400">
                  Track complaint resolutions over time.
                </p>
              </div>
              <div className="relative group-hover:animate-bounce">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-200 text-yellow-700 text-2xl font-extrabold shadow-lg group-hover:scale-110 transition duration-700">
                  3
                </div>
                <div className="absolute inset-0 w-full h-full rounded-full border-4 border-yellow-400 opacity-0 group-hover:opacity-100 transition duration-700"></div>
              </div>
              <div className="flex-1"></div>
            </div>

            {/* Step 4 */}
            <div className="group flex items-center flex-row-reverse">
              <div className="w-1/2 text-left pl-8">
                <p className="text-lg font-medium text-gray-700 group-hover:text-red-600 transition duration-700 delay-500">
                  Submit feedback to help us improve.
                </p>
              </div>
              <div className="relative group-hover:animate-bounce">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-200 text-red-700 text-2xl font-extrabold shadow-lg group-hover:scale-110 transition duration-700">
                  4
                </div>
                <div className="absolute inset-0 w-full h-full rounded-full border-4 border-red-400 opacity-0 group-hover:opacity-100 transition duration-700"></div>
              </div>
              <div className="flex-1"></div>
            </div>
          </div>
        </div>
      </section>





      <motion.section
      id="ourTeam"
      className="px-8 py-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Title */}
      <motion.h2
        className="text-5xl font-bold text-gray-900 text-center mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        Meet Our Team
      </motion.h2>

      {/* Underline Animation */}
      <motion.div
        className="h-1 w-32 bg-green-500 mx-auto rounded mb-12"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
      ></motion.div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {teamData.map((member, index) => (
          <motion.div
            key={index}
            className="p-8 bg-white rounded-xl shadow-lg border-2 border-transparent hover:border-green-500 transition-all ease-in-out duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(72, 187, 120, 0.2)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Image Animation */}
            <motion.div
              className="relative mb-6"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full border-4 border-gradient-to-r from-green-300 to-blue-300 transform transition-all"
              />
            </motion.div>

            {/* Name */}
            <motion.h3
              className="text-2xl font-semibold text-gray-800 text-center mb-2"
              whileHover={{ color: "#4CAF50" }}
              transition={{ duration: 0.3 }}
            >
              {member.name}
            </motion.h3>

            {/* Role */}
            <motion.p
              className="text-lg text-gray-600 text-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {member.role}
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="flex justify-center space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <motion.a
                href={member.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-600 text-3xl transition-colors duration-300"
                whileHover={{ y: -3 }}
              >
                <FaLinkedin />
              </motion.a>
              <motion.a
                href={member.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-600 text-3xl transition-colors duration-300"
                whileHover={{ y: -3 }}
              >
                <FaGithub />
              </motion.a>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>

    </div>
  );
}

export default Home;