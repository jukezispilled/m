import React from 'react';
import Marquee from 'react-fast-marquee';

const RepeatedMarquee = ({direction}) => {
  // Create an array of 10 elements
  const marqueeText = Array.from({ length: 10 }, (_, index) => (
    <span key={index} className="py-2 font-custom mx-4 text-4xl md:text-5xl text-blue-700">
      MAKE THE MARKET GREAT AGAIN!
    </span>
  ));

  return (
    <div className="">
      <Marquee gradient={false} speed={100} direction={direction}>
        <div className="flex">
          {marqueeText}
        </div>
      </Marquee>
    </div>
  );
};

export default RepeatedMarquee;