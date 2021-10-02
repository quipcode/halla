import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { connect } from "react-redux";
import Article from '../components/article';
import { saveContentToServer } from '../store/redux/content/actions'

class ArticleEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        console.log("props of articleedit")
        console.log(this.props)
        return (
            <div className="container">
                <div><h3>Edit Article Page</h3></div>
                <Article />
            </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    content: state.content
});
export default connect(mapStateToProps, { saveContentToServer })(ArticleEdit);
// export default ArticleEdit;