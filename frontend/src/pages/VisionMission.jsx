import React from 'react'
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer'
import Vision from '../components/Vision'
import OurVisionAndMission from '../components/OurVisionAndMission'
import Header from '../components/Header'
import LearningOutcomes from '../components/LearningOutcomes'

function VissionMission() {
  return (
    <>
    <Helmet><title>Vision & Mission - SMC</title></Helmet>
    <Header/>
    <Vision/>
    <div className="relative mt-[-50px] z-10">
      <OurVisionAndMission/>
    </div>
    <LearningOutcomes/>
    <Footer/>
    </>
  )
}

export default VissionMission