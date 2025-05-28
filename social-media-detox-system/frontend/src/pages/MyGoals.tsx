import React, { useState, useEffect } from "react";

type Goal = {
  id: number;
  name: string;
  log: string[]; // dates in YYYY-MM-DD format for days completed
};

const initialGoals: Goal[] = [
  { id: 1, name: "Morning screen-free routine", log: [] },
  { id: 2, name: "Read at least 10 pages", log: [] },
  { id: 3, name: "Exercise for 30 minutes", log: [] },
];

const getToday = () => new Date().toISOString().slice(0, 10);

const calculateStreak = (log: string[]) => {
  if (log.length === 0) return 0;
  let streak = 0;
  let currentDate = new Date();
  while (true) {
    const dayStr = currentDate.toISOString().slice(0, 10);
    if (log.includes(dayStr)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
};

const Goals: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>(() => {
    const stored = localStorage.getItem("goals");
    return stored ? JSON.parse(stored) : initialGoals;
  });

  const [adding, setAdding] = useState(false);
  const [newGoalName, setNewGoalName] = useState("");

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const toggleTodayDone = (goalId: number) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        if (goal.id !== goalId) return goal;
        const today = getToday();
        let newLog = [...goal.log];
        if (newLog.includes(today)) {
          newLog = newLog.filter((d) => d !== today);
        } else {
          newLog.push(today);
        }
        return { ...goal, log: newLog };
      })
    );
  };

  const handleAddGoal = () => {
    if (newGoalName.trim() === "") return;
    const newGoal: Goal = {
      id: Date.now(),
      name: newGoalName.trim(),
      log: [],
    };
    setGoals((prev) => [...prev, newGoal]);
    setNewGoalName("");
    setAdding(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-yellow-400 to-orange-600 p-8 text-white">
 
      <h2 className="text-4xl font-bold mb-8">My Goals & Streaks 🔥</h2>

      {/* Add Goal Button */}
      <button
        onClick={() => setAdding((prev) => !prev)}
        className="absolute top-8 right-8 text-white text-4xl font-bold rounded-full w-12 h-12 flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 shadow-lg transition"
        aria-label={adding ? "Cancel adding goal" : "Add new goal"}
      >
        {adding ? "×" : "+"}
      </button>

      {/* Input to add new goal */}
      {adding && (
        <div className="mb-6 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Enter your new goal..."
            value={newGoalName}
            onChange={(e) => setNewGoalName(e.target.value)}
            className="w-full px-4 py-2 rounded text-black"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddGoal();
              else if (e.key === "Escape") setAdding(false);
            }}
            autoFocus
          />
          <button
            onClick={handleAddGoal}
            className="mt-2 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition"
          >
            Add Goal
          </button>
        </div>
      )}

      <div className="space-y-8 max-w-3xl mx-auto">
        {goals.map((goal) => {
          const streak = calculateStreak(goal.log);
          const doneToday = goal.log.includes(getToday());
          return (
            <div
              key={goal.id}
              className="bg-black bg-opacity-40 rounded-lg p-6 shadow-lg"
            >
              <h3 className="text-2xl font-semibold">{goal.name}</h3>
              <button
                onClick={() => toggleTodayDone(goal.id)}
                className={`mt-4 px-6 py-2 rounded ${
                  doneToday ? "bg-green-500" : "bg-gray-700"
                } hover:bg-green-600 transition`}
              >
                {doneToday ? "Mark as Not Done Today" : "Mark as Done Today"}
              </button>
              <p className="mt-3 text-yellow-300 font-semibold">
                Current Streak: {streak} day{streak !== 1 ? "s" : ""}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Goals;
