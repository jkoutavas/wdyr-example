import React from "react";
import "./App.css";

import { times } from "lodash";

interface BigListProps {
  style: React.CSSProperties;
}

/**
 *
 *
 *
 *
 * Notice that this sandbox will not work with React 17 or above
 * because of how codesandbox.io implements requires of packages.
 *
 * sandbox: http://bit.ly/wdyr-sb
 *
 *
 */
const BigListPureComponent = React.memo(({ style }: BigListProps) => {
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

const App = () => {
  const [count, setCount] = React.useState(0);

  /* use the hook instead of the const to prevent
   ** "BigListPureComponent" from re-rendering wit this component */

  //const bigListStyle = React.useMemo(() => ({ width: "100%" }), []);
  const bigListStyle: React.CSSProperties = { width: "100%" };

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

export default App;
