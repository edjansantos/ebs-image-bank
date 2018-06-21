import React, { Component } from 'react';

import Gallery from '../../components/Gallery/Gallery';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Layout.scss';

class Layout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: undefined
        }
    }
    render() {
        return (
            <div className="contaner-fluid">
                <div className="row no-gutters">
                    <div className="col-12">
                        <Header query={this.state.query} />
                    </div>
                </div>
                <div className="row no-gutters">
                    <div className="col-md-2">
                        <Sidebar query={this.state.query} />
                    </div>
                    <div className="col">
                        <div className="overflow-box">
                            <Gallery query={this.state.query} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Layout;