import React from "react";

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="heading-serif text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Start your sustainability journey in 3 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold border-4 border-gray-50 dark:border-gray-900">
              1
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Join a Challenge
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse our active challenges and pick one that interests you.
                From reducing plastic to saving energy!
              </p>
            </div>
          </div>

          <div className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold border-4 border-gray-50 dark:border-gray-900">
              2
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Track Progress
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Log your daily actions and watch your impact grow. Update your
                progress anytime from your dashboard.
              </p>
            </div>
          </div>

          <div className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold border-4 border-gray-50 dark:border-gray-900">
              3
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Share Tips
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Share your experiences and learn from others. Build a greener
                future together!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
