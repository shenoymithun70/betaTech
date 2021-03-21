import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './sideBar.js';
import './sidebar.css';
import { IconContext } from 'react-icons';
import {connect} from 'react-redux'
// import authService from '../../services/auth.service.js';

class Navbar extends React.Component {
    state = {
        sideBar: false,
        showModeratorBoard: false,
        showAdminBoard: false,
        currentUser: undefined,
    }

    componentDidMount() {
        const user = this.props.user;
        console.log(user);
        if(user) {
          this.setState({
            currentUser: user,
            showAgentBoard: user.userType == "Agent" ? true : false,
            showAdminBoard: user.userType == "Admin" ? true : false,
          } , () => console.log(this.state))
        }
    
        
      }

//   const [sidebar, setSidebar] = useState(false);

  showSidebar = (sidebar) => {
      this.setState({sideBar: !sidebar})
  };
  render() {
    return (
        <>
          <IconContext.Provider value={{ color: '#fff' }}>
            <div className='navbar'>
              <Link to='#' className='menu-bars'>
                <FaIcons.FaBars onClick={() => this.showSidebar(this.state.sideBar)} />
              </Link>
            </div>
            <nav className={this.state.sideBar ? 'nav-menu active' : 'nav-menu'}>
              <ul className='nav-menu-items' onClick={() => this.showSidebar(this.state.sideBar)}>
                <li className='navbar-toggle'>
                  <Link to='#' className='menu-bars'>
                    <AiIcons.AiOutlineClose />
                  </Link>
                </li>
                {this.state.showAgentBoard && (
                <li className="nav-text">
                  <Link to={"/agent/dashboard"} >
                    Agent Board
                  </Link>
                </li>
              )}

              {this.state.showAdminBoard ? (
                <li className="nav-text">
                  <Link to={"/admin/dashboard"} >
                    Admin Board
                  </Link>
                </li>
              ) : null }

                {SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </IconContext.Provider>
        </>
      );
  }
  
}

const mapStateToProps = (state) => ({
    user: state.user.user
})

export default connect(mapStateToProps)(Navbar);