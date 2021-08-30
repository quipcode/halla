import { render } from '@testing-library/react';
import React, { Component } from 'react';
import MyContentDataTable from '../components/MyContentDataTable';

class MyContentTable extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className="container">
                <div><h3>CustomTables Page</h3></div>
                <MyContentDataTable />
                <div><h3>Bottom of page</h3></div>
            </div>
        );
    }
}

export default MyContentTable;