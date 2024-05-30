import React, { useState } from "react";
import OpenAI from "openai";
import { UilSearch } from "@iconscout/react-unicons";
import Cards from "./Cards";
let object = [];
const Input = () => {
  const [arr, setArr] = useState([]);
  const [entry, setEntry] = useState("");
  const [loader, setLoader] = useState(false);
  // TODO: store the user search history in local storage
  async function inputData() {
    setLoader(true);
    let name = entry;
    setEntry("");
    const openai = new OpenAI({
      apiKey: import.meta.env.VITE_API_KEY, // This is the default and can be omitted
      dangerouslyAllowBrowser: true,
    });

    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: `Recommend me movies in json format {"title": "", "description": ""} according to this input from user ${name}. Description must be 3 to 4 lines`,
      max_tokens: 1000,
      temperature: 0.5,
    });
    console.log("before", completion.choices[0].text);
    let obj = completion.choices[0].text;
    object = JSON.parse(obj);
    console.log("object is: ", object.length);
    if (object.length > 3) {
      object = object.splice(0, 3);
    }
    setArr(object);
    setLoader(false);
  }
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
              className="flex text-black cursor-pointer hover:scale-125 hover:transition ease-in-out duration-200"
            />
          </button>
        </div>
        <Cards arr={arr} loader={loader} />
      </div>
    </>
  );
};
export default Input;
