import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [screenTimeLimit, setScreenTimeLimit] = useState(2);
  const [goal, setGoal] = useState("Reduce screen time and stay focused");

  // Load real user data on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setName(user.username); // Or user.name if your backend sends 'name'
      setEmail(user.email);
    }
  }, []);

  const handleSave = () => {
    alert("Profile updated successfully!");
    // Optionally send updated data to backend here
  };

  const handleReset = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setName(user.username);
      setEmail(user.email);
    }
    setScreenTimeLimit(2);
    setGoal("Reduce screen time and stay focused");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-200 to-emerald-300 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-purple-600 mb-6 text-center">
          Update Profile
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Daily Screen Time Limit (hrs)</label>
            <input
              type="number"
              value={screenTimeLimit}
              onChange={(e) => setScreenTimeLimit(Number(e.target.value))}
              className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Detox Goal</label>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
