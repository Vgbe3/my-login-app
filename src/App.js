import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  Homepage  from './myComponents/Homepage';

import Loginpage from './myComponents/Loginpage';
import Registerpage from './myComponents/Registerpage';
import Welcomepage from './myComponents/Welcomepage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/welcome" element={<Welcomepage />} />
      </Routes>
    </Router>
  ); 
}

export default App;
