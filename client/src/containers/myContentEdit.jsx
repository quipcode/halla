import { render } from '@testing-library/react';
import React, { Component } from 'react';
import ContentEdit from '../components/contentEdit';

class MyContentEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className="container">
                <div><h3>Content Edit Page</h3></div>
                {/* <contentEdit /> */}
                <ContentEdit/>
                
                <div><h3>Bottom of page</h3></div>
            </div>
        );
    }
}

export default MyContentEdit;