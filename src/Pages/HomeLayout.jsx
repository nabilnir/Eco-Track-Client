import React from "react";
import HeroBanner from "../components/Home/HeroBanner";
import LiveStatistics from "../components/Home/LiveStatistics";
import WhyGoGreen from "../components/Home/Static/WhyGoGreen";
import HowItWorks from "../components/Home/Static/HowItWorks";
import ActiveChallenges from "../components/Home/ActiveChallenges";
import RecentTips from "../components/Home/RecentTips";
import UpcomingEvents from "../components/Home/UpComingEvents";

const HomeLayout = () => {
  return (
    <div>
      <HeroBanner />
      <LiveStatistics />
      <ActiveChallenges />
      <RecentTips />
      <UpcomingEvents />
      <WhyGoGreen />
      <HowItWorks />
    </div>
  );
};

export default HomeLayout;
