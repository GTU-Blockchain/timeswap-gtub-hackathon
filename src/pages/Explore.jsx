import { useState } from "react";
import { Link } from "react-router-dom";
import Skills from "../components/Skills";
import { useAccount } from "wagmi";

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
  const account = useAccount();

  return (
    <section className="grid grid-cols-4 dark:bg-[var(--color-background-dark)] bg-white dark:text-white text-black h-screen">
      {/* Sidebar */}
      <div className="col-span-1 h-full flex flex-col px-6 py-8 space-y-6">
        <Link
          to={"/"}
          className="text-2xl font-bold decoration-[var(--color-primary)] underline decoration-4"
        >
          TimeSwap
        </Link>
        <Link to={`/profile/${account.address}`}>
          <div
            className={`px-4 py-2 rounded-md cursor-pointer  ${
              selectedPage === "Profile"
                ? "dark:bg-[var(--color-secondary-dark)] hover:bg-purple-100"
                : "dark:hover:bg-purple-900/20 hover:bg-purple-100 transition-colors duration-200"
            }`}
            onClick={() => setSelectedPage("Profile")}
          >
            Profile
          </div>
        </Link>
        <div
          className={`px-4 py-2 rounded-md cursor-pointer  ${
            selectedPage === "Skills"
              ? "dark:bg-[var(--color-secondary-dark)] bg-purple-100"
              : "dark:hover:bg-purple-900/20 hover:bg-purple-100 transition-colors duration-200"
          }`}
          onClick={() => setSelectedPage("Skills")}
        >
          Skills
        </div>
        <div
          className={`px-4 py-2 rounded-md cursor-pointer ${
            selectedPage === "Timebank"
              ? "dark:bg-[var(--color-secondary-dark)] bg-purple-100"
              : "dark:hover:bg-purple-900/20 hover:bg-purple-100 transition-colors duration-200"
          }`}
          onClick={() => setSelectedPage("Timebank")}
        >
          Timebank
        </div>
        <div
          className={`px-4 py-2 rounded-md cursor-pointer ${
            selectedPage === "Settings"
              ? "dark:bg-[var(--color-secondary-dark)] bg-purple-100"
              : "dark:hover:bg-purple-900/20 hover:bg-purple-100 transition-colors duration-200"
          }`}
          onClick={() => setSelectedPage("Settings")}
        >
          Settings
        </div>
      </div>

      {/* Main Content */}
      <div className="col-span-3 h-full px-12 py-8 overflow-auto">
        <h1 className="text-3xl font-semibold mb-1">Find a skill</h1>
        <p className="text-sm dark:text-gray-300 text-gray-700 mb-6">
          Browse available skills and hours
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8 text-black dark:text-white">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-xl text-sm ${
                selectedCategory === cat
                  ? "bg-[var(--color-primary)] text-white"
                  : "dark:bg-[var(--color-secondary-dark)] bg-[var(--color-secondary)] hover:bg-purple-900/20 transition-all duration-200 hover:-translate-y-0.5"
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
