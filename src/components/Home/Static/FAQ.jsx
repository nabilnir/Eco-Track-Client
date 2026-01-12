import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is Eco-Track and how does it work?",
      answer: "Eco-Track is a comprehensive platform that helps you monitor and reduce your environmental impact. Track daily activities, join challenges, earn rewards, and connect with a community of eco-conscious individuals working towards a sustainable future."
    },
    {
      question: "How do I get started with Eco-Track?",
      answer: "Getting started is easy! Simply create an account, set up your profile, and begin tracking your eco-friendly activities. You can join challenges immediately, connect with others, and start earning rewards for your sustainable actions."
    },
    {
      question: "What types of activities can I track?",
      answer: "You can track various activities including energy consumption, waste reduction, water usage, transportation choices, sustainable shopping, recycling efforts, and community participation. Our platform covers all aspects of sustainable living."
    },
    {
      question: "How are rewards calculated and distributed?",
      answer: "Rewards are based on points earned through tracked activities, challenge participation, and community engagement. The more consistent and impactful your eco-actions, the higher your rewards. Points can be redeemed for eco-friendly products and services."
    },
    {
      question: "Can I create my own challenges?",
      answer: "Yes! Premium members can create custom challenges for their communities, workplaces, or friend groups. You can set goals, invite participants, and track collective progress towards sustainability targets."
    },
    {
      question: "Is my data private and secure?",
      answer: "Absolutely! We take data privacy seriously. Your personal information and activity data are encrypted and never shared with third parties without your explicit consent. You have full control over your privacy settings."
    },
    {
      question: "How does the community aspect work?",
      answer: "Connect with like-minded individuals, join local events, share tips, and participate in discussions. Our community features include forums, local meetups, group challenges, and knowledge sharing about sustainable practices."
    },
    {
      question: "What impact can I really make?",
      answer: "Every action counts! Our platform has helped thousands of users collectively save millions of pounds of CO2, reduce waste significantly, and adopt sustainable habits. Your individual contribution, combined with others, creates meaningful environmental change."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 dark:bg-emerald-600 rounded-full mb-4">
            <FaQuestionCircle className="text-3xl text-white" />
          </div>
          <h2
            className="heading-serif text-4xl font-bold text-gray-900 dark:text-white mb-4"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            Frequently Asked Questions
          </h2>
          <p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Find answers to common questions about Eco-Track and sustainable living
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-t-xl"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {activeIndex === index ? (
                    <FaChevronUp className="text-emerald-500 dark:text-emerald-400 text-xl" />
                  ) : (
                    <FaChevronDown className="text-gray-500 dark:text-gray-400 text-xl" />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
              >
                <div className="px-6 pb-4">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div
            className="inline-flex items-center gap-4 text-gray-600 dark:text-gray-300"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            <FaQuestionCircle className="text-xl" />
            <p className="text-lg">
              Still have questions?
              <a
                href="/contact"
                className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium ml-1"
              >
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
