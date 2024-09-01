import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Components/Home';
import Splash from './Components/splash';
import Login from './Components/Login';
import SignUp from './Components/SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Splash />} />
      </Routes>
    </Router>
  );
}

export default App;
