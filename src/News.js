import React from 'react';
import { FaRegCalendarAlt, FaRegCommentAlt, FaRegThumbsUp } from 'react-icons/fa';

const NewspaperArticle = () => {
  return (
    <div className="p-6 md:p-8 lg:p-10 w-full">
      <div className="pb-4 mb-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Breaking News</h2>
        <div className="flex items-center space-x-4 text-gray-500 text-sm md:text-base lg:text-lg">
          <div className="flex items-center space-x-2">
            <FaRegCalendarAlt />
            <span>November 5, 2024</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaRegCommentAlt />
            <span>124 Comments</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaRegThumbsUp />
            <span>2.5K Likes</span>
          </div>
        </div>
      </div>
      <div className="space-y-4 md:space-y-6 lg:space-y-8">
        <p className="text-base md:text-lg lg:text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac magna vel magna
          tincidunt varius. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl
          aliquam nisl, eget aliquam nisl nisl eget nisl.
        </p>
        <p className="text-base md:text-lg lg:text-xl">
          Vivamus euismod, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget
          aliquam nisl nisl eget nisl. Sed ac magna vel magna tincidunt varius. Nullam
          auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl
          nisl eget nisl.
        </p>
        <p className="text-base md:text-lg lg:text-xl">
          Sed ac magna vel magna tincidunt varius. Nullam auctor, nisl eget ultricies
          tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Vivamus
          euismod, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam
          nisl nisl eget nisl.
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-500">
            <FaRegCalendarAlt />
            <span>November 5, 2024</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <FaRegCommentAlt />
            <span>124 Comments</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <FaRegThumbsUp />
            <span>2.5K Likes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewspaperArticle;