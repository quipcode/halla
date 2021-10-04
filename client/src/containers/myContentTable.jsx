import { render } from '@testing-library/react';
import React, { Component } from 'react';
import MyContentDataTable from '../components/MyContentDataTable';
import {connect} from 'react-redux'
import {getAllMyContent} from '../store/redux/allMyContent/actions'

class MyContentTable extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className="container">
                <div><h3>{this.props.title}</h3></div>
                <MyContentDataTable />
                <button onClick={getAllMyContent()}> get content </button>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    allMyContent: state.allMyContent
});
export default connect(mapStateToProps, { getAllMyContent })(MyContentTable);
// export default MyContentTable;