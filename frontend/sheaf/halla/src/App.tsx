import React from "react";
import ReactDOM from "react-dom";

import Button from "./Button";

import "./index.css";

const App = () => (
    <div>
        <Button
            border="none"
            color="pink"
            height="200px"
            onClick={() => console.log("You clicked on the pink circle!")}
            radius="50%"
            width="200px"
            children="I'm a pink circle!"
        />
    </div>
);

ReactDOM.render(<App />, document.getElementById("app"));