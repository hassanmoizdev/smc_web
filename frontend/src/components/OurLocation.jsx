import React, { useState, useEffect } from "react";
import { SETTINGS_API } from "../api";

function OurLocation() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch(SETTINGS_API.SITE)
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error("Error fetching settings:", err));
  }, []);

  return (
    <section className="bg-white py-12 md:py-20 font-sans">
      <div className="max-w-[1250px] mx-auto px-4 text-center">
        {/* Section Heading with specific screenshot styling */}
        <div className="mb-12">
          <h2 className="text-[#8B0000] text-3xl md:text-5xl font-black mb-4 relative pb-5  inline-block">
            Our Location
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#8B0000] rounded-full"></span>
          </h2>
        </div>

        {/* The White Card Container */}
        <div className="bg-white rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.06)] border border-gray-100 p-4 md:p-8 flex flex-col lg:flex-row gap-10 text-left">
          {/* Map Side */}
          <div className="flex-1 min-h-[350px] rounded-lg overflow-hidden border border-gray-200">
            <iframe
              src={
                settings?.mapEmbedUrl ||
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.4832578508493!2d72.70582237539228!3d32.0831610739611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3921763a763a763b%3A0x7d8a6b6b6b6b6b6b!2sSargodha%20Medical%20College!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
              }
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              title="SMC Location Map"
            ></iframe>
          </div>

          {/* Details Side */}
          <div className="lg:w-[40%] flex flex-col justify-between py-2">
            <div>
              <h3 className="text-[#8B0000] text-2xl md:text-3xl font-black mb-8 tracking-tight">
                Find Us
              </h3>

              <div className="space-y-7">
                {/* Address */}
                <div className="flex gap-5">
                  <i className="fas fa-map-marker-alt text-[#8B0000] text-2xl mt-1"></i>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Address</h4>
                    <p className="text-gray-600 leading-relaxed">
                      {settings?.address ||
                        "Sargodha Medical College, Faisalabad Road, Sargodha, Punjab, Pakistan"}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-5">
                  <i className="fas fa-phone-alt text-[#8B0000] text-2xl mt-1"></i>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Phone</h4>
                    <p className="text-gray-600 font-medium">
                      {settings?.phone || "(048) 9232004"}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-5">
                  <i className="fas fa-envelope text-[#8B0000] text-2xl mt-1"></i>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Email</h4>
                    <p className="text-gray-600 break-all font-medium">
                      {settings?.email || "Principle.smc.health@punjab.gov.pk"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours Section */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <h3 className="text-[#8B0000] text-2xl font-black mb-5 tracking-tight">
                Opening Hours
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-bold">Monday - Friday:</span>
                  <span className="font-medium">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-700">
                    Saturday - Sunday:
                  </span>
                  <span className="text-[#8B0000] font-bold">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurLocation;
