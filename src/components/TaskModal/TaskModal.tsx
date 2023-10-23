import React, { useState, useEffect } from "react";
import "./TaskModal.css";

type TaskModalProps = {
  task: string;
  index: number;
  title: string;
  deleteTask: (index: number) => void;
  setCommentsCount: (index: number, count: number) => void;
  updateTaskTitle: (index: number, newTitle: string) => void;
};

const TaskModal = ({
  task,
  index,
  title,
  deleteTask,
  setCommentsCount,
  updateTaskTitle,
}: TaskModalProps) => {
  const taskFromStorage = localStorage.getItem(title);
  const tasksArray = taskFromStorage ? JSON.parse(taskFromStorage) : [];
  const taskIndex = tasksArray[index];

  const [editingTaskTitle, setEditingTaskTitle] = useState<boolean>(false);
  const [tempTaskTitle, setTempTaskTitle] = useState<string>(task);

  const handleTaskTitleChange = (e: any) => {
    setTempTaskTitle(e.target.value);
  };

  const saveTaskTitleToLocalStorage = () => {
    const updatedTasks = [...tasksArray];
    updatedTasks[index] = tempTaskTitle;
    localStorage.setItem(title, JSON.stringify(updatedTasks));
    updateTaskTitle(index, tempTaskTitle);
    setEditingTaskTitle(false);
  };

  const handleEditTaskTitle = () => {
    setTempTaskTitle(task);
    setEditingTaskTitle(true);
  };

  const [description, setDescription] = useState<string>(() => {
    const descFromStorage = localStorage.getItem(
      `description-${title}-${index}`,
    );
    return descFromStorage || "";
  });

  const [editing, setEditing] = useState<boolean>(false);
  const [tempDescription, setTempDescription] = useState<string>("");

  const handleDescriptionChange = (e: any) => {
    setTempDescription(e.target.value);
  };

  const saveDescriptionToLocalStorage = () => {
    setDescription(tempDescription);
    localStorage.setItem(`description-${title}-${index}`, tempDescription);
    setEditing(false);
  };

  const handleEditDescription = () => {
    setTempDescription(description);
    setEditing(true);
  };

  const handleDeleteDescription = () => {
    setDescription("");
    localStorage.removeItem(`description-${title}-${index}`);
  };

  const [comments, setComments] = useState<string[]>(() => {
    const storedComments = localStorage.getItem(`comments-${title}-${index}`);
    return storedComments ? JSON.parse(storedComments) : [];
  });
  const [editingCommentIndex, setEditingCommentIndex] = useState<number | null>(
    null,
  );
  const [tempComment, setTempComment] = useState<string>("");

  const handleCommentChange = (e: any) => {
    setTempComment(e.target.value);
  };

  const addComment = () => {
    setComments([...comments, tempComment]);
    setTempComment("");
  };

  const editComment = (idx: number) => {
    setEditingCommentIndex(idx);
    setTempComment(comments[idx]);
  };

  const saveEditedComment = () => {
    const updatedComments = [...comments];
    updatedComments[editingCommentIndex!] = tempComment;
    setComments(updatedComments);
    setEditingCommentIndex(null);
    setTempComment("");
  };

  const deleteComment = (idx: number) => {
    const updatedComments = [...comments];
    updatedComments.splice(idx, 1);
    setComments(updatedComments);
  };

  useEffect(() => {
    localStorage.setItem(
      `comments-${title}-${index}`,
      JSON.stringify(comments),
    );
  }, [comments, title, index]);

  useEffect(() => {
    setCommentsCount(index, comments.length);
    localStorage.setItem(
      `comments-${title}-${index}`,
      JSON.stringify(comments),
    );
  }, [comments, title, index]);

  return (
    <div className="TaskModal">
      <div className="TaskModalContent">
        <h1>
          {" "}
          {editingTaskTitle ? (
            <>
              <input
                type="text"
                value={tempTaskTitle}
                onChange={handleTaskTitleChange}
              />
              <button onClick={saveTaskTitleToLocalStorage}>Save</button>
              <button onClick={() => setEditingTaskTitle(false)}>Cancel</button>
            </>
          ) : (
            <>
              {taskIndex}
              <button onClick={handleEditTaskTitle}>Edit</button>
            </>
          )}
        </h1>
        <div className="ColumnName">в колонке: {title}</div>
        <div>автор:{localStorage.getItem("name")}</div>
        <div className="description">
          Описание:
          {editing ? (
            <>
              <input
                type="text"
                value={tempDescription}
                onChange={handleDescriptionChange}
              />
              <button onClick={saveDescriptionToLocalStorage}>Save</button>
            </>
          ) : (
            <>
              <span>{description}</span>
              <button onClick={handleEditDescription}>Edit</button>
              <button onClick={handleDeleteDescription}>Delete</button>
            </>
          )}
        </div>
        <div className="CommentTasks">
          Комментарии:
          <ul>
            {comments.map((comment, idx) => (
              <li key={idx}>
                {editingCommentIndex === idx ? (
                  <>
                    <input
                      type="text"
                      value={tempComment}
                      onChange={handleCommentChange}
                    />
                    <button onClick={saveEditedComment}>Save</button>
                  </>
                ) : (
                  <>
                    {`${localStorage.getItem("name")}: ${comment}`}
                    <button onClick={() => editComment(idx)}>Edit</button>
                    <button onClick={() => deleteComment(idx)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={tempComment}
            onChange={handleCommentChange}
            placeholder="Написать комментарий..."
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <button onClick={() => deleteTask(index)}>delete card</button>
      </div>
    </div>
  );
};

export default TaskModal;
