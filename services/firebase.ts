// firestore.ts
import { db } from './firebase-config';
import { collection, getDocs, doc, getDoc, setDoc, updateDoc, query, orderBy, increment } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { Task, UserProfile, TaskState } from '../types';

export const getTasks = async (): Promise<Task[]> => {
  const tasksCol = collection(db, 'tasks');
  const q = query(tasksCol, orderBy('deadline', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
};

export const getUsers = async (): Promise<UserProfile[]> => {
  const usersCol = collection(db, 'users');
  const q = query(usersCol, orderBy('score', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data() as UserProfile);
};

export const createTask = async (taskData: Omit<Task, 'id' | 'state'>): Promise<Task> => {
  const newTaskRef = doc(collection(db, 'tasks'));
  const newTask: Task = { ...taskData, state: TaskState.FREE, id: newTaskRef.id };
  await setDoc(newTaskRef, newTask);
  return newTask;
};

export const selectTask = async (taskId: string, user: UserProfile): Promise<Task> => {
  const taskRef = doc(db, 'tasks', taskId);
  await updateDoc(taskRef, {
    state: TaskState.BUILDING,
    assignedTo: user.uid,
    assignedToName: user.displayName,
  });
  const updatedTaskSnap = await getDoc(taskRef);
  return { id: taskId, ...updatedTaskSnap.data() } as Task;
};

export const completeTask = async (taskId: string, user: UserProfile): Promise<{ updatedTask: Task, updatedUser: UserProfile }> => {
  const taskRef = doc(db, 'tasks', taskId);
  const userRef = doc(db, 'users', user.uid);

  await updateDoc(taskRef, { state: TaskState.COMPLETED });
  await updateDoc(userRef, { score: increment(10) }); // incrementa os pontos (ou task.points se você buscar o task)

  const taskSnap = await getDocs(taskRef);
  const userSnap = await getDocs(userRef);

  return {
    updatedTask: { id: taskId, ...taskSnap.data() } as Task,
    updatedUser: userSnap.data() as UserProfile
  };
};
