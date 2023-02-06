import "./App.css";
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
