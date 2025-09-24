import React, { useState } from "react";
import OpenAI from "openai";
import Cards from "./Cards";
import "./background.css";
import {
  UilSearch,
  UilFilm,
  UilClapperBoard,
  UilCamera,
  UilTvRetro,
} from "@iconscout/react-unicons";
let object = [];

const Input = () => {
  const [arr, setArr] = useState([]);
  const [entry, setEntry] = useState("");
  const [loader, setLoader] = useState(false);

  async function inputData() {
    setLoader(true);
    let name = entry;
    setEntry("");
    const openai = new OpenAI({
      apiKey: import.meta.env.VITE_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: `Recommend me movies in json format {"title": "", "description": ""} according to this input from user ${name}. Description must be 3 to 4 lines`,
      max_tokens: 1000,
      temperature: 0.5,
    });

    let obj = completion.choices[0].text;
    object = JSON.parse(obj);
    if (object.length > 3) {
      object = object.splice(0, 3);
    }
    setArr(object);
    setLoader(false);
  }

  const head = "Your Gateway to Movie Bliss";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white overflow-hidden relative">
      {/* Animated background elements */}
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glowing circles (already in your code) */}
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/5 rounded-full blur-2xl animate-bounce delay-2000"></div>

        {/* Floating movie icons */}
        <div className="floating-icon left-1/4 delay-1000">
          <UilFilm size={48} className="text-blue-400/50" />
        </div>
        <div className="floating-icon left-1/2 delay-2000">
          <UilClapperBoard size={48} className="text-purple-400/50" />
        </div>
        <div className="floating-icon left-3/4 delay-3000">
          <UilCamera size={48} className="text-pink-400/50" />
        </div>
        <div className="floating-icon left-1/3 delay-1500">
          <UilTvRetro size={48} className="text-yellow-400/50" />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 py-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl mr-4 shadow-lg">
            <UilFilm size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            MovieMood AI
          </h1>
        </div>
        <p className="text-xl text-gray-300 font-light tracking-wide">
          Your Gateway to Movie Bliss
        </p>
        <div className="mt-2 mx-auto w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      </header>

      {/* Search Section */}
      <div className="relative z-10 flex justify-center mt-12 px-4">
        <div className="w-full max-w-2xl">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative flex bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <input
                className="flex-grow px-6 py-4 bg-transparent text-white placeholder-gray-300 focus:outline-none text-lg"
                placeholder="What kind of movie adventure are you craving today?"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && inputData()}
              />
              <button
                type="button"
                onClick={inputData}
                disabled={loader}
                className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center disabled:opacity-50 group"
              >
                {loader ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                ) : (
                  <UilSearch
                    size={24}
                    className="text-white group-hover:scale-110 transition-transform"
                  />
                )}
              </button>
            </div>
          </div>

          {/* Quick suggestions */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              "Action Movies",
              "Romantic Comedies",
              "Sci-Fi Thrillers",
              "Horror Films",
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setEntry(suggestion)}
                className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 border border-white/10 hover:border-white/20"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="relative z-10 flex justify-center mt-16 px-4 pb-20">
        <Cards arr={arr} loader={loader} />
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 border-t border-gray-800/50">
        <p className="text-gray-400 text-sm">
          Powered by AI • Discover your next favorite movie
        </p>
      </footer>
    </div>
  );
};

export default Input;
