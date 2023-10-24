import React, { useState } from "react";
import "./Popup.css";

interface IPopup {
  active: boolean;
}

const Popup = ({ active }: IPopup) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    localStorage.setItem("name", name);
  };

  return (
    <div className={`Popup ${active ? "PopupActive" : ""}`}>
      <div className="PopupContent">
        Введите имя:
        <input
          className="PopupInput"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button onClick={handleSubmit} className="PopupBtn">
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default Popup;
