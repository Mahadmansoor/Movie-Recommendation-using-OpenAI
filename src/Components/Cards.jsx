import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { UilFilm } from "@iconscout/react-unicons";
import "./background.css";

const Cards = ({ arr, loader }) => {
  const [failedPosters, setFailedPosters] = useState({});
  if (loader) {
    return (
      <div className="flex flex-wrap justify-center gap-8 my-10 px-2">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="w-[320px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm opacity-80"
          >
            <Skeleton
              height={420}
              className="rounded-none"
              baseColor="#1e293b"
              highlightColor="#334155"
            />
            <div className="p-5">
              <Skeleton height={26} width="70%" className="mb-3" baseColor="#1e293b" highlightColor="#334155" />
              <Skeleton count={3} height={14} className="mb-1" baseColor="#1e293b" highlightColor="#334155" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!Array.isArray(arr) || arr.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-4">
          <UilFilm size={32} className="text-slate-500" />
        </div>
        <p className="text-slate-400 text-lg">No recommendations yet</p>
        <p className="text-slate-500 text-sm mt-1">Search for a mood or genre above</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-8 my-10 px-2">
      {arr.map((value, index) => (
        <article
          key={index}
          className="card-reveal movie-card w-[320px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm"
        >
          <div className="relative">
            {value.poster && !failedPosters[index] ? (
              <div className="poster-wrap relative h-[420px]">
                <img
                  src={value.poster}
                  alt={value.title}
                  className="w-full h-full object-cover"
                  onError={() => setFailedPosters((prev) => ({ ...prev, [index]: true }))}
                />
                <div className="poster-overlay absolute inset-0 pointer-events-none" />
              </div>
            ) : (
              <div className="h-[420px] flex items-center justify-center bg-gradient-to-b from-slate-800/60 to-slate-900/80 border-b border-white/5">
                <div className="text-center px-4">
                  <UilFilm size={48} className="text-slate-600 mx-auto mb-2" />
                  <span className="text-slate-500 text-sm">No poster available</span>
                </div>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-5 pt-16">
              <h2 className="font-semibold text-lg text-white tracking-tight leading-tight">
                {value.title}
              </h2>
            </div>
          </div>
          <div className="p-5 pt-2">
            <p className="text-slate-400 text-sm leading-relaxed">
              {value.description}
            </p>
          </div>
        </article>
      ))}
    </div>
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
