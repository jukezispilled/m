import React from 'react';
import Marquee from 'react-fast-marquee';

const RepeatedMarquee = ({direction}) => {
  // Create an array of 10 elements
  const marqueeText = Array.from({ length: 10 }, (_, index) => (
    <span key={index} className="font-custom text-5xl md:text-6xl text-[#2EFA4F] flex justify-center items-center">
      MILLIONS MUST BUY <img src="comp.gif" className='w-[100px] ml-2'></img>
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