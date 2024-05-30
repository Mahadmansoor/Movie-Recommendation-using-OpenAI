import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Cards = ({ arr, loader }) => {
  if (loader) {
    return (
      <div className="flex  my-10">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex space-evenly bg-gray-900 w-96 h-80 rounded-md mx-12 shadow-2xl hover:-translate-y-10 transition transform 0.1s ease-in-out duration-300"
          >
            <div className="bg-gray-600 w-80 h-72 rounded-md mx-auto my-auto text-white text-pretty">
              <Skeleton
                height={24}
                width={125}
                className="bg-gray-900 my-6"
                baseColor="#2d3748"
                highlightColor="#101319"
              />
              <Skeleton
                count={3}
                width={275}
                className="px-4 my-2"
                baseColor="#3b3b3b"
                highlightColor="#222222"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (!Array.isArray(arr) || arr.length === 0)
    return <div>No cards Available</div>;
  return (
    <>
      <div className="flex  my-10">
        {arr.map((value, index) => (
          <div
            key={index}
            className="flex space-evenly bg-gray-900 w-96 h-80 rounded-md mx-12 shadow-2xl hover:-translate-y-10 transition transform 0.1s ease-in-out duration-300"
          >
            <div className="  bg-gray-600 w-80 h-72 rounded-md mx-auto my-auto text-white text-pretty">
              <h1 className=" font-bold justify-center items-center mx-auto px-4 my-2">
                {value.title}
              </h1>
              <p className="text-center my-6 px-4 font-normal">
                {value.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Cards;
