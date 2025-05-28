import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic if any (e.g., clearing auth tokens)
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 flex flex-col">
 
        <nav className="bg-blue-900 shadow-md p-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold text-blue-100">Social Media Detox</h1>
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
    >
      Logout
    </button>
  </nav>
      

      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/mygoals" className="block">
            <div className="bg-white rounded-lg shadow p-4 text-center hover:bg-indigo-50 transition cursor-pointer">
              <h3 className="text-xl font-bold text-indigo-600">My Goals</h3>
            </div>
          </Link>

          <Link to="/challenges" className="block">
            <div className="bg-white rounded-lg shadow p-4 text-center hover:bg-blue-50 transition cursor-pointer">
              <h3 className="text-xl font-bold text-blue-600">Challenges</h3>
            </div>
          </Link>

          <Link to="/profile" className="block">
            <div className="bg-white rounded-lg shadow p-4 text-center hover:bg-green-50 transition cursor-pointer">
              <h3 className="text-xl font-bold text-green-600">User Profile</h3>
            </div>
          </Link>

          <Link to="/userdata" className="bg-white rounded-lg shadow p-4 text-center cursor-pointer hover:shadow-lg transition">
             <h3 className="text-xl font-bold text-pink-600">User Data</h3>
         </Link>

        </div>
      </main>
    </div>
  );
}

export default Dashboard;
