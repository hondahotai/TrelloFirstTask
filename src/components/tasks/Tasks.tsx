import "./Tasks.css";
import TaskModal from "../TaskModal/TaskModal";
import React, { useState, useEffect } from "react";

type TitleColumns = {
  title: string;
};

const Tasks = ({ title }: TitleColumns) => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");

  const [openedModalIndex, setOpenedModalIndex] = useState<number | null>(null);

  const [commentsCounts, setCommentsCounts] = useState<number[]>([]);
  const setCommentsCount = (index: number, count: number) => {
    const updatedCounts = [...commentsCounts];
    updatedCounts[index] = count;
    setCommentsCounts(updatedCounts);
  };

  const handleOpenModal = (index: number) => {
    setOpenedModalIndex(index);
  };

  const handleCloseModal = () => {
    setOpenedModalIndex(null);
  };

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (openedModalIndex !== null) {
      document.addEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [openedModalIndex]);

  function addLocalStorage(key: string, value: string) {
    const current: string[] = JSON.parse(localStorage.getItem(key) || "[]");

    current.push(value);
    localStorage.setItem(key, JSON.stringify(current));
  }

  useEffect(() => {
    const loadTasksFromLocalStorage = () => {
      const storedTasks = localStorage.getItem(title);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    };

    loadTasksFromLocalStorage();
  }, []);

  const addTask = () => {
    if (newTask) {
      setTasks([...tasks, newTask]);
      setNewTask("");
      addLocalStorage(title, newTask);
    }
  };

  const deleteTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    localStorage.setItem(title, JSON.stringify(updatedTasks));

    localStorage.removeItem(`description-${title}-${index}`);
    localStorage.removeItem(`comments-${title}-${index}`);
    handleCloseModal();
  };

  const updateTaskTitle = (index: number, newTitle: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = newTitle;
    setTasks(updatedTasks);
    localStorage.setItem(title, JSON.stringify(updatedTasks));
  };

  return (
    <div className="taskWrap">
      <ul className="tasksList">
        {tasks.map((task, index) => (
          <li
            onClick={() => {
              handleOpenModal(index);
            }}
            className="task"
            key={index}
          >
            {openedModalIndex === index && (
              <TaskModal
                task={task}
                index={index}
                title={title}
                deleteTask={deleteTask}
                setCommentsCount={setCommentsCount}
                updateTaskTitle={updateTaskTitle}
              />
            )}
            {task}
            <div className="comments">
              <img src="../chatICon.png" alt="chatICon" />
              <p className="commentsCounts">{commentsCounts[index] || 0}</p>
            </div>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default Tasks;
