import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import Register from "./pages/Register";

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MyGoals from './pages/MyGoals';
import Challenges from './pages/Challenges';
import UserProfile from './pages/UserProfile';
import Navbar from './components/Navbar';
import UserData from './pages/UserData';

function AppWrapper() {
  const location = useLocation();
  const hideNavbarOn = ['/']; // Don't show navbar on Login

  return (
    <>
      {!hideNavbarOn.includes(location.pathname) && <Navbar />}
      <Routes>
       <Route path="/" element={<Register />} />
       
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/goals" element={<MyGoals />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/userdata" element={<UserData />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Register />} />
       
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mygoals" element={<MyGoals />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/userdata" element={<UserData />} />
      </Routes>
    </Router>
  );
}

export default App;
