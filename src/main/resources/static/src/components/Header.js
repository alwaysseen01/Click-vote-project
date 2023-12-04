import React from 'react'
import "../css/header.css"
import logoImg from "../images/logoPNG.png"
import profileImg from "../images/profileIconPNG.png"

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
                            <a> Main page </a> 
                        </li>
                        <li className={`headerNavMenuElement ${this.state.selectedPage === 'Results' ? 'selected' : ''}`} onClick={() => this.handlePageChange('Results')}> 
                            <a> Results </a> 
                        </li>
                        <li className={`headerNavMenuElement ${this.state.selectedPage === 'About us' ? 'selected' : ''}`} onClick={() => this.handlePageChange('About us')}> 
                            <a> About us </a> 
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

export default Header