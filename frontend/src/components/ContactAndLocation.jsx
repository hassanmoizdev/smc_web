import React from "react";

function ContactAndLocation() {
  return (
    <div className="w-[90%] max-w-[1140px] mx-auto py-[60px] px-5 font-['Poppins',sans-serif] text-[#333] animate-fadeInUp">
      <h2 className="text-[1.8rem] font-bold text-[#8B0000] mb-[25px] border-l-[5px] border-[#8B0000] pl-3 md:text-[1.5rem] md:text-center md:border-l-0 md:pl-0">
        Contact Us & Our Location
      </h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-[30px]">
        {/* Contact Form Card */}
        <div className="bg-white rounded-xl p-[25px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_6px_18px_rgba(0,0,0,0.12)]">
          <h3 className="text-[#8B0000] font-semibold text-[1.3rem] mb-5 md:text-center">
            Send Us a Message
          </h3>
          <form action="process_contact_form.php" method="POST" className="flex flex-col gap-[15px]">
            <div className="flex flex-col">
              <label htmlFor="name" className="font-medium mb-1.5 text-[#222]">Your Name</label>
              <input
                type="text" id="name" name="name" placeholder="Enter your full name" required
                className="border border-[#ccc] rounded-md px-3 py-2.5 text-[0.95rem] transition-all focus:border-[#8B0000] focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium mb-1.5 text-[#222]">Your Email</label>
              <input
                type="email" id="email" name="email" placeholder="name@example.com" required
                className="border border-[#ccc] rounded-md px-3 py-2.5 text-[0.95rem] transition-all focus:border-[#8B0000] focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="subject" className="font-medium mb-1.5 text-[#222]">Subject</label>
              <input
                type="text" id="subject" name="subject" placeholder="e.g., Admission Inquiry"
                className="border border-[#ccc] rounded-md px-3 py-2.5 text-[0.95rem] transition-all focus:border-[#8B0000] focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="message" className="font-medium mb-1.5 text-[#222]">Your Message</label>
              <textarea
                id="message" name="message" rows="5" placeholder="Type your message here..." required
                className="border border-[#ccc] rounded-md px-3 py-2.5 text-[0.95rem] transition-all focus:border-[#8B0000] focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#8B0000] text-white font-semibold py-3 px-[22px] rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#660000] hover:-translate-y-0.5"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info Card */}
        <div className="bg-white rounded-xl p-[25px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_6px_18px_rgba(0,0,0,0.12)]">
          <h3 className="text-[#8B0000] font-semibold text-[1.3rem] mb-5 md:text-center">
            Our Information
          </h3>
          <div className="flex items-start gap-3 mb-[18px] md:flex-col">
            <i className="fas fa-map-marker-alt text-[18px] text-[#8B0000] mt-1"></i>
            <div>
              <strong className="block mb-1">Address</strong>
              <p className="text-[0.95rem] leading-relaxed">Sargodha Medical College, Faisalabad Road, Sargodha</p>
            </div>
          </div>
          <div className="flex items-start gap-3 mb-[18px] md:flex-col">
            <i className="fas fa-phone-alt text-[18px] text-[#8B0000] mt-1"></i>
            <div>
              <strong className="block mb-1">Phone</strong>
              <p className="text-[0.95rem]">048-3252717</p>
            </div>
          </div>
          <div className="flex items-start gap-3 mb-[18px] md:flex-col">
            <i className="fas fa-envelope text-[18px] text-[#8B0000] mt-1"></i>
            <div>
              <strong className="block mb-1">Email</strong>
              <p className="text-[0.95rem]">Principle.smc.health@punjab.gov.pk</p>
            </div>
          </div>

          <h4 className="text-[#8B0000] font-semibold mt-[30px] mb-[15px]">Opening Hours</h4>
          <ul className="list-none p-0 m-0">
            <li className="flex justify-between py-1.5 text-[0.95rem] border-bottom border-[#eee] md:flex-col md:items-start">
              <span>Monday - Friday:</span>
              <span className="font-medium">9:00 AM - 5:00 PM</span>
            </li>
            <li className="flex justify-between py-1.5 text-[0.95rem] border-bottom border-[#eee] md:flex-col md:items-start">
              <span>Saturday:</span>
              <span className="font-medium">9:00 AM - 1:00 PM</span>
            </li>
            <li className="flex justify-between py-1.5 text-[0.95rem] md:flex-col md:items-start">
              <span>Sunday:</span>
              <span className="font-medium">Closed</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-[50px]">
        <h3 className="text-[1.8rem] font-bold text-[#8B0000] mb-[25px] border-l-[5px] border-[#8B0000] pl-3 md:text-[1.5rem] md:text-center md:border-l-0 md:pl-0">
          Find Us on Map
        </h3>
        <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.1)] animate-fadeIn">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3383.4112214551965!2d72.7231407!3d32.0039728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3921826576c80d67%3A0x1701a729b24f826!2sSargodha%20Medical%20College!5e0!3m2!1sen!2s!4v1792078283331!5m2!1sen!2s"
            allowFullScreen="" title="map" loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full border-0"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ContactAndLocation;