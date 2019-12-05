import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = event => {
    const {
      target: { value }
    } = event;
    let willUpdate = true;
    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};

const App = () => {
  const [item, setItem] = useState(1);
  const incrementItem = () => setItem(item + 1);
  const decrementItem = () => setItem(item - 1);

  const maxLen = value => value.length <= 10;
  const name = useInput("Mr.", maxLen);
  const email = useInput("@");
  return (
    <div className="App">
      <h1>Hello {item}</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={incrementItem}>Increment</button>
      <button onClick={decrementItem}>Decrement</button> <br />
      <input
        placeholder="Name"
        {...name}
        // =value={name.value}
      />
      <input placeholder="Email" {...email} />
    </div>
  );
};

// ---- class Component without Hook -------
// class AppUgly extends React.Component {
//   state = {
//     item: 1
//   };
//   render() {
//     const { item } = this.state;
//     return (
//       <div className="App">
//         <h1>Hello {item}</h1>
//         <h2>Start editing to see some magic happen!</h2>
//         <button onClick={this.incrementItem}>Increment</button>
//         <button onClick={this.decrementItem}>Decrement</button>
//       </div>
//     );
//   }
//   incrementItem = () => {
//     this.setState(state => {
//       return {
//         item: state.item + 1
//       };
//     });
//   };
//   decrementItem = () => {
//     this.setState(state => {
//       return {
//         item: state.item - 1
//       };
//     });
//   };
// }

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
