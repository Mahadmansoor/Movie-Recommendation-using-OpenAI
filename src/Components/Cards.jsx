import React from "react";
let content =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non posuere ipsum. Phasellus euismod, lectus id varius convallis";
const Cards = () => {
  return (
    <div className="flex my-12">
      <div className="flex bg-gray-900 w-80 h-80 rounded-md mx-12 shadow-2xl hover:-translate-y-10 transition ease-in-out">
        <div className="flex bg-gray-600 w-64 h-64 rounded-md mx-auto my-auto text-white text-pretty">
          {content}
        </div>
      </div>
      <div className="flex bg-gray-900 w-80 h-80 rounded-md mx-12 shadow-2xl hover:-translate-y-10 transition ease-in-out">
        <div className="flex bg-gray-600 w-64 h-64 rounded-md mx-auto my-auto text-white text-pretty">
          {content}
        </div>
      </div>
      <div className="flex bg-gray-900 w-80 h-80 rounded-md mx-12 shadow-2xl hover:-translate-y-10 transition ease-in-out">
        <div className="flex bg-gray-600 w-64 h-64 rounded-md mx-auto my-auto text-white text-pretty">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Cards;
