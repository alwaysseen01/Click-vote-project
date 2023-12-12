import React, { useContext } from 'react';
import Header from "./Header"
import Main from "./Main"
import "../css/index.css"
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { AuthProvider } from '../security/AuthProvider'
import { AuthContext } from '../security/AuthContext';

function ProtectedRoute({ children }) {
    const location = useLocation();
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated && location.pathname !== '/login' && location.pathname !== '/register') {
        return <Navigate to="/login" replace />;
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

    

    render() {
        return (
            <AuthProvider>
                <BrowserRouter>
                    <ProtectedRoute>
                        <Header onPageChange={this.handlePageChange} />
                        <Routes>
                            <Route path='/main' element={<Main selectedPage={this.state.selectedPage}/>} />
                            <Route path='/results' element={<Main selectedPage={this.state.selectedPage}/>} />
                            <Route path='/aboutUs' element={<Main selectedPage={this.state.selectedPage} />} />
                            <Route path='/register' element={<RegisterForm />} />
                            <Route path='/login' element={<LoginForm />} />
                            <Route path="/" element={<Navigate to="/main" />}/>
                            <Route path="*" element={<Navigate to="/main" />}/>
                        </Routes>
                    </ProtectedRoute>
                </BrowserRouter>
            </AuthProvider>
        )    
    }
}


export default App
