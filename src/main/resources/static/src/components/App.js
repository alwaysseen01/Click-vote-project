import React from 'react';
import Header from "./Header"
import Main from "./Main"
import "../css/index.css"
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { AuthProvider } from '../security/AuthProvider'

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
            </BrowserRouter>
            </AuthProvider>
        )    
    }
}


export default App
