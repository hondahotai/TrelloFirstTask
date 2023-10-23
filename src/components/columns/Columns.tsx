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
  const [currentTitle, setCurrentTitle] = useState(column.title);

  return (
    <div className="column">
      {isEditing ? (
        <div className="wrapper">
          <input
            className="inputHeader"
            type="text"
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
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
      <Tasks title={currentTitle} />
    </div>
  );
};

export default Column;
