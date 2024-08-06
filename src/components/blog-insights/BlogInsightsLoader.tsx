import React from 'react';

const BlogInsightsLoader: React.FC = () => {
  return (
    <>
      {/* {placeholderData.map((item, index) => ( */}
      <div className="flex md:flex-row flex-col lg:p-8 p-6 bg-darkgray lg:gap-x-12 sm:gap-7 gap-3 rounded-20 mb-6 sm:mt-30pixel">
        <div className="lg:w-315 h-200 375:h-300 500:h-400 md:h-150 lg:!h-220 rounded-10 object-cover w-full md:min-w-225 lg:min-w-315 md:w-224 blog-loader__animation"></div>
        <div className="sm:pt-0 pt-3 max-w-617">
          <h3 className="h-35 w-200 blog-loader__animation rounded-md">
            {/* {item.heading} */}
          </h3>
          <div className="flex items-center justify-center mt-6">
            <h3 className="h-35 w-200 blog-loader__animation rounded-md">
              {/* {item.para} */}
            </h3>
            <button className="h-35 w-200 blog-loader__animation rounded-md ms-6">
              {/* {item.btn} */}
            </button>
          </div>
          <h3 className="h-35 w-200 blog-loader__animation rounded-md mt-6"></h3>
        </div>
      </div>
      {/* ))} */}
    </>
  );
};

export default BlogInsightsLoader;
