import React from "react";
import {Redirect} from 'react-router-dom'
import {connect} from "react-redux";


class Profile extends React.Component {


    render() {
        const {user , history} = this.props;
        console.log(user);
        if(!user) {
            return <Redirect  to="/agent/login" />;
        } 
        return (
            <div>
            <div>{user.username}</div>
            <div>{user.userType}</div>
            </div>   
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user,
})
  export default connect(mapStateToProps)(Profile);