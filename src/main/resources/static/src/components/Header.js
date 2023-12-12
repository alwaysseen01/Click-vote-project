import React from 'react'
import "../css/header.css"
import logoImg from "../images/logoPNG.png"
import profileImg from "../images/profileIconPNG.png"
import { AuthContext } from '../security/AuthContext'
import { Link, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function Header(props) {
    const location = useLocation();
    const { isAuthenticated } = React.useContext(AuthContext);

    const handlePageChange = (page) => {
        props.onPageChange(page);
    };

    const isSelected = (page) => {
        return location.pathname === page;
    };

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <header>
            <img className='logoImg' src={logoImg}></img>
            <nav>
                <ul className='headerNavMenuBox'>
                    <Link to="/main"> <li className={`headerNavMenuElement ${isSelected('/main') ? 'selected' : ''}`} onClick={() => handlePageChange('Main page')}> Main page </li> </Link> 
                    <Link to="/results"> <li className={`headerNavMenuElement ${isSelected('/results') ? 'selected' : ''}`} onClick={() => handlePageChange('Results')}> Results </li> </Link> 
                    <Link to="/about_us"> <li className={`headerNavMenuElement ${isSelected('/about_us') ? 'selected' : ''}`} onClick={() => handlePageChange('About us')}> About us </li> </Link>
                    {isAuthenticated &&
                        <Link to="/profile">
                            <div className={`profileBox ${isSelected('/profile') ? 'selected' : ''}`} onClick={() => handlePageChange('Profile')}>
                                <img className='profileImg' src={profileImg}></img>
                            </div>
                        </Link>
                    }
                </ul>
            </nav>
        </header>
    );
}


export default Header;