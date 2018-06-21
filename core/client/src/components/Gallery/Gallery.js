import React, { Component } from 'react';
import axios from 'axios';

import Settings from '../../utils/settings';

import GalleryList from '../GalleryList/GalleryList';

class Gallery extends Component {

    constructor(props) {
        super(props);
        this.handleQueryChange = this.handleQueryChange.bind(this);

    }
    state = {
        images: [],
        query: '',
        pagination: undefined
    }

    _settings = new Settings();

    getImageList(page) {
        let _params = {
            page: page
        }
        axios.get(this._settings.serviceUrl + 'images/search', {params:_params}).then(response => {
            this.setState({ images: response.data.images, pagination: response.data.pagination });
        });
    }

    handleQueryChange(event) {
        this.setState({ query: event.target.value });
    }

    componentDidMount() {
        this.getImageList(1);
    }

    renderPagination() {
        let _paginationItems = [];
        if (this.state.pagination) {
            for (let x = 1; x <= this.state.pagination.pages; x++) {
                _paginationItems.push(<li className="list-inline-item"><a href="" onClick={(e) => {this.getImageList(x);e.preventDefault();}}>{x}</a></li>);
            }
        }
        return _paginationItems;
    }

    render() {

        return (
            <div className="row no-gutters">
                <div className="col-12">
                    <GalleryList list={this.state.images} imageRoot={this._settings.serviceUrl} />
                </div>
                <div className="col-12">
                    <ul className="list-inline d-flex justify-content-center">
                        {
                            this.renderPagination()
                        }
                    </ul>
                </div>
            </div>
            )
    }
}

export default Gallery;