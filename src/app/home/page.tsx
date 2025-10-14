import React from "react";
import Hero from "./Hero";
import About from "./About";
import WhyChoose from "./WhyChoose";
import Testimonials from "./Testimonials";
import OurPrograms from "./OurPrograms";
import Articles from "./Articles";
import Newsletter from "./Newsletter";
import Footer from "./Footer";
import Contact from "./Contact";
import Header from "./Header";
import ApplicationStatus from "./ApplicationStatus";
import RecruitmentAD from "./recruitment/RecruitmentAD";

const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <ApplicationStatus />
      <WhyChoose />
      <Testimonials />
      <OurPrograms />
      <Articles />
      <RecruitmentAD />
      <Contact />
      <Newsletter />
      <Footer />
    </>
  );
};

export default HomePage;
