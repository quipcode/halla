import React from 'react';
import { getSelf} from '../store/redux/auth/actions'
import { connect } from "react-redux";
const Profile = (props) => {

    const clicked = () => {
        let username = localStorage.getItem("hallaAuthUser")
        let token = localStorage.getItem("hallaAuthToken")
        let reqBody = {"username" : username}
        props.getSelf(reqBody)
        

        // console.log("hi hummie", username, token);
    }
    return(
        <div>
            <h1> Hello there human </h1>
            <p>Push this button</p>
            <button onClick={clicked}> Click me! </button>
        </div>
    )
}


const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, { getSelf })(Profile);



// export default Profile;