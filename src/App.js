import { Routes, Route } from "react-router-dom";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import NotesState from "./contextAPI/NotesState";

const App = () => {
  return (
    <div className="overflow-hidden selection:text-[#5b53c8]">
      <NotesState>
        <Navbar title="iNoteBook"/>
        {/* <Alert message = "Are u sure?"/> */}
        <Routes>
          <Route path="/" element={<Home info="Home" />} />
          <Route path="about" element={<About info="About" />} />
          <Route path="contact" element={<Contact info="Contact" />} />
          <Route path="login" element={<Login/>} />
          <Route path="signup" element={<Signup/>} />
        </Routes>
      </NotesState>
    </div>

  );
}

export default App;
