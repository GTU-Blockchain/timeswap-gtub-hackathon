import { useState } from "react";

const skills = [
  { name: "Python Programming", hours: 1000, reputation: 5.0 },
  { name: "Product Design", hours: 200, reputation: 4.9 },
  { name: "Mentorship", hours: 500, reputation: 4.8 },
  { name: "Marketing", hours: 300, reputation: 4.7 },
];

const categories = [
  "All",
  "Programming",
  "Design",
  "Mentorship",
  "Marketing",
  "Writing",
  "Illustration",
  "Music",
  "Video Production",
  "Photography",
  "Other",
];

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPage, setSelectedPage] = useState("Skills");

  return (
    <section className="grid grid-cols-4 bg-[var(--color-background-dark)] text-white h-screen font-sans">
      {/* Sidebar */}
      <div className="col-span-1 h-full flex flex-col px-6 py-8 space-y-6">
        <div className="text-xl font-semibold">Profile</div>
        <div
          className={`px-4 py-2 rounded-md cursor-pointer ${
            selectedPage === "Skills" ? "bg-purple-800" : ""
          }`}
          onClick={() => setSelectedPage("Skills")}
        >
          Skills
        </div>
        <div
          className={`px-4 py-2 rounded-md cursor-pointer ${
            selectedPage === "Timebank" ? "bg-purple-800" : ""
          }`}
          onClick={() => setSelectedPage("Timebank")}
        >
          Timebank
        </div>
        <div
          className={`px-4 py-2 rounded-md cursor-pointer ${
            selectedPage === "Settings" ? "bg-purple-800" : ""
          }`}
          onClick={() => setSelectedPage("Settings")}
        >
          Settings
        </div>
      </div>

      {/* Main Content */}
      <div className="col-span-3 h-full px-12 py-8 overflow-auto">
        <h1 className="text-3xl font-semibold mb-1">Find a skill</h1>
        <p className="text-sm text-gray-300 mb-6">
          Browse available skills and hours
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCategory === cat
                  ? "bg-purple-800"
                  : "bg-purple-900 hover:bg-purple-700"
              }`}
              onClick={() =>
                setSelectedCategory(selectedCategory === cat ? "All" : cat)
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills List */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Results</h2>
          <ul className="space-y-4">
            {skills.map((skill, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-800 p-4 rounded-md"
              >
                <div>
                  <div className="font-semibold">{skill.name}</div>
                  <div className="text-sm text-gray-400">
                    {skill.hours} hours, {skill.reputation.toFixed(1)}{" "}
                    reputation
                  </div>
                </div>
                <button className="bg-purple-800 px-4 py-2 rounded-md text-sm">
                  Trade
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Explore;
