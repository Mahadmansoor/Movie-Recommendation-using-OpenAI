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
            className="flex justify-center items-center bg-gray-900 w-96 h-80 rounded-md mx-12 shadow-2xl hover:-translate-y-10 transition transform 0.1s ease-in-out duration-300"
          >
            <div className="bg-gray-600 w-80 h-72 rounded-md flex flex-col justify-center items-center text-white text-pretty">
              <Skeleton
                height={24}
                width={125}
                className="my-4"
                baseColor="#2d3748"
                highlightColor="#101319"
              />
              <Skeleton
                count={3}
                width={275}
                className="my-2"
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

// import React from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { motion } from "framer-motion";

// const Cards = ({ arr, loader }) => {
//   const tilt = {
//     rest: { rotateX: 0, rotateY: 0, transition: { duration: 0.3 } },
//     hover: (e) => {
//       const rect = e.currentTarget.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       const rotateX = (y / rect.height - 0.5) * -20;
//       const rotateY = (x / rect.width - 0.5) * 20;
//       return {
//         rotateX,
//         rotateY,
//         transition: { type: "spring", stiffness: 300, damping: 20 },
//       };
//     },
//   };

//   if (loader) {
//     return (
//       <div className="flex my-10">
//         {Array.from({ length: 3 }).map((_, index) => (
//           <motion.div
//             key={index}
//             className="flex justify-center items-center bg-gray-900 w-96 h-80 rounded-md mx-12 shadow-2xl"
//             variants={tilt}
//             initial="rest"
//             whileHover="hover"
//             animate="rest"
//           >
//             <div className="bg-gray-600 w-80 h-72 rounded-md flex flex-col justify-center items-center text-white">
//               <Skeleton
//                 height={24}
//                 width={125}
//                 className="my-4"
//                 baseColor="#2d3748"
//                 highlightColor="#101319"
//               />
//               <Skeleton
//                 count={3}
//                 width={275}
//                 className="my-2"
//                 baseColor="#3b3b3b"
//                 highlightColor="#222222"
//               />
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     );
//   }

//   if (!Array.isArray(arr) || arr.length === 0)
//     return <div>No cards Available</div>;

//   return (
//     <div className="flex my-10">
//       {arr.map((value, index) => (
//         <motion.div
//           key={index}
//           className="flex justify-center items-center bg-gray-900 w-96 h-80 rounded-md mx-12 shadow-2xl"
//           variants={tilt}
//           initial="rest"
//           whileHover="hover"
//           animate="rest"
//         >
//           <div className="bg-gray-600 w-80 h-72 rounded-md flex flex-col justify-center items-center text-white">
//             <h1 className="font-bold text-center px-4 my-2">{value.title}</h1>
//             <p className="text-center my-6 px-4 font-normal">
//               {value.description}
//             </p>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// export default Cards;
