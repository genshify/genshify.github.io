import {Route ,BrowserRouter, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Beginner from './pages/Beginner/Beginner';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/beginner" element={<Beginner />}/>
      </Routes>
    </BrowserRouter>
  )
}
