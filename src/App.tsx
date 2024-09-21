import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Components/Home';
import Splash from './Components/splash';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import UserDetailsPage from './Components/UserDetailsPage';
import BlogDetails from './Components/BlogDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home/userdetails" element={<UserDetailsPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Splash />} />

        <Route path="/home/blog/:blogId" element={<BlogDetails />} /> 
      </Routes>
    </Router>
  );
}

export default App;
