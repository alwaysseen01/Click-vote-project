import React from 'react'
import "../css/main.css"

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
                    {this.state.selectedCategory === 'Elections' && <div>Результаты выборов</div>}
                    {this.state.selectedCategory === 'Petitions' && <div>Результаты петиций</div>}
                    {this.state.selectedCategory === 'Surveys' && <div>Результаты опросов</div>}
                </section>
            </main>
        )    
    }
}

export default Main