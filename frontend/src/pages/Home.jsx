import { Helmet } from 'react-helmet-async';
import Slidshow from "../components/Slidshow";
import WhySection from "../components/WhySection";
import OurFaculties from "../components/OurFaculties";
import Principal from "../components/Principal";
import SmcNumber from "../components/SmcNumber";
import LatestNews from "../components/LatestNews";
import Affiliation from "../components/Affiliation";
import Footer from "../components/Footer";
import OurLocation from "../components/OurLocation";
import Header from "../components/Header";
function Home() {
  return (
    <>
      <Helmet>
        <title>Home - SMC</title>
      </Helmet>
      <Header />
      <Slidshow />
      <WhySection />
      <Principal />
      <OurFaculties />
      <SmcNumber />
      <LatestNews />
      <Affiliation />
      <OurLocation />
      <Footer />
    </>
  );
}

export default Home;
