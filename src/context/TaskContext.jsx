import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase';
import axios from 'axios';

const TaskContext = createContext();

// Custom hook to use the TaskContext
export const useTasks = () => {
    return useContext(TaskContext);
  };


export const TaskProvider =({children})=>{
    const [tasks, setTasks] = useState([]);
    const tasksCollectionRef = collection(db, 'tasks'); // Firestore collection reference

      // 1. Add a new task
  const addTask = async (title) => {
    if (title.trim() === '') {
      alert('Task cannot be empty');
      return;
    }
    await addDoc(tasksCollectionRef, { title, completed: false });
  };

   //2. Deleting a task
  const deleteTask = async (id) => {
    const taskDoc = doc(db, 'tasks', id);
    await deleteDoc(taskDoc);
  };


  return (
    <TaskContext.Provider value={{ addTask ,deleteTask}}>
      {children}
    </TaskContext.Provider>
  );

}