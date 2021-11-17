import React, { Component } from 'react';



const StatusBar = (props) => {
    // const handleBlur = (e) => {
    //     if (e.target.value !== props.contentTitle) {
    //         props.onNameChange(e.target.value);
    //     }
    // }

    return (
        <header className="status-bar">
            {/* <input
                className="font form-control"
                defaultValue={props.contentTitle}
                onBlur={handleBlur}
            /> */}
            <span className="font">
                {props.displayIsSaving ? "Saving" : "Saved"}
            </span>
        </header>
    );
};
export default StatusBar