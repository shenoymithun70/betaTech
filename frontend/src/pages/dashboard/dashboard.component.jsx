import React from 'react';
import {connect} from 'react-redux';

class DashboardPage extends React.Component {

    state = {
        showAgentBoard: false,
        showAdminBoard: false,
        currentUser: undefined,
    }


    componentDidMount() {
        const {currentUser} = this.props;
        console.log(currentUser);
        if(currentUser) {
            this.setState({
                currentUser: currentUser,
                showAgentBoard: currentUser.userType == "Agent" ? true : false,
                showAdminBoard: currentUser.userType == "Admin" ? true : false
            },() =>  console.log(this.state))
        }
    }

    render() {
        const {currentUser , showAdminBoard , showAgentBoard} = this.state;
        
        return(
            <div>
                {showAdminBoard ? <div>Admin board</div> : null}

                {showAgentBoard ? <div>Agent board</div> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(DashboardPage);
