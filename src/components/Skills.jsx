import React from "react";

const Skills = () => {
  //    Hard codded, soon to be changed
  const skills = [
    { name: "Python Programming", hours: 1000, reputation: 5.0 },
    { name: "Product Design", hours: 200, reputation: 4.9 },
    { name: "Mentorship", hours: 500, reputation: 4.8 },
    { name: "Marketing", hours: 300, reputation: 4.7 },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Results</h2>
      <ul className="space-y-4">
        {skills.map((skill, index) => (
          <li
            key={index}
            className="flex justify-between items-center dark:hover:bg-[var(--color-secondary-dark)] hover:bg-[var(--color-secondary)] transition-colors duration-200 p-4 rounded-xl"
          >
            <div className="flex items-center justify-center">
              <img
                src="https://picsum.photos/200"
                className="h-16 w-16 rounded-full mr-6"
              />
              <div>
                <div className="font-semibold">{skill.name}</div>
                <div className="text-sm text-gray-400">
                  {skill.hours} hours, {skill.reputation.toFixed(1)} reputation
                </div>
              </div>
            </div>
            <button className="bg-[var(--color-primary)] px-6 py-3 hover:scale-[1.03] transition-all active:scale-[0.97] duration-100 font-semibold text-white rounded-xl">
              Trade
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
