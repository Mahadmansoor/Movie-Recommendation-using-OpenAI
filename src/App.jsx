import { useEffect, useState } from "react";
import OpenAI from "openai";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Input from "./Components/background";
import Cards from "./Components/Cards";
import Api from "./script";
function App() {
  return (
    <>
      <div>
        <Input />
      </div>
    </>
  );
}
export default App;
