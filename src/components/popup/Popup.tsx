import React, { useState } from "react";
import "./Popup.css";

interface IPopup {
  active: boolean;
  onClose: () => void;
}

const Popup = ({ active, onClose }: IPopup) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    localStorage.setItem("name", name);
    onClose();
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
