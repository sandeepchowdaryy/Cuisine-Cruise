import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useRef } from "react";
import { Link } from "react-router-dom";
const WhatsOnMind = ({ foodItemImages, foodItemsHeader }) => {
  // console.log(foodItemImages);
  const ScrollBar = useRef();
  // console.log(foodItemImages);
  const scrollLeft = () => {
    ScrollBar.current.scrollLeft = ScrollBar.current.scrollLeft + 1050;
    // console.log(ScrollBar);
  };

  const scrollRight = () => {
    ScrollBar.current.scrollLeft = ScrollBar.current.scrollLeft - 1050;
    // console.log(ScrollBar);
  };

  const findCollectionId = (givenURL) => {
    const url = givenURL;
    // Define a regex pattern to capture the 'collection_id' value
    const regex = /[?&]collection_id=([^&]+)/;

    // Find the match
    const match = regex.exec(url);

    // If there's a match, extract the first capture group (the collection_id value)
    const collectionId = match ? match[1] : null;

    return collectionId; // Output: 83644
  };
  return (
    <div className="food-items w-10/12 m-auto ">
      <h1 className="font-Poppins font-bold text-lg lg:text-2xl ml-3 ">
        {foodItemsHeader.title}
      </h1>
      <div className=" flex flex-col ">
        <div className="flex gap-3 self-end">
          <span>
            <FaArrowLeft
              size={33}
              className="bg-gray-200 rounded-full p-2 opacity-70 hover:opacity-100 cursor-pointer"
              onClick={scrollRight}
            />
          </span>
          <span>
            <FaArrowRight
              size={33}
              className="bg-gray-200 rounded-full p-2 opacity-70 hover:opacity-100 cursor-pointer"
              onClick={scrollLeft}
            />
          </span>
        </div>
        <div
          className="flex flex-nowrap overflow-x-auto  scroll-smooth no-scrollbar"
          ref={ScrollBar}
        >
          {foodItemImages.map((item) => (
            <div
              className="flex-grow-0 flex-shrink-0 basis-auto hover:scale-105 transition-all"
              key={item.id}
            >
              
          
                <img
                  src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"+ item.imageId}
                  className="h-32 lg:h-44 w-32 lg:w-44 cursor-pointer"
                />
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatsOnMind;
