import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Gallery from '../../components/Gallery/Gallery';
import Upload from '../../components/Upload/Upload';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

import './Layout.scss';

class Layout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: undefined
        }

        this.handleQueryChange = this.handleQueryChange.bind(this);
    }


    handleQueryChange(event) {
        this.setState({ query: event.target.value });
    }
    render() {
        return (
            <div className="contaner-fluid">
                <div className="row no-gutters">
                    <div className="col-12">
                        <Header query={this.state.query} handleQueryChange={this.handleQueryChange}/>
                    </div>
                </div>
                <div className="row no-gutters">
                    <div className="col-md-2">
                        <Sidebar query={this.state.query} />
                    </div>
                    <div className="col">
                        <div className="overflow-box">
                            <Route path='/' component={() => <Gallery query={this.state.query} />} exact />
                            <Route path='/upload' component={() => <Upload />} exact />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Layout;