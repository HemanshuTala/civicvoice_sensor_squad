import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaHourglassHalf,
  FaLinkedin,
  FaGithub,
  FaUsers,
  FaUserShield,
  FaCrown,
  FaRobot,
  FaMobile,
  FaMap,
  FaBell,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaLock,
  FaPalette,
  FaRocket,
  FaArrowRight,
  FaPlay
} from 'react-icons/fa';
import {
  MdDashboard,
  MdReportProblem,
  MdTrackChanges,
  MdSecurity,
  MdSpeed,
  MdAnalytics
} from 'react-icons/md';
import { HiOutlineChatBubbleBottomCenterText } from 'react-icons/hi2';
import { ResponsiveContainer, BarChart, LineChart, Bar, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { motion } from "framer-motion";
import CountUp from 'react-countup';
import Carousel from '../components/Carousel';
import hemanshu from '../assets/hemanshu_png.jpg'
import jagrav from '../assets/jagrav_png.jpg'
import jay from '../assets/jay.jpg'
import manish from '../assets/manish.jpg'

function Home() {
  const barChartData = [
    { month: "Jan", problems: 20 },
    { month: "Feb", problems: 30 },
    { month: "Mar", problems: 50 },
    { month: "Apr", problems: 40 },
    { month: "May", problems: 60 },
    { month: "Jun", problems: 80 },
  ];

  const lineChartData = [
    { month: "Jan", attempts: 30 },
    { month: "Feb", attempts: 40 },
    { month: "Mar", attempts: 60 },
    { month: "Apr", attempts: 50 },
    { month: "May", attempts: 70 },
    { month: "Jun", attempts: 90 },
  ];

  const slides = [
    { src: "https://media.istockphoto.com/id/465926255/photo/damaged-road.jpg?s=612x612&w=0&k=20&c=BpAIGaTwkmxrlJEJlpKIWtd1ccKITuozvaRxXMj3Zr0=", alt: "Damaged Road" },
    { src: "https://media.istockphoto.com/id/491712724/photo/road-in-mountains.jpg?s=612x612&w=0&k=20&c=kjikDkOyA3ynoWHalf-8V0lfjbDEOdpTaRVw6CJs7ek=", alt: "Mountain Road" },
    { src: "https://media.istockphoto.com/id/598171880/photo/broken-lamp.jpg?s=612x612&w=0&k=20&c=4LjHvpVxg0VUttmbWQtYBF5cS7R_9GVyTuKcXcEJCjw=", alt: "Broken Street Lamp" },
    { src: "https://media.istockphoto.com/id/1262572647/photo/autumn-time.jpg?s=612x612&w=0&k=20&c=zf3bzapFIN05zvs8hfUJDudXRnXWlRFG_2ufIqQ8ai8=", alt: "City Infrastructure" },
  ];

  const teamData = [
    {
      name: "Hemanshu Tala",
      role: "Full Stack Developer",
      image: hemanshu,
      socials: {
        linkedin: "https://www.linkedin.com",
        github: "https://github.com"
      }
    },
    {
      name: "Manish Kumar",
      role: "Full Stack Developer",
      image: manish,
      socials: {
        linkedin: "https://www.linkedin.com",
        github: "https://github.com"
      }
    },
    {
      name: "Jagrav Naik",
      role: "Full Stack Developer",
      image: jagrav,
      socials: {
        linkedin: "https://www.linkedin.com",
        github: "https://github.com"
      }
    },
    {
      name: "Jay Movaliya",
      role: "Full Stack Developer",
      image: jay,
      socials: {
        linkedin: "https://www.linkedin.com",
        github: "https://github.com"
      }
    }
  ];

  const [stats, setStats] = useState({ completed: 0, pending: 0, total: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/complain/get-stats");
        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }
        const data = await response.json();
        setStats(data.data || { completed: 0, pending: 0, total: 0 });
      } catch (error) {
        setError(error.message);
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white pt-15 md:pt-16" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        />
      </Helmet>

      {/* Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-green-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-600/5 rounded-full blur-3xl"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FaRocket className="mr-2" />
              Empowering Citizens Since 2024
            </motion.div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
              Civic <span className="text-green-500">Voice</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-2xl text-black max-w-4xl mx-auto leading-relaxed mb-12">
              Bridge the gap between communities and local authorities through 
              <span className="text-green-400 font-semibold"> transparency</span> and 
              <span className="text-green-400 font-semibold"> engagement</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16">
              <motion.button
                className="group px-8 py-4 bg-green-500 text-white rounded-xl font-semibold text-lg hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Today
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
              
              <motion.button
                className="group px-8 py-4 border-2 border-green-500 text-green-500 rounded-xl font-semibold text-lg hover:bg-green-500 hover:text-white transition-all duration-300 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlay className="mr-2" />
                Watch Demo
              </motion.button>
            </div>

            {/* Stats Preview */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                  <CountUp end={stats.total || 1250} duration={2.5} />+
                </div>
                <div className="text-gray-400 font-medium">Total Complaints</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                  <CountUp end={stats.completed || 980} duration={2.5} />+
                </div>
                <div className="text-gray-400 font-medium">Issues Resolved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">94%</div>
                <div className="text-gray-400 font-medium">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-green-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-green-500 rounded-full mt-2 animate-pulse"></div>
          </div>
        </motion.div> */}
      </section>

      {/* Carousel Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Carousel data={slides} />
          </div>
        </div>
      </section>

      {/* Features Overview Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-black mb-4">
              Why Choose <span className="text-green-600">Civic Voice?</span>
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Experience the power of community-driven governance with our innovative platform
            </p>
          </motion.div>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="group bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-green-500 hover:shadow-xl transition-all duration-300"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors duration-300">
                <MdReportProblem className="text-3xl text-green-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-black mb-4">Issue Reporting</h3>
              <p className="text-gray-600 leading-relaxed">
                Report issues related to roads, sanitation, public transport, and infrastructure with ease.
              </p>
            </motion.div>

            <motion.div
              className="group bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-green-500 hover:shadow-xl transition-all duration-300"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors duration-300">
                <MdTrackChanges className="text-3xl text-green-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-black mb-4">Real-Time Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Track the status of your reported issues with live updates and progress notifications.
              </p>
            </motion.div>

            <motion.div
              className="group bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-green-500 hover:shadow-xl transition-all duration-300"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors duration-300">
                <FaUsers className="text-3xl text-green-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-black mb-4">Community Engagement</h3>
              <p className="text-gray-600 leading-relaxed">
                Engage with your community by upvoting and commenting on reported concerns.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Dashboard Section */}
      <section id="complaints" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-black mb-4">
              System <span className="text-green-600">Dashboard</span>
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
              Real-time insights into our complaint resolution system
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Completed Complaints */}
            <motion.div
              className="group relative overflow-hidden"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 group-hover:border-green-500 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 bg-green-100 rounded-xl group-hover:bg-green-500 transition-colors duration-300">
                    <FaCheckCircle className="text-4xl text-green-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">
                      <CountUp end={stats.completed || 0} duration={2.5} />
                    </div>
                    <div className="text-sm text-green-500 font-medium">+12% this month</div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Resolved Cases</h3>
                <p className="text-gray-600 text-sm">Successfully completed complaints</p>
                <div className="mt-4 bg-green-50 rounded-lg p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-700">Success Rate</span>
                    <span className="font-semibold text-green-800">94.2%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pending Complaints */}
            <motion.div
              className="group relative overflow-hidden"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 group-hover:border-black transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 bg-gray-100 rounded-xl group-hover:bg-black transition-colors duration-300">
                    <FaHourglassHalf className="text-4xl text-gray-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-700">
                      <CountUp end={stats.pending || 0} duration={2.5} />
                    </div>
                    <div className="text-sm text-gray-500 font-medium">-8% this week</div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">In Progress</h3>
                <p className="text-gray-600 text-sm">Currently being processed</p>
                <div className="mt-4 bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">Avg. Resolution</span>
                    <span className="font-semibold text-gray-800">3.2 days</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Total Complaints */}
            <motion.div
              className="group relative overflow-hidden md:col-span-2 lg:col-span-1"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 group-hover:border-green-500 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 bg-green-100 rounded-xl group-hover:bg-green-500 transition-colors duration-300">
                    <FaExclamationCircle className="text-4xl text-green-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">
                      <CountUp end={stats.total || 0} duration={2.5} />
                    </div>
                    <div className="text-sm text-green-500 font-medium">+5% this month</div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Total Submissions</h3>
                <p className="text-gray-600 text-sm">All complaints received</p>
                <div className="mt-4 bg-green-50 rounded-lg p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-700">This Month</span>
                    <span className="font-semibold text-green-800">247 cases</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Admin System Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-black mb-4">
              Hierarchical <span className="text-green-600">Admin System</span>
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Efficient management system with district and state level administration for streamlined complaint resolution
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Admin Cards */}
            <div className="space-y-8">
              <motion.div
                className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 hover:border-green-500 hover:shadow-lg transition-all duration-300"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <FaUserShield className="text-3xl text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-black">District Admin</h3>
                    <p className="text-gray-600">Local Level Management</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Manages district-level issues, categorizes complaints, and ensures timely resolution of local civic problems.
                </p>
              </motion.div>

              <motion.div
                className="bg-black rounded-2xl p-8 text-white hover:shadow-2xl transition-all duration-300"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mr-4">
                    <FaCrown className="text-3xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Super Admin</h3>
                    <p className="text-gray-300">State Level Oversight</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Oversees all district admins, monitors activities, and has authority to modify deadlines and ensure system-wide efficiency.
                </p>
              </motion.div>
            </div>

            {/* Features List */}
            <motion.div
              className="space-y-6"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <FaCheckCircle className="text-white text-sm" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-black mb-2">Efficient Monitoring</h4>
                  <p className="text-gray-600">Real-time oversight of all complaint resolution activities across districts.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <MdSpeed className="text-white text-sm" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-black mb-2">Deadline Management</h4>
                  <p className="text-gray-600">Flexible deadline modification system to ensure optimal resolution times.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <MdDashboard className="text-white text-sm" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-black mb-2">Categorization System</h4>
                  <p className="text-gray-600">Intelligent complaint categorization for faster processing and resolution.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <MdAnalytics className="text-white text-sm" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-black mb-2">Performance Analytics</h4>
                  <p className="text-gray-600">Comprehensive analytics and reporting for continuous improvement.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-black mb-4">
              Performance <span className="text-green-600">Analytics</span>
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
              Track our progress and system performance over time
            </p>
          </motion.div>

          {/* Charts Container */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Bar Chart */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 hover:border-green-500 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-black">Resolution Trends</h3>
                <div className="px-4 py-2 bg-green-100 rounded-full">
                  <span className="text-sm font-semibold text-green-700">Monthly</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: '#374151', fontSize: 12, fontWeight: 500 }}
                    axisLine={{ stroke: '#9ca3af' }}
                  />
                  <YAxis
                    tick={{ fill: '#374151', fontSize: 12, fontWeight: 500 }}
                    axisLine={{ stroke: '#9ca3af' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '2px solid #16a34a',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Bar
                    dataKey="problems"
                    fill="#16a34a"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Line Chart */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 hover:border-black transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-black">Submission Volume</h3>
                <div className="px-4 py-2 bg-gray-100 rounded-full">
                  <span className="text-sm font-semibold text-gray-700">Growth</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: '#374151', fontSize: 12, fontWeight: 500 }}
                    axisLine={{ stroke: '#9ca3af' }}
                  />
                  <YAxis
                    tick={{ fill: '#374151', fontSize: 12, fontWeight: 500 }}
                    axisLine={{ stroke: '#9ca3af' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '2px solid #000000',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="attempts"
                    stroke="#000000"
                    strokeWidth={3}
                    dot={{ fill: '#000000', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, fill: '#16a34a', strokeWidth: 2, stroke: '#ffffff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
    <section id="how-it-works" className="py-20 px-6 bg-gray-50">
  <div className="max-w-6xl mx-auto">
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
        How It <span className="text-green-600">Works</span>
      </h2>
      <div className="w-24 h-1 bg-green-600 mx-auto rounded-full mb-6"></div>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Simple steps to resolve your complaints efficiently
      </p>
    </motion.div>

    {/* Process Steps */}
    <div className="relative">
      {/* Connection Line */}
      <div className="hidden lg:block absolute top-20 left-0 right-0 h-2 bg-gradient-to-r from-green-500 to-green-700 rounded-full transform -translate-y-1/2 z-0"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {/* Step 1 */}
        <motion.div
          className="group text-center relative"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -10 }}
        >
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg z-20">1</div>
          <div className="relative mb-8">
            <div className="w-16 h-16 mx-auto bg-green-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 group-hover:bg-gray-900">
              <MdSecurity className="text-2xl text-white" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">Sign Up & Login</h3>
          <p className="text-gray-500 text-sm leading-relaxed px-4">
            Create your account and access the platform with secure authentication
          </p>
        </motion.div>

        {/* Step 2 */}
        <motion.div
          className="group text-center relative"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{ y: -10 }}
        >
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg z-20">2</div>
          <div className="relative mb-8">
            <div className="w-16 h-16 mx-auto bg-gray-900 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 group-hover:bg-green-600">
              <MdReportProblem className="text-2xl text-white" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">Report Issues</h3>
          <p className="text-gray-500 text-sm leading-relaxed px-4">
            Submit complaints about roads, sanitation, transport, and infrastructure
          </p>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          className="group text-center relative"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          whileHover={{ y: -10 }}
        >
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg z-20">3</div>
          <div className="relative mb-8">
            <div className="w-16 h-16 mx-auto bg-green-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 group-hover:bg-gray-900">
              <MdTrackChanges className="text-2xl text-white" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">Track Progress</h3>
          <p className="text-gray-500 text-sm leading-relaxed px-4">
            Monitor real-time status updates and resolution progress
          </p>
        </motion.div>

        {/* Step 4 */}
        <motion.div
          className="group text-center relative"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          whileHover={{ y: -10 }}
        >
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg z-20">4</div>
          <div className="relative mb-8">
            <div className="w-16 h-16 mx-auto bg-gray-900 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 group-hover:bg-green-600">
              <HiOutlineChatBubbleBottomCenterText className="text-2xl text-white" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">Community Engagement</h3>
          <p className="text-gray-500 text-sm leading-relaxed px-4">
            Upvote, comment, and engage with community-reported concerns
          </p>
        </motion.div>
      </div>
    </div>
  </div>
</section>

      {/* Technology Stack Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-black mb-4">
              Built with Modern <span className="text-green-600">Technology</span>
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Powered by cutting-edge technologies for optimal performance and user experience
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { name: 'React.js', icon: FaReact, desc: 'Frontend Framework', color: 'text-blue-500' },
              { name: 'Node.js', icon: FaNodeJs, desc: 'Backend Runtime', color: 'text-green-600' },
              { name: 'Express.js', icon: FaRocket, desc: 'Web Framework', color: 'text-gray-700' },
              { name: 'MongoDB', icon: FaDatabase, desc: 'Database', color: 'text-green-500' },
              { name: 'JWT', icon: FaLock, desc: 'Authentication', color: 'text-red-500' },
              { name: 'Tailwind', icon: FaPalette, desc: 'CSS Framework', color: 'text-cyan-500' }
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-green-500 hover:shadow-xl transition-all duration-300 text-center"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  <tech.icon className={`text-4xl mx-auto ${tech.color} group-hover:text-green-600 transition-colors duration-300`} />
                </div>
                <h3 className="text-lg font-bold text-black mb-2 group-hover:text-green-600 transition-colors duration-300">
                  {tech.name}
                </h3>
                <p className="text-sm text-gray-600">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="ourTeam" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-black mb-4">
              Meet Our <span className="text-green-600">Team</span>
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Dedicated developers who built this platform during a hackathon
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamData.map((member, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 group-hover:border-green-500 group-hover:shadow-2xl transition-all duration-500">
                  <motion.div
                    className="relative mb-6"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className="w-24 h-24 mx-auto rounded-full object-cover shadow-lg border-4 border-gray-100 group-hover:border-green-500 transition-all duration-300"
                    />
                  </motion.div>

                  <h3 className="text-xl font-bold text-black text-center mb-2 group-hover:text-green-600 transition-colors duration-300">
                    {member.name}
                  </h3>

                  <p className="text-gray-600 text-center mb-6 font-medium">
                    {member.role}
                  </p>

                  <div className="flex justify-center space-x-4">
                    <motion.a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-100 rounded-xl text-gray-600 hover:bg-green-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaLinkedin className="text-lg" />
                    </motion.a>
                    <motion.a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-100 rounded-xl text-gray-600 hover:bg-black hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub className="text-lg" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Enhancements Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-black mb-4">
              Future <span className="text-green-600">Enhancements</span>
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Exciting features coming soon to enhance your civic engagement experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FaRobot,
                title: 'AI Integration',
                desc: 'Automated issue categorization using artificial intelligence',
                color: 'text-purple-500'
              },
              {
                icon: FaMobile,
                title: 'Mobile App',
                desc: 'Native mobile application for iOS and Android platforms',
                color: 'text-blue-500'
              },
              {
                icon: FaMap,
                title: 'GIS Heatmaps',
                desc: 'Visual heatmaps showing issue density across regions',
                color: 'text-orange-500'
              },
              {
                icon: FaBell,
                title: 'Push Notifications',
                desc: 'Real-time notifications for status updates and alerts',
                color: 'text-red-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-green-500 hover:shadow-xl transition-all duration-300 text-center"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className={`text-5xl mx-auto ${feature.color} group-hover:text-green-600 transition-colors duration-300`} />
                </div>
                <h3 className="text-xl font-bold text-black mb-4 group-hover:text-green-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 bg-white text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-black">
              Ready to Make a <span className="text-green-500">Difference?</span>
            </h2>
            <p className="text-xl text-black mb-8 max-w-2xl mx-auto">
              Join thousands of citizens who are already using Civic Voice to improve their communities. 
              Your voice matters, and together we can build better cities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-green-500 text-white rounded-xl font-semibold text-lg hover:bg-green-600 transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaRocket className="text-xl" />
                Get Started Today
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-black text-black rounded-xl font-semibold text-lg hover:bg-white hover:text-black text-black transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlay className="text-lg" />
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


export default Home;