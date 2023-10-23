import "./App.css";
import Board from "../board/Board";
import Popup from "../popup/Popup";
import { useState } from "react";

const App = () => {
  const [popupActive, SetPopupActive] = useState<boolean>(
    !localStorage.getItem("name"),
  );
  return (
    <div>
      <Board />
      <Popup active={popupActive} setActive={SetPopupActive} />
    </div>
  );
};
export default App;
