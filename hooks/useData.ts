import { useState, useEffect, useCallback } from "react";
import { Task, TaskState, UserProfile } from "../types";
import * as DataService from "../services/firebase";

/**
 * Custom hook to manage tasks and users data
 * @param currentUser The currently logged in user
 */
export const useData = (currentUser: UserProfile | null) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /** Fetch tasks and users from DataService (mock or Firebase) */
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching tasks and users...");
      const [fetchedTasks, fetchedUsers] = await Promise.all([
        DataService.getTasks(),
        DataService.getUsers(),
      ]);

      console.log("Tasks fetched:", fetchedTasks);
      console.log("Users fetched:", fetchedUsers);

      setTasks(fetchedTasks);
      setUsers(fetchedUsers);
    } catch (e) {
      console.error("Error fetching data:", e);
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Automatically fetch data when the currentUser is set
  useEffect(() => {
    if (currentUser) {
      fetchData();
    } else {
      setTasks([]);
      setUsers([]);
      setLoading(false);
    }
  }, [currentUser, fetchData]);

  /** Add a new task */
  const addTask = async (
    taskData: Omit<Task, "id" | "state" | "points"> & { points: number }
  ): Promise<void> => {
    if (!currentUser) return;
    setLoading(true);
    setError(null);
    try {
      console.log("Adding task:", taskData);
      await DataService.createTask(taskData, currentUser);
      await fetchData();
    } catch (e) {
      console.error("Failed to add task:", e);
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  /** Assign a task to current user */
  const assignTask = async (taskId: string): Promise<void> => {
    if (!currentUser) return;
    setLoading(true);
    setError(null);
    try {
      console.log(`Assigning task ${taskId} to ${currentUser.displayName}`);
      await DataService.selectTask(taskId, currentUser);
      await fetchData();
    } catch (e) {
      console.error("Failed to assign task:", e);
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  /** Mark a task as completed by current user */
  const finishTask = async (taskId: string): Promise<void> => {
    if (!currentUser) return;
    setLoading(true);
    setError(null);
    try {
      const task = await DataService.getTask(taskId);
      if (task.state == TaskState.COMPLETED) {
        console.warn(`Task ${taskId} is already completed.`);
        return;
      }
      console.log(`Completing task ${taskId} for ${currentUser.displayName}`);
      await DataService.completeTask(taskId, currentUser);
      // Atualiza o estado local imediatamente
     
     /* setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === taskId ? { ...t, state: TaskState.COMPLETED } : t
        )
      );*/
      await fetchData();
    } catch (e) {
      console.error("Failed to complete task:", e);
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    users,
    loading,
    error,
    addTask,
    assignTask,
    finishTask,
    refetchData: fetchData,
  };
};
export default useData;
