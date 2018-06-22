import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

class Sidebar extends Component {


    // navigateTo

    render() {
        const { history } = this.props

        return (
            <div className="container main-sidebar">
                <div className="row">
                    <div className="col-12 py-3">
                        <Link to="/upload">
                            <button className="btn btn-dark w-100">
                                Upload
                            </button>
                        </Link>
                    </div>
                    <div className="col-12">
                        Sidebar
                        {this.props.query}
                    </div>
                </div>

            </div>
        )
    }
}

export default Sidebar;