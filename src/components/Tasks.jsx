import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth'; 
import SearchTasks from './Search';
import { useTasks } from '../context/TaskContext';// Import Firestore instance
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore';

const TaskManager = () => {
  const {addTask , deleteTask} = useTasks();  
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedTask, setSelectedTask] = useState(null); // To manage the task being edited
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const tasksCollectionRef = collection(db, 'tasks'); // Firestore tasks collection reference
  

  // 1. Fetch Tasks from Firestore in Real-Time
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      window.location.href = '/login';
    }
    const unsubscribe = onSnapshot(tasksCollectionRef, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  // 2. Fetch Initial Tasks from Mock API and Sync with Firestore
  useEffect(() => {
    const fetchTasksFromAPI = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'); // Fetch only 5 tasks
      const tasksToAdd = response.data.map(task => ({
        title: task.title,
        completed: task.completed,
      }));

      // Add tasks to Firestore only if no tasks exist
      const existingTasks = await getDocs(tasksCollectionRef);
      if (existingTasks.docs.length === 0) {
        tasksToAdd.forEach(async (task) => {
          await addDoc(tasksCollectionRef, task);
        });
      }
    };

    fetchTasksFromAPI();
  }, []);

  // 3. Add a New Task to Firestore
  const handleaddtask = () => {
    addTask(newTask);
    setNewTask(''); // Clear input
  };

  // 4. Update Task Status in Firestore
  // const updateTask = async (id, updatedData) => {
  //     const taskDoc = doc(db, 'tasks', id);
  //     await updateDoc(taskDoc, updatedData);
  // };

  // 5. Delete Task from Firestore
  const handledeleteTask =(id)=>{
     deleteTask(id);
  }
  

  // Open modal for editing
  const handleEditTask = (task) => {
    setSelectedTask(task);
    setEditedTitle(task.title); // Pre-fill the modal input with the current title
    setIsModalOpen(true); // Open the modal
  };


  // Update the task in Firestore
  const handleUpdateTask = async () => {
    if (selectedTask) {
      const taskDocRef = doc(db, 'tasks', selectedTask.id); // Reference to the specific task
      await updateDoc(taskDocRef, { title: editedTitle }); // Update the title
      setIsModalOpen(false); // Close the modal
      setSelectedTask(null); // Reset selected task
    }
  };

  return (

    
    <div className="min-h-screen bg-gray-100 flex flex-row items-start py-8 px-4">
       {/* Left Column - Search Tasks */}
       <SearchTasks tasks={tasks}/>
       

      <div className="w-full max-w-3xl bg-gray-900 shadow-lg rounded-lg p-6 ml-8">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Task Manager</h1>
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Enter a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleaddtask}
            className="ml-4 bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Add Task
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task.id}

              className="p-4 bg-gray-50 rounded-lg shadow-md border border-gray-200 hover:bg-blue-50 transition duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center justify-center p-4">
                  <button
                    onClick={() => handledeleteTask(task.id)}
                    className="text-white font-bold py-1 px-2 rounded-md transition duration-300 bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => handleEditTask(task)}
                    className="text-white font-bold py-1 px-2 rounded-md transition duration-300 bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm"

                  >
                    Edit
                  </button>
                </div>


                {/* <button
                                    onClick={() => updateTask(task.id, { completed: !task.completed })}
                                    className={`text-white font-bold px-2 py-1 rounded ${
                                        task.completed ? 'bg-green-500' : 'bg-yellow-500'
                                    }`}
                                >
                                    {task.completed ? 'Completed' : 'Pending'}
                                </button> */}
              </div>
              <p className="text-gray-800 font-medium text-lg text-center">{task.title}</p>
            </div>
          ))}
        </div>
      </div>


      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Task</h2>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)} // Close the modal without saving
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateTask} // Save changes
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManager;

