import React from "react";
import ReactDOM from "react-dom";

import Header from "./Header";

import "./index.css";

const App = () => (
    <div>
        <Header
            border="none"
            color="orange"
            height="200px"
            onClick={() => console.log("You clicked on the header in nodus app!")}
            radius="50%"
            width="200px"
            children="I'm a child of header!"
        />
    </div>
);

ReactDOM.render(<App />, document.getElementById("app"));