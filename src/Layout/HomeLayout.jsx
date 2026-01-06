import React from "react";
import HeroBanner from "../components/Home/HeroBanner";
import LiveStatistics from "../components/Home/LiveStatistics";
import WhyGoGreen from "../components/Home/Static/WhyGoGreen";
import HowItWorks from "../components/Home/Static/HowItWorks";
import ActiveChallenges from "../components/Home/ActiveChallenges";
import RecentTips from "../components/Home/RecentTips";
import UpComingEvents from '../components/Home/UpComingEvents';
import FAQ from '../components/Home/Static/FAQ';
import { Toaster } from "react-hot-toast";
import useTitle from "../Hooks/useTitle";
import Testimonials from "../components/Home/Testimonials";
import BrandCarousel from "../components/Home/BrandCarousel";
import BlogSection from "../components/Home/BlogSection";



const HomeLayout = () => {
  useTitle('Home')
  return (
    <div>
      <Toaster position="top-right" />
      <HeroBanner />
      <LiveStatistics />
      <ActiveChallenges />
      <RecentTips />
      <UpComingEvents />
      <WhyGoGreen />
      <HowItWorks />
      <BrandCarousel />
      <Testimonials />
      <BlogSection />
      <FAQ />
    </div>
  );
};

export default HomeLayout;
