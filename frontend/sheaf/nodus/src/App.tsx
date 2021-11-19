import React from "react";
import ReactDOM from "react-dom";

import Header from "./Header";

import { Admin, Resource } from 'react-admin';
import { ArticleList } from './articles'
import authProvider from "./authProvider";
import dataProvider from "./dataProvider";
import history from './utils/history'

import "./index.css";

const App = () => (
    <div>
        
        <Admin
            authProvider={authProvider}
            dataProvider={dataProvider}
            history={history}
            title="Nodus"
            // customRoutes={customRoutes}
        // layout={MyLayout}
        >
            <Resource name="articles" list={ArticleList}/>
            </Admin>
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