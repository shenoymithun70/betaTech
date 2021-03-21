import React from 'react';
import {Switch , Route, useRouteMatch, Redirect} from 'react-router-dom';
import SignInAndSignUpPage from './pages/signin-signup.component.jsx'
import './App.css';
import DashobardPage from './pages/dashboard/dashboard.component.jsx'
import Navbar from './components/sidebar/sidebar.component.jsx'
import CategoriesPage from './pages/categories/categories.component.jsx'
import ProductsPage from './pages/products/products.component.jsx'
import styled from 'styled-components'
import {connect} from 'react-redux';
import AdminBoard from './pages/dashboard/dashboard-admin.component.jsx'
import AgentBoard from './pages/dashboard/dashboard-agent.component.jsx'
import Profile from './pages/profile/profile.component.jsx'
import AdminSignIn from './pages/profile/adminsignin.component.jsx'

import {logout} from './redux/user/user.actions'

const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;


class App extends React.Component {

  state = {
    showAgentBoard: false,
    showAdminBoard: false,
    currentUser: undefined,
  }
  
  componentDidMount() {
    const user = this.props.user;

    if(user) {
      this.setState({
        currentUser: user,
        showAgentBoard: user.userType == "Agent" ? true : false,
        showAdminBoard: user.userType == "Admin" ? true : false,
      })
    }

    
  }

  logout() {
    this.props.dispatch(logout());
  }



  render() {
    const{user} = this.props;
    return(
        <div>
        <Switch>
        <Route exact path="/admin/login" component={AdminSignIn} />
        <Route exact path="/" render={() => user ? (<Redirect to="/profile" />): (<SignInAndSignUpPage/>)}  />
        
        </Switch>
        <Navbar />
        <Switch>
        <Route path="/profile" render={() => <Profile />} />
        <Route path="/admin/dashboard" component={AdminBoard} />
        <Route path="/agent/dashboard" component={AgentBoard} />
        <Route path="/categories" component={CategoriesPage} />
        <Route path="/products" component={ProductsPage}/>
       </Switch>
        </div>
    )
    }
    }

    const mapStateToProps = (state) => ({
      user: state.user.user
  })
    
    export default connect(mapStateToProps)(App);