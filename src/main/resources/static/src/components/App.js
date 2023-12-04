import React from 'react';
import Header from "./Header"
import Main from "./Main"
import "../css/index.css"

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            helpText: "Help text",
            userData: ""
        }

        // this.inputClick = this.inputClick.bind(this)
    }

    render() {
        return (
            <div className='mainDiv'>
                <Header />
                <Main />
            </div>
        )    
    }

    // inputClick() {
    //     this.setState({helpText: "Changed"})
    //     console.log("Clicked")
    // }

    // mouseOver() {
    //     console.log("Mouse over")
    // }
}

export default App
