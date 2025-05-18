import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter basename="/timeswap-gtub-hackathon">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore/" element={<Explore />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
