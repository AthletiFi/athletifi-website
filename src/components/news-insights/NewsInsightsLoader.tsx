import React from 'react';

const NewsInsightsLoader = () => {
  return (
    <>
      {/* {placeholderData.map((item, index) => ( */}
      <div className="flex md:flex-row flex-col lg:p-8 p-6 bg-darkgray lg:gap-x-12 sm:gap-7 gap-3 rounded-[20px] mb-6 sm:mt-[30px]">
        <div className="lg:w-[315px] h-[200px] min-[375px]:h-[300px] min-[500px]:h-[400px] md:h-[150px] lg:!h-[220px] rounded-[10px] object-cover w-full md:min-w-[225px] lg:min-w-[315px] md:w-[224px] news-loader__animation"></div>
        <div className="sm:pt-0 pt-3 max-w-[617px]">
          <h3 className="h-[35px] w-[200px] news-loader__animation rounded-md">
            {/* {item.heading} */}
          </h3>
          <div className="flex items-center justify-center mt-6">
            <h3 className="h-[35px] w-[200px] news-loader__animation rounded-md">
              {/* {item.para} */}
            </h3>
            <button className="h-[35px] w-[200px] news-loader__animation rounded-md ms-6">
              {/* {item.btn} */}
            </button>
          </div>
          <h3 className="h-[35px] w-[200px] news-loader__animation rounded-md mt-6"></h3>
        </div>
      </div>
      {/* ))} */}
    </>
  );
};

export default NewsInsightsLoader;
