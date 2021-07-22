import React, { Component } from 'react';
import TinyEditor from '../components/tinyEditor';

class Tadabor extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            
            <div>

                <h3>Tadabor</h3>
                <TinyEditor />
                <div>
                    <p>the bottoms</p>
                </div>
            </div>
        );
    }
}
export default Tadabor;
