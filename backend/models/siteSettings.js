import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema({
  logoUrl: { type: String, default: "/images/logo.png" },
  theme: { type: String, default: "default" },
  address: { type: String, default: "Faisalbad Road, Sargodha, Pakistan" },
  phone: { type: String, default: "(048) 923-2004" },
  whatsapp: { type: String, default: "03200827294" },
  email: { type: String, default: "principal.smc.health@punjab.gov.pk" },
  mapEmbedUrl: { type: String, default: "https://maps.app.goo.gl/RDtG8eVdgNAQK1xWA  " },
  socialLinks: {
    facebook: { type: String, default: "https://www.facebook.com/smc" },
    instagram: { type: String, default: "https://www.instagram.com/smc" },
    linkedin: { type: String, default: "#" },
  },
  openingHours: {
    mondayFriday: { type: String, default: "9:00 AM - 5:00 PM" },
    saturday: { type: String, default: "9:00 AM - 1:00 PM" },
    sunday: { type: String, default: "Closed" },
  },
}, { timestamps: true });

export default mongoose.model("SiteSettings", siteSettingsSchema);
