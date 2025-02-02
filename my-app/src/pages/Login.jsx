import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock, FaRegEnvelope } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpExpired, setOtpExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // Time left in seconds
  const [otpRequested, setOtpRequested] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (value.length > 1) return; // Restrict multiple characters
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input field automatically
    if (value !== "" && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Handle backspace key
  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  // Start OTP timer
  const startOtpTimer = () => {
    setOtpRequested(true);

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/generate-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
          setOtpExpired(false);
          setTimeLeft(30); // Set OTP expiry time to 30 seconds
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error generating OTP:", error);
      });
  };

  // Countdown timer for OTP expiry
  useEffect(() => {
    let timer;
    if (otpRequested && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && otpRequested) {
      setOtpExpired(true);
    }

    return () => clearInterval(timer);
  }, [otpRequested, timeLeft]);

  // Handle OTP verification for login
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Join OTP digits
    const enteredOtp = otp.join("");

    if (enteredOtp.length < 6) {
      toast.error("Please enter a complete OTP.");
      return;
    }

    setIsLoading(true); // Start loading state

    // Send OTP to backend for verification
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp: enteredOtp }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false); // Stop loading state
        if (data.success) {
          cookies.set('token', data.token);
          window.location.href = "http://localhost:5173/";
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        setIsLoading(false); // Stop loading state
        console.error("Error verifying OTP:", error);
        toast.error("An error occurred. Please try again.");
      });
  };

  return (
    <div className="flex items-center justify-center w-full h-screen font-poppins py-6">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6">
        {/* Header */}
        <h1 className="text-4xl font-semibold text-gray-800 text-center mb-6">
          Log<span className="text-green-500">!</span>n
        </h1>

        {/* Form */}
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <FaRegEnvelope className="text-gray-500 ml-3" />
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* OTP Section */}
          <div className="mb-6">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              OTP
            </label>
            <div className="flex justify-between gap-3">
              {otp.map((value, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-14 h-14 text-center text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out"
                />
              ))}
            </div>
          </div>

          {/* Get OTP or Resend OTP Button */}
          <div className="mb-6">
            {!otpRequested ? (
              <button
                type="button"
                onClick={startOtpTimer}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300 ease-in-out flex items-center justify-center gap-2"
              >
                <FaLock className="text-xl" />
                Get OTP
              </button>
            ) : otpExpired ? (
              <button
                type="button"
                onClick={startOtpTimer} // Resend OTP
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300 ease-in-out flex items-center justify-center gap-2"
              >
                <FaLock className="text-xl" />
                Resend OTP
              </button>
            ) : (
              <div className="text-center text-sm text-gray-500">
                OTP expires in {timeLeft} seconds
              </div>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white font-semibold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all duration-300 ease-in-out flex items-center justify-center gap-2`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              <>
                <FaEnvelope className="text-xl" />
                Login
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
