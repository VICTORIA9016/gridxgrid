import React, { useState, useCallback } from "react";
import "./App.css";



const BBG= {
  black: "black",
  blue: "blue",
  green: "green",
}

const rows = 10;
const columns = 10;

const isClickOn = () => window.clickOnState;

window.addEventListener("clickOn", () => {
  window.clickOnState = true;
  console.log("clickOn");
});
window.addEventListener("clickoff", () => {
  window.clickOffState = false;
  console.log("clickOff");
});

function App() {

  const [activeColor, setActiveColor] = useState(BBG.black);

  const [showGrid, setShowGrid] = useState(true);
  const toggleGrid = () => setShowGrid (!showGrid);

  const [cellsKey, setCellsKey] = useState(true);

  return (
    <div className="App">
      <h1>EXERCISE WHIT GRID</h1>
      <main>
      <section
        key={cellsKey}
        className={["cells", showGrid ? "show-grid" : "hide-grid"].join(" ")}
      >
        {Array.from({ length: rows }).map((_, i) => (
          <div className="row" key={i}>
            {Array.from({ length: columns }).map((_, j) => (
              <Cell key={j} id={`${j},${i}`} activeColor={activeColor} />
            ))}
          </div>
        ))}
      </section>

      <section className="palette">
        <fieldset>
          <legend>
            CHOOSE THE COLOR: <CellButton color={activeColor} />
          </legend>
          {Object.entries(BBG).map(([key, value]) => (
            <CellButton
              key={key}
              title={`Select color: ${key}`}
              color={value}
              onClick={() => setActiveColor(value)}
            />
          ))}
        </fieldset>
      </section>

    </main>
    </div>
  );
}

const Cell = ({
  id,
  activeColor,
  onChange = (id, c) => console.log(id, c)
}) => {
  const [color, setColor] = useState(BBG.blue);

  const handleClickOn = useCallback(() => {
    setColor(activeColor);
    onChange(id, activeColor);
  }, [activeColor, id, onChange]);

  const handleclickOff = useCallback(() => {
    if (isClickOn()) {
      setColor(activeColor);
      onChange(id, activeColor);
    }
  }, [activeColor, id, onChange]);

  const handleDoubleClick = useCallback(() => setColor(BBG.white), []);

  return (
    <CellButton
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleClickOn}
      onMouseOver={handleclickOff}
      color={color}
      title={`A ${color} cell`}
    />
  );
};

const CellButton = ({ color, ...otherProps }) => {
  return (
    <span style={{ backgroundColor: color }} className="cell" {...otherProps} />
  );
};

export default App;

