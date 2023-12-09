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
        this.props.onPageChange(page);
    };

    render() {
        return (
            <header>
                <img className='logoImg' src={logoImg}></img>
                <nav>
                    <ul className='headerNavMenuBox'>
                        <Link to="/main"> <li className={`headerNavMenuElement ${this.state.selectedPage === 'Main page' ? 'selected' : ''}`} onClick={() => this.handlePageChange('Main page')}> Main page </li> </Link> 
                        <Link to="/results"> <li className={`headerNavMenuElement ${this.state.selectedPage === 'Results' ? 'selected' : ''}`} onClick={() => this.handlePageChange('Results')}> Results </li> </Link> 
                        <Link to="/about_us"> <li className={`headerNavMenuElement ${this.state.selectedPage === 'About us' ? 'selected' : ''}`} onClick={() => this.handlePageChange('About us')}> About us </li> </Link> 
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