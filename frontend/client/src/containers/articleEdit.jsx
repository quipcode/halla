import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { connect } from "react-redux";
import Article from '../components/article';
import { createArticle } from '../store/redux/content/actions'

class ArticleEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        console.log("uuid is ")
        console.log(this.props.match.params.uuid)
        return (
            <div className="container">
                <div><h3>{this.props.title}</h3></div>
                <Article />
            </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    content: state.content
});
export default connect(mapStateToProps, { createArticle })(ArticleEdit);
// export default ArticleEdit;