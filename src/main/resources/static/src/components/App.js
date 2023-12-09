import React from 'react';
import Header from "./Header"
import Main from "./Main"
import "../css/index.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
            <BrowserRouter>
                <Header onPageChange={this.handlePageChange} />
                <Routes>
                    <Route path='/main' element={<Main selectedPage={this.state.selectedPage}/>} />
                    <Route path='/results' element={<Main selectedPage={this.state.selectedPage}/>} />
                    <Route path='/aboutUs' element={<Main selectedPage={this.state.selectedPage}/>} />
                </Routes>
            </BrowserRouter>
        )    
    }
}


export default App
