import "./Board.css";
import React from "react";
import Column from "../columns/Columns";
import "../columns/Columns.css";

const Board = () => {
  const data = [
    { id: 1, title: "TODO" },
    { id: 2, title: " In Progress" },
    { id: 3, title: "Testing" },
    { id: 4, title: "Done" },
  ];

  return (
    <div className="board">
      {data.map((column, index) => (
        <Column key={index} column={column} />
      ))}
    </div>
  );
};

export default Board;
