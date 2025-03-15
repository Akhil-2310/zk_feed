import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Group } from "@semaphore-protocol/group";

function CreateGroup() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nationality, setNationality] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate a unique group ID
    const groupId = Date.now();

    // Create a new Semaphore group
    const newGroup = new Group();

    // Store group details in local storage
    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    storedGroups.push({
      groupId,
      name,
      description,
      nationality,
      groupData: newGroup, // Store the group instance
    });
    localStorage.setItem("groups", JSON.stringify(storedGroups));

    toast.success("Group created successfully!");
    navigate("/all-groups");
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-8">
          Create a New Group
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Group Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nationality
            </label>
            <input
              type="text"
              id="name"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateGroup;
