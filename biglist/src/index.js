import "./wdyr";

import { times } from "lodash";
import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";

/**
 *
 *
 *
 *
 * Notice that this sandbox will not work with React 17 or above
 * because of how codesandbox.io implements requires of packages.
 *
 *
 *
 *
 */
const BigListPureComponent = React.memo(({ style }) => {
  console.log(
    "BigListPureComponent Re-Render! - We don't want this to happen too often."
  );
  return (
    <div style={style}>
      <h2>BigListPureComponent</h2>
      <div>
        {times(3000).map((n) => (
          <div key={n}>Element #{n}</div>
        ))}
      </div>
    </div>
  );
});

BigListPureComponent.displayName = "BigListPureComponent";

const Main = () => {
  const [count, setCount] = React.useState(0);

  /* use the hook instead of the const to prevent
   ** "BigListPureComponent" from re-rendering wit this component */

  //const bigListStyle = React.useMemo(() => ({ width: "100%" }), []);
  const bigListStyle = { width: "100%" };

  return (
    <div className="Main">
      <h1>Big List (Main Demo)</h1>
      <p>
        Open the console and notice how the heavy list re-renders on every click
        on "Increase!" even though its props are the same.
      </p>
      <div>
        <button onClick={() => setCount((c) => c + 1)}>
          "Increase!" Count: {count}
        </button>
      </div>
      <BigListPureComponent style={bigListStyle} />
    </div>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));
ReactDOM.render(<Main />, document.getElementById("root"));
