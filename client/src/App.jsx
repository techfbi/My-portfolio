import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import Admin from "./pages/Admin";
import TechMarquee from "./sections/TechMarquee";
import AddedValue from "./sections/AddedValue";

// Main portfolio page, everything except admin lives here
const HomePage = () => (
  <div className="relative">
    <Navbar />
    <Hero />
    <About />
    <TechMarquee />
    <Projects />
    <AddedValue />
    <Skills />
    <Contact />
    <Footer />
  </div>
);

// Router splits the public site from the admin path
// admin renders standalone with no navbar or footer since its a private tool
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
