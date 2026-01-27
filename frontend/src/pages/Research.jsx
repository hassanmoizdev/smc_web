import React from 'react'
import { Helmet } from 'react-helmet-async';
import Footer from "../components/Footer";
import ActualResearch from '../components/ActualResearch';
import ResearchPage from '../components/ResearchPage';
import Header from '../components/Header';

function Research() {
  return (
    <>
      <Helmet><title>Research - SMC</title></Helmet>
      <Header />
      <ActualResearch />
      <ResearchPage />
      <Footer />

    </>
  )
}

export default Research