import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { connect } from "react-redux";
import Article from '../components/article';
import {createArticle} from '../store/redux/content/actions'

class ArticleNew extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        console.log("props of articlenew")
        console.log(this.props)
        return (
            <div className="container">
                <div><h3>{this.props.title}</h3></div>
                
                <Article/>
                {/* <div><h3>Bottom of page</h3></div> */}
            </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    content: state.content
});
export default connect(mapStateToProps, { createArticle })(ArticleNew);
// export default ArticleNew;