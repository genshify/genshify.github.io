import { Route, BrowserRouter, Routes } from "react-router-dom";

//import components
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Beginner from "./pages/Beginner/Beginner";
import Navbar from "./components/Navbar/Navbar";
import Showcase from "./pages/Showcase/Showcase";

export default function App() {
  return (
    <BrowserRouter>
      {/* navbar */}
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/beginner" element={<Beginner />} />
        <Route path="/showcase" element={<Showcase />} />
      </Routes>
    </BrowserRouter>
  );
}
