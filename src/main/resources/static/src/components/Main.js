import React from 'react'
import "../css/main.css"
import Election from "./Election"
import Petition from "./Petition"
import Survey from "./Survey"
import ElectionResult from "./ElectionResult"
import PetitionResult from "./PetitionResult"
import SurveyResult from "./SurveyResult"

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: 'Elections', 
        };
    }

    handleCategoryChange = (category) => {
        this.setState({ selectedCategory: category });
    };

    render() {
        console.log("STATE (PAGE): " + this.props.selectedPage);
        let content;
        if (this.props.selectedPage === 'Main page' && this.state.selectedCategory === 'Elections') {
            content = <Election />;
        } else if (this.props.selectedPage === 'Main page' && this.state.selectedCategory === 'Petitions') {
            content = <Petition />;
        } else if (this.props.selectedPage === 'Main page' && this.state.selectedCategory === 'Surveys') {
            content = <Survey />;
        } else if(this.props.selectedPage === 'Results' && this.state.selectedCategory === 'Elections') {
            content = <ElectionResult />;
        } else if (this.props.selectedPage === 'Results' && this.state.selectedCategory === 'Petitions') {
            content = <PetitionResult />;
        } else if (this.props.selectedPage === 'Results' && this.state.selectedCategory === 'Surveys') {
            content = <SurveyResult />;
        }
        
        else {
            content = <div></div>;
        }

        return (
            <main>
                <aside>
                    <ul className='mainNavMenuBox'>
                        <li className={`mainNavMenuElement ${this.state.selectedCategory === 'Elections' ? 'selected' : ''}`} onClick={() => this.handleCategoryChange('Elections')}> 
                            <a> Elections </a> 
                        </li>
                        <li className={`mainNavMenuElement ${this.state.selectedCategory === 'Petitions' ? 'selected' : ''}`} onClick={() => this.handleCategoryChange('Petitions')}> 
                            <a> Petitions </a> 
                        </li>
                        <li className={`mainNavMenuElement ${this.state.selectedCategory === 'Surveys' ? 'selected' : ''}`} onClick={() => this.handleCategoryChange('Surveys')}> 
                            <a> Surveys </a> 
                        </li>
                    </ul>
                </aside>
                <section>
                    {content}
                </section>
            </main>
        )    
    }
}


export default Main