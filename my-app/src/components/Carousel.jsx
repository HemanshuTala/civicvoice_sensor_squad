import React, { useState, useEffect } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

const Carousel = ({ data, autoRotate = true, interval = 2500 }) => {
  const [slide, setSlide] = useState(0);

  // Function to go to the next slide (showing 2 at a time)
  const nextSlide = () => {
    setSlide((prev) => (prev >= data.length - 2 ? 0 : prev + 2));
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setSlide((prev) => (prev === 0 ? data.length - 2 : prev - 2));
  };

  // Auto-Rotation Effect
  useEffect(() => {
    if (!autoRotate) return;
    const sliderInterval = setInterval(nextSlide, interval);
    return () => clearInterval(sliderInterval);
  }, [slide, autoRotate, interval]);

  return (
    <div className="relative w-full">
      {/* Image Container */}
      <div className="relative overflow-hidden w-full">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${(slide / 2) * 100}%)` }}
        >
          {data.map((item, idx) => (
            <div key={idx} className="w-1/2 flex-shrink-0 relative">
              {/* Before and After Labels */}
              {idx === slide && (
                <div className="absolute top-0 left-0 p-3 text-white text-2xl font-semibold bg-black bg-opacity-60 rounded-br-lg shadow-lg">
                  Before
                </div>
              )}
              {idx === slide + 1 && (
                <div className="absolute top-0 left-0 p-3 text-white text-2xl font-semibold bg-black bg-opacity-60 rounded-br-lg shadow-lg">
                  After
                </div>
              )}
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-[350px] md:h-[450px] lg:h-[550px] object-coverg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-4xl cursor-pointer hover:text-gray-300 transition-colors duration-200 ease-in-out" onClick={prevSlide}>
        <BsArrowLeftCircleFill />
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-4xl cursor-pointer hover:text-gray-300 transition-colors duration-200 ease-in-out" onClick={nextSlide}>
        <BsArrowRightCircleFill />
      </div>
    </div>
  );
};

export default Carousel;
