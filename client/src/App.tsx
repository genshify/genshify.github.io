import { Route, BrowserRouter, Routes } from "react-router-dom";

//import components
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Beginner from "./pages/Beginner/Beginner";
import Navbar from "./components/Navbar/Navbar";
import Showcase from "./pages/Showcase/Showcase";
import CharacterDisplay from "./tools/genshin-optimizer/app/PageCharacter/CharacterDisplay";
import PageCharacter from "./tools/genshin-optimizer/app/PageCharacter";

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
        <Route path="/characters/*">
              <Route index element={<PageCharacter />} />
              <Route path=":characterKey/*" element={<CharacterDisplay />} />
            </Route>
      </Routes>
    </BrowserRouter>
  );
}
