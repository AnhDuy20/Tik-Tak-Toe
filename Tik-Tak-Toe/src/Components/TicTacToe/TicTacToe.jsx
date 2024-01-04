import React, { useState, useRef } from "react";
import "./TicTacToe.css";
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.png";

const TicTacToe = () => {
  const initialData = ["", "", "", "", "", "", "", "", ""];
  const [data, setData] = useState(initialData);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [titleContent, setTitleContent] = useState("Tic Tac Toe React");

  const box1 = useRef(null);
  const box2 = useRef(null);
  const box3 = useRef(null);
  const box4 = useRef(null);
  const box5 = useRef(null);
  const box6 = useRef(null);
  const box7 = useRef(null);
  const box8 = useRef(null);
  const box9 = useRef(null);

  const boxRefs = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  const toggle = (num) => {
    if (lock || data[num] !== "") {
      return;
    }

    const symbol = count % 2 === 0 ? "x" : "o";
    setData((prevData) => {
      const newData = [...prevData];
      newData[num] = symbol;
      return newData;
    });

    const boxRef = boxRefs[num];
    boxRef.current.innerHTML = `<img src='${
      symbol === "x" ? cross_icon : circle_icon
    }'>`;

    setCount((prevCount) => prevCount + 1);
    checkWin();
  };

  const checkWin = () => {
    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[2]);
    } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      won(data[5]);
    } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
      won(data[6]);
    } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      won(data[7]);
    } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[2]);
    } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      won(data[6]);
    }
  };

  const won = (winningSymbol) => {
    setLock(true);
    const winningIcon = winningSymbol === "x" ? cross_icon : circle_icon;
    setTitleContent(
      <span>
        Congratulations: <img src={winningIcon} alt={winningSymbol} />
      </span>
    );
  };

  const reset = () => {
    setLock(false);
    setData(initialData);
    setTitleContent("Tic Tac Toe React");
    boxRefs.forEach((boxRef) => {
      boxRef.current.innerText = "";
    });
  };

  return (
    <div className="container">
      <h1 className="title">{titleContent}</h1>
      <div className="board">
        {Array.from({ length: 3 }, (_, row) => (
          <div key={row} className={`row${row + 1}`}>
            {Array.from({ length: 3 }, (_, col) => (
              <div
                key={col}
                className="boxes"
                ref={boxRefs[row * 3 + col]}
                onClick={() => toggle(row * 3 + col)}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
