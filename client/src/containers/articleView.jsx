// import React from   'react'
import { connect } from "react-redux";
import React, { useState, useRef, useEffect } from 'react';
import { getArticle} from '../store/redux/content/actions';

const ArticleView = (props) => {
    const [count, setCount] = useState(0);
    const [content, setContent] = useState(props.content);
    useEffect(() => {
        props.getArticle(props.match.params.uuid)
        console.log(props)
    }, [content]);
    const submit = (e) =>{
        console.log(e)
        e.preventDefault()
        console.log(props.match.params.uuid)
        setCount(count + 1)
    }
    return(
        <div>
            <p> on the article view page</p>
            {/* <button onClick={setCount(count + 1)}> increase count</button> */}
            <button onClick={submit}>up count</button>
        </div>
    )
}
const mapStateToProps = state => ({
    content: state.content,
});
export default connect(mapStateToProps, {getArticle})(ArticleView);
// export default ArticleView;