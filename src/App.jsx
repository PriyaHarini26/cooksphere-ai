import {BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RecipeTube from "./pages/RecipeTube";
import MomCare from "./pages/MomCare";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipetube" element={<RecipeTube />} />
        <Route path="/momcare" element={<MomCare />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;