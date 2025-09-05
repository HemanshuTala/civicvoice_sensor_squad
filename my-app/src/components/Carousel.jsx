import React, { useState, useEffect } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

const Carousel = ({ data, autoRotate = true, interval = 2500 }) => {
  const [slide, setSlide] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(2);

  // Determine items per view based on viewport
  useEffect(() => {
    const updateItemsPerView = () => {
      setItemsPerView(window.innerWidth < 768 ? 1 : 2);
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Function to go to the next slide (based on itemsPerView)
  const nextSlide = () => {
    setSlide((prev) => (prev >= data.length - itemsPerView ? 0 : prev + itemsPerView));
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setSlide((prev) => (prev === 0 ? data.length - itemsPerView : prev - itemsPerView));
  };

  // Auto-Rotation Effect
  useEffect(() => {
    if (!autoRotate) return;
    const sliderInterval = setInterval(nextSlide, interval);
    return () => clearInterval(sliderInterval);
  }, [slide, autoRotate, interval, itemsPerView]);

  return (
    <div className="relative w-full">
      {/* Image Container */}
      <div className="relative overflow-hidden w-full">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${(slide / itemsPerView) * 100}%)` }}
        >
          {data.map((item, idx) => (
            <div key={idx} className={`${itemsPerView === 1 ? 'w-full' : 'w-1/2'} flex-shrink-0 relative`}>
              {/* Before and After Labels */}
              {itemsPerView === 2 && idx === slide && (
                <div className="absolute top-0 left-0 p-3 text-white text-2xl font-semibold bg-black bg-opacity-60 rounded-br-lg shadow-lg">
                  Before
                </div>
              )}
              {itemsPerView === 2 && idx === slide + 1 && (
                <div className="absolute top-0 left-0 p-3 text-white text-2xl font-semibold bg-black bg-opacity-60 rounded-br-lg shadow-lg">
                  After
                </div>
              )}
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-[260px] sm:h-[320px] md:h-[420px] lg:h-[520px] xl:h-[560px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button aria-label="Previous" className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 text-white text-4xl cursor-pointer hover:text-gray-300 transition-colors duration-200 ease-in-out p-1" onClick={prevSlide}>
        <BsArrowLeftCircleFill />
      </button>
      <button aria-label="Next" className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 text-white text-4xl cursor-pointer hover:text-gray-300 transition-colors duration-200 ease-in-out p-1" onClick={nextSlide}>
        <BsArrowRightCircleFill />
      </button>
    </div>
  );
};

export default Carousel;
