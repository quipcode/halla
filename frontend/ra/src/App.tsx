// import React from 'react';
// import ReactDom from "react-dom";
// import Header from './Header';
// import './App.css';

// function App() {
//   return (
//     <div>
//       <h1>React Admin</h1>
//       <Header
//         border="none"
//         color="orange"
//         height="200px"
//         onClick={() => console.log("You clicked on the header in admin app!")}
//         radius="50%"
//         width="200px"
//         children="I'm a child of header!"
//       />
//     </div>
//   );
// }

// export default App;
// ReactDom.render(<App />, document.querySelector("#app"));

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Header';
import './App.css';
import reportWebVitals from './reportWebVitals';

function App() {
  return (
    <div>
      <h1>React Admin</h1>
      <Header
        border="none"
        color="orange"
        height="200px"
        onClick={() => console.log("You clicked on the header in admin app!")}
        radius="50%"
        width="200px"
        children="I'm a child of header!"
      />
    </div>
  );
}
export {App};

ReactDOM.render(<React.StrictMode> <App /></React.StrictMode>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
