import React from 'react';
import Button from './Button';
import './App.css';

function App() {
    return (
    <div>
      <h1>Rima</h1>
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
}

export default App;