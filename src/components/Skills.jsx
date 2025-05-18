import React from "react";
import { useNavigate } from "react-router-dom";

const Skills = ({ skills }) => {
    const navigate = useNavigate();

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
                                <div className="font-semibold">
                                    {skill.title}
                                </div>
                                <div className="text-sm text-gray-400">
                                    {skill.description}
                                </div>
                            </div>
                        </div>
                        <button
                            className="bg-[var(--color-primary)] px-4 py-2 rounded-md text-sm font-bold text-white"
                            onClick={() => navigate("/skill/" + index)}
                        >
                            Trade
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Skills;
