import { render } from '@testing-library/react';
import React, { Component } from 'react';
import Article from '../components/article';

class ArticleNew extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className="container">
                <div><h3>New Article Page</h3></div>
                
                <Article/>
                <p>The heck is this</p>
                {/* <div><h3>Bottom of page</h3></div> */}
            </div>
        );
    }
}

export default ArticleNew;