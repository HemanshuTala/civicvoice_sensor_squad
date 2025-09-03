import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaLightbulb, 
  FaRocket, 
  FaHeart,
  FaGithub,
  FaLinkedin,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaLock,
  FaCheckCircle,
  FaAward,
  FaCode,
  FaBullseye
} from 'react-icons/fa';
import { 
  MdDashboard, 
  MdReportProblem, 
  MdTrackChanges, 
  MdFeedback,
  MdSecurity,
  MdSpeed
} from 'react-icons/md';
import hemanshu from '../assets/hemanshu_png.jpg';
import jagrav from '../assets/jagrav_png.jpg';
import jay from '../assets/jay.jpg';
import manish from '../assets/manish.jpg';

function About() {
  const teamData = [
    {
      name: "Hemanshu Tala",
      role: "Full Stack Developer & Team Lead",
      image: hemanshu,
      description: "Passionate about creating scalable web applications and leading innovative projects.",
      socials: {
        linkedin: "https://www.linkedin.com",
        github: "https://github.com"
      }
    },
    {
      name: "Manish Kumar",
      role: "Backend Developer & Database Architect",
      image: manish,
      description: "Expert in server-side development and database optimization for high-performance applications.",
      socials: {
        linkedin: "https://www.linkedin.com",
        github: "https://github.com"
      }
    },
    {
      name: "Jagrav Naik",
      role: "Frontend Developer & UI/UX Designer",
      image: jagrav,
      description: "Specializes in creating beautiful, user-friendly interfaces and seamless user experiences.",
      socials: {
        linkedin: "https://www.linkedin.com",
        github: "https://github.com"
      }
    },
    {
      name: "Jay Movaliya",
      role: "Full Stack Developer & DevOps Engineer",
      image: jay,
      description: "Focuses on end-to-end development and deployment automation for robust applications.",
      socials: {
        linkedin: "https://www.linkedin.com",
        github: "https://github.com"
      }
    }
  ];

  const features = [
    {
      icon: MdReportProblem,
      title: "Issue Reporting",
      description: "Citizens can easily report issues related to roads, sanitation, public transport, and infrastructure."
    },
    {
      icon: MdTrackChanges,
      title: "Real-Time Tracking",
      description: "Users can track the status of their reported issues with live updates and progress notifications."
    },
    {
      icon: FaUsers,
      title: "Community Engagement",
      description: "Allows citizens to upvote and comment on reported concerns, fostering community participation."
    },
    {
      icon: MdDashboard,
      title: "Admin Dashboard",
      description: "Comprehensive dashboard for local authorities to monitor, categorize, and resolve complaints efficiently."
    },
    {
      icon: MdSecurity,
      title: "Hierarchical System",
      description: "Multi-level admin system with district and state level oversight for effective governance."
    },
    {
      icon: MdFeedback,
      title: "Feedback System",
      description: "Integrated feedback mechanism to continuously improve the platform based on user input."
    }
  ];

  const technologies = [
    { name: 'React.js', icon: FaReact, color: 'text-blue-500' },
    { name: 'Node.js', icon: FaNodeJs, color: 'text-green-600' },
    { name: 'MongoDB', icon: FaDatabase, color: 'text-green-500' },
    { name: 'JWT Auth', icon: FaLock, color: 'text-red-500' }
  ];

  const achievements = [
    {
      icon: FaAward,
      title: "Hackathon Winner",
      description: "Developed during a competitive hackathon, showcasing innovation and rapid development skills."
    },
    {
      icon: FaCode,
      title: "Open Source",
      description: "Built with modern technologies and best practices, available for community contributions."
    },
    {
      icon: FaBullseye,
      title: "Impact Focused",
      description: "Designed to make a real difference in civic governance and community engagement."
    }
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Helmet>
        <title>About Us - CivicVoice</title>
        <meta name="description" content="Learn about CivicVoice, our mission, team, and the technology behind our civic engagement platform." />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-white via-green-50 to-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-7xl font-bold text-black mb-6">
              About <span className="text-green-600">CivicVoice</span>
            </h1>
            <div className="w-32 h-1 bg-green-600 mx-auto rounded-full mb-8"></div>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Empowering citizens to voice their concerns and bridge the gap between communities and local authorities through innovative technology and transparent governance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold text-black mb-8">
                Our <span className="text-green-600">Mission</span>
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                To create a transparent, efficient, and accessible platform that enables citizens to actively participate in civic governance. We believe that every voice matters and every concern deserves attention.
              </p>
              <div className="space-y-4">
                {[
                  "Foster transparency in government operations",
                  "Enable efficient complaint resolution",
                  "Promote community engagement and participation",
                  "Bridge the communication gap between citizens and authorities"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-600 text-xl" />
                    <span className="text-gray-700 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100"
            >
              <h3 className="text-3xl font-bold text-black mb-6">
                Our <span className="text-green-600">Vision</span>
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                To become the leading platform for civic engagement, where technology serves as a catalyst for positive change in communities worldwide.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                    <achievement.icon className="text-3xl text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-black text-sm">{achievement.title}</h4>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-6xl font-bold text-black mb-4">
              Platform <span className="text-green-600">Features</span>
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Comprehensive features designed to enhance civic engagement and streamline complaint resolution
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl hover:bg-white transition-all duration-300 border-2 border-gray-100 hover:border-green-500 group"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors duration-300">
                  <feature.icon className="text-3xl text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4 group-hover:text-green-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-6xl font-bold text-black mb-4">
              Technology <span className="text-green-600">Stack</span>
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Built with modern, reliable technologies for optimal performance and scalability
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-green-500 hover:shadow-xl transition-all duration-300 text-center group"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <tech.icon className={`text-6xl mx-auto mb-4 ${tech.color} group-hover:text-green-600 transition-colors duration-300`} />
                <h3 className="text-lg font-bold text-black group-hover:text-green-600 transition-colors duration-300">
                  {tech.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-6xl font-bold text-black mb-4">
              Meet Our <span className="text-green-600">Team</span>
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              The passionate developers behind CivicVoice - The Sensor Squad
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamData.map((member, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl hover:bg-white transition-all duration-300 border-2 border-gray-100 hover:border-green-500 group text-center"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover shadow-lg border-4 border-gray-200 group-hover:border-green-500 transition-all duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold text-black mb-2 group-hover:text-green-600 transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-green-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {member.description}
                </p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-green-500 hover:text-white transition-all duration-300"
                  >
                    <FaLinkedin className="text-lg" />
                  </a>
                  <a
                    href={member.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <FaGithub className="text-lg" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-6xl font-bold mb-6">
              Join the <span className="text-green-500">Movement</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Be part of the change. Help us build better communities through technology and civic engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://github.com/HemanshuTala/civicvoice_sensor_squad"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-green-500 text-black rounded-xl font-semibold text-lg hover:bg-green-600 transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub className="text-xl" />
                View on GitHub
              </motion.a>
              <motion.button
                className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaHeart className="text-lg" />
                Support Project
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default About;