import React, { useReducer } from "react";

const initialState = {
  count: 0
};
const reducer = (state, action) => {
  if (action === "INCREMENT") {
    return { count: state.count + 1 };
  } else {
    return { count: state.count - 1 };
  }
};
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <h1>Counter</h1>
      <h2>カウント: {state.count}</h2>
      <button onClick={() => dispatch("INCREMENT")}>+</button>
      <button onClick={() => dispatch("DECREMENT")}>-</button>
    </div>
  );
}

export default Counter;
