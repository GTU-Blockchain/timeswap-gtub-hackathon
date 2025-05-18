import { useState } from "react";
import { Link } from "react-router-dom";
import Skills from "../components/Skills";

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
    <section className="grid grid-cols-4 bg-[var(--color-background-dark)] text-white h-screen">
      {/* Sidebar */}
      <div className="col-span-1 h-full flex flex-col px-6 py-8 space-y-6">
        <Link
          to={"/"}
          className="text-2xl font-bold decoration-[var(--color-primary)] underline decoration-4"
        >
          TimeSwap
        </Link>
        <div
          className={`px-4 py-2 rounded-md cursor-pointer  ${
            selectedPage === "Profile"
              ? "bg-[var(--color-secondary-dark)] "
              : "hover:bg-purple-900/20 transition-colors duration-200"
          }`}
          onClick={() => setSelectedPage("Profile")}
        >
          Profile
        </div>
        <div
          className={`px-4 py-2 rounded-md cursor-pointer  ${
            selectedPage === "Skills"
              ? "bg-[var(--color-secondary-dark)] "
              : "hover:bg-purple-900/20 transition-colors duration-200"
          }`}
          onClick={() => setSelectedPage("Skills")}
        >
          Skills
        </div>
        <div
          className={`px-4 py-2 rounded-md cursor-pointer ${
            selectedPage === "Timebank"
              ? "bg-[var(--color-secondary-dark)] "
              : "hover:bg-purple-900/20 transition-colors duration-200"
          }`}
          onClick={() => setSelectedPage("Timebank")}
        >
          Timebank
        </div>
        <div
          className={`px-4 py-2 rounded-md cursor-pointer ${
            selectedPage === "Settings"
              ? "bg-[var(--color-secondary-dark)] "
              : "hover:bg-purple-900/20 transition-colors duration-200"
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
              className={`px-4 py-2 rounded-xl text-sm ${
                selectedCategory === cat
                  ? "bg-[var(--color-primary)] "
                  : "bg-[var(--color-secondary-dark)] hover:bg-purple-900/20 transition-all duration-200 hover:-translate-y-0.5"
              }`}
              onClick={() =>
                setSelectedCategory(selectedCategory === cat ? "All" : cat)
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {selectedPage === "Skills" && <Skills />}
      </div>
    </section>
  );
};

export default Explore;
