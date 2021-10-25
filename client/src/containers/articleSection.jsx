import { connect } from "react-redux";
import React from 'react';


const ArticleSection = ({ sections }) => (
    <div>
        {sections.map(section => (
        <div className="section" key={section.uuid}>
                <hr />
                <div> <p> {section.title} </p></div>
                <div dangerouslySetInnerHTML={{ __html: section.summary }}></div>
                <div dangerouslySetInnerHTML={{ __html: section.content }} ></div>
                {/* <br/> */}
                
        </div>))}
    </div>
);

const mapStateToProps = state => ({
    auth: state.auth,
    content: state.content
});
export default connect(mapStateToProps)(ArticleSection);