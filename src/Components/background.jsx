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
  const [error, setError] = useState(null);

  // Clean movie title for better TMDB search (remove year, extra text)
  function cleanMovieTitle(title) {
    if (!title || typeof title !== "string") return "";
    return title
      .replace(/\s*\(\d{4}\)\s*$/, "") // remove (2020) at end
      .replace(/\s*-\s*.*$/, "") // remove " - Tagline" etc.
      .trim();
  }

  // Function to fetch movie poster from OMDB API (free, allows production use)
  async function fetchMoviePoster(movieTitle) {
    try {
      const omdbApiKey = import.meta.env.VITE_OMDB_API_KEY;
      if (!omdbApiKey) {
        console.warn("OMDB API key not found. Add VITE_OMDB_API_KEY to .env");
        return null;
      }

      const query = cleanMovieTitle(movieTitle) || movieTitle;
      // OMDB API - free tier allows production use
      const searchUrl = `https://www.omdbapi.com/?apikey=${omdbApiKey}&t=${encodeURIComponent(query)}&plot=short`;

      const response = await fetch(searchUrl);
      if (!response.ok) {
        throw new Error(`OMDB API error: ${response.status}`);
      }

      const data = await response.json();

      // OMDB returns "N/A" for missing posters
      if (data.Poster && data.Poster !== "N/A") {
        return data.Poster;
      }
      return null;
    } catch (error) {
      console.error("Error fetching poster for", movieTitle, error);
      return null;
    }
  }

  async function inputData() {
    setError(null);
    setLoader(true);
    const name = entry.trim();
    setEntry("");

    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
      setLoader(false);
      setError(
        "API key is missing. If you deployed on Vercel, add VITE_API_KEY in Project Settings → Environment Variables, then redeploy.",
      );
      return;
    }

    try {
      const openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true,
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Recommend me movies in json format [{"title": "", "description": ""}] according to this input from user: ${name}. Return only a valid JSON array. Description must be 3 to 4 lines.`,
          },
        ],
        max_tokens: 1000,
        temperature: 0.5,
      });

      let obj = completion.choices[0].message.content?.trim() ?? "";
      const jsonMatch = obj.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) obj = jsonMatch[1].trim();
      object = JSON.parse(obj);

      const moviesWithPosters = await Promise.all(
        object.map(async (movie) => {
          const posterUrl = await fetchMoviePoster(movie.title);
          return { ...movie, poster: posterUrl };
        }),
      );

      setArr(moviesWithPosters);
    } catch (err) {
      console.error("Recommendation error:", err);
      setError(
        err?.message || "Something went wrong. Check the console for details.",
      );
    } finally {
      setLoader(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white overflow-hidden relative">
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute -bottom-1/2 -left-1/2 w-[500px] h-[500px] bg-violet-500/15 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/3 left-1/2 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-3xl" />

        <div className="floating-icon left-[18%] delay-1000">
          <UilFilm size={40} className="text-indigo-400/40" />
        </div>
        <div className="floating-icon left-[48%] delay-2000">
          <UilClapperBoard size={44} className="text-violet-400/40" />
        </div>
        <div className="floating-icon left-[78%] delay-3000">
          <UilCamera size={38} className="text-fuchsia-400/40" />
        </div>
        <div className="floating-icon left-[32%] delay-1500">
          <UilTvRetro size={36} className="text-amber-400/30" />
        </div>
      </div>
      <div className="grain-overlay" aria-hidden="true" />

      {/* Header */}
      <header className="relative z-10 pt-12 pb-6 text-center">
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-lg">
            <UilFilm size={28} className="text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight cursor-default">
            <span className="title-gradient bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              MovieMood AI
            </span>
          </h1>
        </div>
        <p className="text-lg text-slate-400 font-light tracking-wide cursor-default">
          Your gateway to movie bliss
        </p>
        <div className="mt-3 h-0.5 w-20 mx-auto rounded-full bg-gradient-to-r from-indigo-500/60 via-violet-500/60 to-transparent" />
      </header>

      {/* Search Section */}
      <div className="relative z-10 flex justify-center mt-10 px-4">
        <div className="w-full max-w-xl">
          <div className="search-glow relative flex bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
            <input
              className="flex-grow px-5 py-4 bg-transparent text-white placeholder-slate-500 focus:outline-none text-base"
              placeholder="e.g. feel-good comedy, mind-bending sci-fi…"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && inputData()}
            />
            <button
              type="button"
              onClick={inputData}
              disabled={loader}
              className="shrink-0 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 transition-all duration-300 flex items-center justify-center"
            >
              {loader ? (
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <UilSearch size={22} className="text-white" />
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm text-center">
              {error}
            </div>
          )}
          <p className="mt-3 text-center text-slate-500 text-sm">or try</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {["Action", "Rom-com", "Sci‑fi", "Horror", "Documentary"].map(
              (suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setEntry(suggestion)}
                  className="pill-hover px-4 py-2 rounded-full text-sm text-slate-400 bg-white/5 border border-white/10 hover:text-white hover:border-indigo-500/40"
                >
                  {suggestion}
                </button>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div
        className={`relative z-10 flex justify-center mt-14 px-4 pb-24 transition-all duration-500 ${
          arr.length > 0 ? "flex-grow" : ""
        }`}
      >
        <Cards arr={arr} loader={loader} />
      </div>

      {/* Footer */}
      <footer
        className={`relative z-10 text-center py-6 border-t border-white/5 transition-all duration-500 ${
          arr.length > 0 ? "mt-auto" : ""
        }`}
      >
        <p className="text-slate-500 text-sm">
          Powered by AI · Discover your next favorite movie
        </p>
      </footer>
    </div>
  );
};

export default Input;
