import React from "react";
import ReactDOM from "react-dom";

import "./cairn-mf-decl.d";

// import { PokemonListFunction, PokemonListComponent } from "shared-types";
// import getList from "tsremote-mf/pokemonList";
// import PokemonListView from "tsremote-mf/PokemonListView";
import Header from "nodus/Header"
import Button from "halla/Button"
import "./index.css";

// const PokemonComp = PokemonListView as PokemonListComponent;

// const getPokemonList = getList as PokemonListFunction;

const App = () => (
    <div>
        <h1>Cairn - Host</h1>
        <Header
            border="none"
            color="orange"
            height="200px"
            onClick={() => console.log("You clicked on the header in nodus app!")}
            radius="50%"
            width="200px"
            children="I'm a child of header!"
        />
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