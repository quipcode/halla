import React, { Component } from 'react';
import Article from '../components/article';
import VerseKey from '../components/verseKey';


class Tadabor extends Component {
    constructor(props) {
        super(props)
        this.state = {
   
        }
    }


    render() {
        
        return (
            <div className="container">
            
                       
            <div>

                                    <h3 className="card-title mb-4 mt-1">Tadabor</h3>

                    

                <VerseKey/>
                </div>
                <Article />
                {/* <form>
                    
                    <button name="submitbtn"></button>

                </form> */}
                
                
                
                <div>
                    <p>the bottoms</p>
                </div>
            </div>
        );
    }
}
export default Tadabor;
