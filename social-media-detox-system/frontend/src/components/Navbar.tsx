// src/components/Navbar.tsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex gap-6">
      <Link to="/dashboard" className="hover:underline">Dashboard</Link>
      <Link to="/goals" className="hover:underline">My Goals</Link>
      <Link to="/challenges" className="hover:underline">Challenges</Link>
      <Link to="/profile" className="hover:underline">User Profile</Link>
      <Link to="/" className="ml-auto hover:underline">Logout</Link>
    </nav>
  );
};

export default Navbar;
