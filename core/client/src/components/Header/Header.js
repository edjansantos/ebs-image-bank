import React, { Component } from 'react';
import Search from '../Search/Search';
import { Link } from 'react-router-dom';

import './Header.scss';

class Header extends Component {

    render() {
        return (
            <header className="main-header">
                <div className="row no-gutters">
                    <div className="col-12 col-sm-4 col-md-2">
                        <div className="logo"><Link to='/'>EBS Image Bank</Link></div>
                        <button className="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="d-xs-none d-sm-flex col-sm-8 col-md-10 align-middle">
                        <Search query={this.props.query} handleQueryChange={this.props.handleQueryChange}/>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;