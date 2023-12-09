import React from 'react'
import "../css/header.css"
import logoImg from "../images/logoPNG.png"
import profileImg from "../images/profileIconPNG.png"

import { Link } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPage: 'Main page', 
        };
    }

    handlePageChange = (page) => {
        this.setState({ selectedPage: page });
    };

    render() {
        return (
            <header>
                <img className='logoImg' src={logoImg}></img>
                <nav>
                    <ul className='headerNavMenuBox'>
                        <li className={`headerNavMenuElement ${this.state.selectedPage === 'Main page' ? 'selected' : ''}`} onClick={() => this.handlePageChange('Main page')}> 
                            <Link to="/main"> Main page </Link> 
                        </li>
                        <li className={`headerNavMenuElement ${this.state.selectedPage === 'Results' ? 'selected' : ''}`} onClick={() => this.handlePageChange('Results')}> 
                            <Link to="/results"> Results </Link> 
                        </li>
                        <li className={`headerNavMenuElement ${this.state.selectedPage === 'About us' ? 'selected' : ''}`} onClick={() => this.handlePageChange('About us')}> 
                            <Link to="/about"> About us </Link> 
                        </li>
                        <div className={`profileBox ${this.state.selectedPage === 'Profile' ? 'selected' : ''}`} onClick={() => this.handlePageChange('Profile')}>
                            <img className='profileImg' src={profileImg}></img>
                        </div>
                    </ul>
                </nav>
            </header>
        )    
    }
}

export default Header;