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
                <div><h3>Edit Article Page</h3></div>
                <Article />
            </div>
        );
    }
}

export default ArticleNew;