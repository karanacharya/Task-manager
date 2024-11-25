import React, { useState } from "react";

const SearchTasks = ({ tasks }) => {
    const [searchQuery, setSearchQuery] = useState(""); // State for search input

    // Filter tasks based on search query
    const filteredTasks = searchQuery
        ? tasks.filter((task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    return (
        <div className="w-1/3 p-6 bg-white shadow-lg">
            <h2 className="text-xl font-bold mb-4">Search Tasks</h2>
            <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="mt-6 space-y-4">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <div
                            key={task.id}
                            className="p-4 bg-gray-50 rounded-lg shadow-md border border-gray-200"
                        >
                            <p className="text-gray-800 font-medium">{task.title}</p>
                        </div>
                    ))
                ) : searchQuery ? (
                    <p className="text-gray-500">No tasks match your search.</p>
                ) : null}
            </div>
        </div>
    );
};

export default SearchTasks;
