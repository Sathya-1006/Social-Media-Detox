import React, { useState, useEffect } from "react";


interface Challenge {
  id: number;
  title: string;
  description: string;
  progress: number; // 0 to 100
}
const initialChallenges: Challenge[] = [
  {
    id: 1,
    title: "Get Up Before 6 AM for 1 Week",
    description: "Wake up before 6 AM every day for a whole week.",
    progress: 0,
  },
  {
    id: 2,
    title: "No Social Media from 9 PM to 9 AM",
    description: "Avoid all social media usage between 9 PM and 9 AM.",
    progress: 0,
  },
  {
    id: 3,
    title: "No Phone During Meals for 1 Week",
    description: "Do not use your phone while eating for a full week.",
    progress: 0,
  },
  {
    id: 4,
    title: "Limit Social Media to 30 Minutes a Day",
    description: "Keep social media usage under 30 minutes each day for 7 days.",
    progress: 0,
  },
  {
    id: 5,
    title: "Read a Book Instead of Social Media",
    description: "Spend at least 30 minutes reading a book instead of social media daily for 1 week.",
    progress: 0,
  },
];

const Challenges: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    // Load saved progress from localStorage if exists
    const saved = localStorage.getItem("challenges");
    return saved ? JSON.parse(saved) : initialChallenges;
  });

  // Save challenges progress to localStorage on every update
  useEffect(() => {
    localStorage.setItem("challenges", JSON.stringify(challenges));
  }, [challenges]);

  // Handle updating progress
  const updateProgress = (id: number, newProgress: number) => {
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, progress: newProgress > 100 ? 100 : newProgress }
          : c
      )
    );
  };

  // Reset all challenges progress
  const resetChallenges = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all challenge progress?"
      )
    ) {
      setChallenges(initialChallenges);
      localStorage.removeItem("challenges");
    }
  };

  // Split challenges into completed and ongoing
  const completedChallenges = challenges.filter((c) => c.progress >= 100);
  const ongoingChallenges = challenges.filter((c) => c.progress < 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-violet-200 to-violet-300  flex flex-col items-center justify-center ">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Challenges
      </h2>

      {completedChallenges.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-green-600 border-b border-green-300 pb-2">
            Completed Challenges 🎉
          </h3>
          <div className="space-y-4">
            {completedChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-green-100 border border-green-400 rounded-lg p-4 shadow-md animate-pulse"
              >
                <h4 className="text-lg font-bold line-through text-green-700">
                  {challenge.title}
                </h4>
                <p className="text-green-700">{challenge.description}</p>
                <p className="font-semibold text-green-800">
                  Completed ✔️
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h3 className="text-xl font-semibold mb-4 text-indigo-700 border-b border-indigo-300 pb-2">
          Ongoing Challenges
        </h3>

        <div className="space-y-6">
          {ongoingChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-white rounded-lg shadow p-5"
            >
              <h4 className="text-lg font-bold mb-2">{challenge.title}</h4>
              <p className="mb-3">{challenge.description}</p>

              <label
                htmlFor={`progress-${challenge.id}`}
                className="block mb-1 font-semibold"
              >
                Progress: {challenge.progress}%
              </label>
              <input
                id={`progress-${challenge.id}`}
                type="range"
                min={0}
                max={100}
                step={5}
                value={challenge.progress}
                onChange={(e) =>
                  updateProgress(challenge.id, Number(e.target.value))
                }
                className="w-full"
              />

              {challenge.progress >= 100 && (
                <p className="text-green-600 font-semibold mt-2">
                  Challenge Completed! 🎉
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10 text-center">
        <button
          onClick={resetChallenges}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded shadow"
        >
          Reset All Challenges
        </button>
      </div>
    </div>
  );
};

export default Challenges;