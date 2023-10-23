import "./Columns.css";
import React, { useState } from "react";
import Tasks from "../tasks/Tasks";

interface ColumnProps {
  column: {
    id: number;
    title: string;
  };
}

const Column = ({ column }: ColumnProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const storedTitle = localStorage.getItem(`column-title-${column.id}`);

  const [currentTitle, setCurrentTitle] = useState(storedTitle || column.title);

  const handleTitleChange = (e: any) => {
    const newTitle = e.target.value;
    setCurrentTitle(newTitle);

    localStorage.setItem(`column-title-${column.id}`, newTitle);
  };

  return (
    <div className="column">
      {isEditing ? (
        <div className="wrapper">
          <input
            className="inputHeader"
            type="text"
            value={currentTitle}
            onChange={handleTitleChange}
            onBlur={() => setIsEditing(false)}
          />
        </div>
      ) : (
        <div className="wrapper">
          <h1 className="title" onClick={() => setIsEditing(true)}>
            {currentTitle}
          </h1>
        </div>
      )}
      <Tasks columnId={column.id} title={currentTitle} />
    </div>
  );
};

export default Column;
