import React from 'react';
import HeroBanner from '../components/Home/HeroBanner';
import LiveStatistics from '../components/Home/LiveStatistics';
import WhyGoGreen from '../components/Home/Static/WhyGoGreen';
import HowItWorks from '../components/Home/Static/HowItWorks';

const HomeLayout = () => {
    return (
        <div>
            <HeroBanner />
            <LiveStatistics />
            <WhyGoGreen />
            <HowItWorks />
        </div>
    );
};

export default HomeLayout;