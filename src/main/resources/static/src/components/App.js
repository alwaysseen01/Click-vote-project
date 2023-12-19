import React, { useState, useContext, useEffect } from 'react';
import Header from "./Header"
import Main from "./Main"
import "../css/index.css"
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import Profile from './Profile';
import AboutUs from './AboutUs';
import PetitionInfo from './PetitionInfo';
import ElectionOptionInfo from './ElectionOptionInfo';
import { AuthProvider } from '../security/AuthProvider'
import { AuthContext } from '../security/AuthContext';

function ProtectedRoute({ children }) {
  const location = useLocation();
  const { refreshToken, isAuthenticated, setIsAuthenticated, isRefreshing } = useContext(AuthContext);
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function checkToken() {
        const currentToken = localStorage.getItem('accessToken');
        setToken(currentToken);
        if (currentToken) {
            console.log("Found access token! Checking...");
            const response = await fetch(`http://localhost:8081/auth/checkToken?token=${currentToken}&tokenType=ACCESS`, {
                method: 'GET'
            });
            if (response.ok) {
                console.log("Access token has successfully passed through the checking!");
                setIsAuthenticated(true);
            } else {
                console.log("Access token has NOT successfully passed through the checking, calling for refreshing!");
                await refreshToken();
            }
        } else {
            console.log("Didn't find token! Calling for refresh...");
            if (localStorage.getItem('refreshToken')) {
                await refreshToken();
            }
        }
    }
    checkToken();
  }, []); 

  useEffect(() => {
      setToken(localStorage.getItem('accessToken'));
  }, [isAuthenticated]); 

  if (!isAuthenticated && !isRefreshing && location.pathname !== '/login' && location.pathname !== '/register') {
      return <Navigate to="/login" replace />;
    }

  if (isRefreshing) {
    return <div></div>;
  }

  return children;
}

class App extends React.Component {
  constructor(props) {
        super(props)
        this.state = {
            selectedPage: 'Main page',
        };
  }

  handlePageChange = (page) => {
        this.setState({ selectedPage: page });
  };

  handleElectionMoreInfoButton = () => {
        window.location.pathname = '/election_option/info';
  }

  handlePetitionMoreInfoButton = () => {
        window.location.pathname = '/petition/info';
  }

  render() {
      return (
          <AuthProvider>
              <BrowserRouter>
                  <ProtectedRoute>
                      <Header onPageChange={this.handlePageChange} />
                      <Routes>
                          <Route path='/main' element={<Main selectedPage={window.location.pathname} onElectionMoreInfoButtonClick={this.handleElectionMoreInfoButton} onPetitionMoreInfoButtonClick={this.handlePetitionMoreInfoButton}/>} />
                          <Route path='/results' element={<Main selectedPage={window.location.pathname} onElectionMoreInfoButtonClick={this.handleElectionMoreInfoButton} onPetitionMoreInfoButtonClick={this.handlePetitionMoreInfoButton}/>}/>} />
                          <Route path='/register' element={<RegisterForm />} />
                          <Route path='/login' element={<LoginForm />} />
                          <Route path='/profile' element={<Profile />}/>
                          <Route path='/about_us' element={<AboutUs />}/>
                          <Route path='/election_option/info' element={<ElectionOptionInfo />}/>
                          <Route path='/petition/info' element={<PetitionInfo />}/>
                          <Route path="/" element={<Navigate to='/main' />}/>
                          <Route path="*" element={<Navigate to='/main' />}/>
                      </Routes>
                  </ProtectedRoute>
              </BrowserRouter>
          </AuthProvider>
      )    
  }
}

export default App
