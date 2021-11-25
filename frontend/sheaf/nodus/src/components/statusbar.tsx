import React, { Component } from 'react';



const StatusBar = (props: any) => {
    return (
        <header className="status-bar">
            <span className="font">
                {props.displayIsSaving ? "Saving" : "Saved"}
            </span>
        </header>
    );
};
export default StatusBar