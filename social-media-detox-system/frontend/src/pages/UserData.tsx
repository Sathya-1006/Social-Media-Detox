import React, { useState, useEffect } from "react";
const platforms = ["YouTube", "Instagram", "Facebook", "Movies", "Game"];

const suggestions = [
  "Read a book for 10 minutes 📚",
  "Take a short walk 🚶",
  "Practice deep breathing 🧘",
  "Write down 3 things you're grateful for ✍️",
  "Stretch your body for 5 minutes 🧎",
  "Listen to calm music 🎵"
];

const UserData: React.FC = () => {
  // Load from localStorage or use default structure
 const [usageData, setUsageData] = useState<Record<string, { today: string; limit: string }>>(() => {
  const stored = localStorage.getItem("usageData");
  const initialData = platforms.reduce((acc, platform) => {
    acc[platform] = { today: "", limit: "" };
    return acc;
  }, {} as Record<string, { today: string; limit: string }>);

  if (stored) {
    const parsed = JSON.parse(stored);
    // Only include valid platforms and preserve existing data
    platforms.forEach((platform) => {
      if (parsed[platform]) {
        initialData[platform] = parsed[platform];
      }
    });
  }

  return initialData;
});


  const [lastUpdated, setLastUpdated] = useState<Date | null>(() => {
    const stored = localStorage.getItem("lastUpdated");
    return stored ? new Date(stored) : null;
  });

  const handleChange = (
    platform: string,
    field: "today" | "limit",
    value: string
  ) => {
    setUsageData((prev) => {
      const updated = {
        ...prev,
        [platform]: {
          ...prev[platform],
          [field]: value,
        },
      };
      localStorage.setItem("usageData", JSON.stringify(updated));
      return updated;
    });
  };

  const handleUpdate = () => {
    const now = new Date();
    setLastUpdated(now);
    localStorage.setItem("usageData", JSON.stringify(usageData));
    localStorage.setItem("lastUpdated", now.toISOString());
    alert("Usage data updated successfully!");
  };

  const getSuggestion = () => {
    const index = Math.floor(Math.random() * suggestions.length);
    return suggestions[index];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <h2 className="text-3xl font-bold mb-6 text-purple-700">User Data</h2>

      <div className="grid sm:grid-cols-2 gap-6">
        {platforms.map((platform) => {
          const today = parseInt(usageData[platform].today || "0");
          const limit = parseInt(usageData[platform].limit || "0");
          const percentage = limit > 0 ? Math.min((today / limit) * 100, 100) : 0;
          const isOverLimit = limit > 0 && today > limit;

          return (
            <div key={platform} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{platform}</h3>

              <label className="block mb-1 text-sm text-gray-600">Daily Limit (minutes)</label>
              <input
                type="number"
                className="w-full border p-2 rounded mb-3"
                value={usageData[platform].limit}
                onChange={(e) => handleChange(platform, "limit", e.target.value)}
              />

              <label className="block mb-1 text-sm text-gray-600">Today's Usage (minutes)</label>
              <input
                type="number"
                className="w-full border p-2 rounded mb-2"
                value={usageData[platform].today}
                onChange={(e) => handleChange(platform, "today", e.target.value)}
              />

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
                <div
                  className={`h-5 ${isOverLimit ? "bg-red-500" : "bg-green-500"}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              <p className="mt-1 text-sm text-gray-700">
                {percentage.toFixed(0)}% of daily limit used
              </p>

              {isOverLimit && (
                <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded text-sm text-gray-700">
                  <strong>You've exceeded your limit!</strong>
                  <p className="mt-1">{getSuggestion()}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={handleUpdate}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
        >
          Update Data
        </button>
        {lastUpdated && (
          <p className="text-sm text-gray-600">
            Last Updated: {lastUpdated.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserData;
