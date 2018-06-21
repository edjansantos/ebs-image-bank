import React, { Component } from 'react';
import './Sidebar.scss';

class Sidebar extends Component {

    render() {
        return (
            <div className="container main-sidebar">
                <div className="row">
                    <div className="col-12 py-3">
                        <button className="btn btn-dark w-100">Upload</button>
                    </div>
                    <div className="col-12">
                        Sidebar
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Sidebar;