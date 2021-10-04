// import React from   'react'
import { connect } from "react-redux";
import React, { useState, useRef, useEffect } from 'react';


const ArticleView = (props) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log("hello reloading again", props.match.params.uuid)
    }, [count]);
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
export default connect(mapStateToProps)(ArticleView);
// export default ArticleView;