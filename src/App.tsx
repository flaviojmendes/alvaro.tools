import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Textarea } from "@chakra-ui/react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { FaBackspace, FaSpeakap } from "react-icons/fa";
import { GiNothingToSay } from "react-icons/gi";
import Button from "./components/Button";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ConfigPage from "./pages/ConfigPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/config" element={<ConfigPage />} />

    </Routes>
  );
}

export default App;
