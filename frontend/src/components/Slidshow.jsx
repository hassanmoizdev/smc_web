import React, { useState, useEffect } from "react";
import { SETTINGS_API, API_BASE_URL } from "../api";

function Slidshow() {
  const defaultImages = [
    "/images/1.png",
    "/images/2.png",
    "/images/3.png",
    "/images/4.png",
  ];

  const [images, setImages] = useState(defaultImages);
  const [activeIndex, setActiveIndex] = useState(0);

  const baseDomainUrl = API_BASE_URL.replace("/api", "");

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const res = await fetch(SETTINGS_API.SLIDER);
        const resData = await res.json();

        const fetched = resData?.slides?.map((s) => s.url) || [];

        setImages(
          fetched.length
            ? fetched.map((x) => `${baseDomainUrl}${x}`)
            : defaultImages
        );
      } catch (err) {
        console.error("Error fetching slider:", err);
        setImages(defaultImages);
      }
    };
    fetchSlider();
  }, [baseDomainUrl]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % (images.length || 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="relative w-full h-[500px] overflow-hidden flex max-[1024px]:h-[70vh] max-[768px]:h-[60vh] max-[576px]:h-[50vh] max-[576px]:min-h-[300px] max-[400px]:h-[45vh] max-[400px]:min-h-[250px] bg-top">
      {images.map((src, i) => (
        <div
          key={i}
          className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out ${i === activeIndex ? "opacity-100 scale-100 z-[2] animate-fadeInZoom" : "opacity-0 scale-110 z-[1] duration-[7000ms]"}`}
          style={{ backgroundImage: `url(${src})` }}
        ></div>
      ))}

      <div className="absolute bottom-[25px] left-1/2 -translate-x-1/2 flex gap-3 z-10 max-[768px]:bottom-[18px] max-[768px]:gap-2.5 max-[576px]:bottom-[15px] max-[576px]:gap-2">
        {images.map((_, i) => (
          <span
            key={i}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 hover:scale-[1.4] hover:bg-white hover:shadow-[0_0_8px_rgba(255,255,255,0.7)] max-[768px]:w-2.5 max-[768px]:h-2.5 max-[576px]:w-[9px] max-[576px]:h-[9px] max-[400px]:w-2 max-[400px]:h-2 ${i === activeIndex ? "bg-[#8B0000] scale-[1.5] shadow-[0_0_10px_rgba(139,0,0,0.8)]" : "bg-white/50"}`}
            onClick={() => setActiveIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Slidshow;