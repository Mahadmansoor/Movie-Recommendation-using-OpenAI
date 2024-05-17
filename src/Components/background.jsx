import React, { useState } from "react";
import { UilSearch } from "@iconscout/react-unicons";
const Input = () => {
  const [entry, setEntry] = useState("");
  const [arr, setArr] = useState([]);
  function inputData() {
    console.log(entry);
    setArr([...arr, entry]);
    setEntry("");
  }
  let prompt = `I have a website for movie recommendations. User will prompt some input and at the basis of that input you will suggest movies. user's input is ${
    arr[arr.length - 1]
  }`;
  const head = "Your Gateway to Movie Bliss";
  return (
    <>
      <div className="flex-1">
        <div className="flex bg-gray-800 w-full h-12">
          <h1 className=" text-slate-200 text-lg justify-center mx-auto tracking-widest my-auto">
            {head}
          </h1>
        </div>
        <div className="flex space-x-4 justify-center items-center">
          <input
            className="flex font-medium text-center cursor-text my-20 w-1/3 rounded focus:outline-none shadow-xl"
            placeholder="Ready to embark on a movie adventure?"
            value={entry}
            onChange={(e) => {
              setEntry(e.target.value);
            }}
          ></input>
          <button
            type="search"
            onClick={() => {
              inputData();
            }}
          >
            <UilSearch
              size={25}
              className="flex text-black cursor-pointer hover:scale-125 hover:transition ease-in-out"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Input;
