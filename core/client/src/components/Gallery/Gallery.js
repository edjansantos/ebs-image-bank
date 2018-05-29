import React, { Component } from 'react';
import axios from 'axios';

import Settings from '../../utils/settings';

import GalleryList from '../GalleryList/GalleryList';
import Search from '../Search/Search';

class Gallery extends Component {

    constructor(props) {
        super(props);
        this.handleQueryChange = this.handleQueryChange.bind(this);
    }
    state = {
        images: [],
        query: ''
    }

    _settings = new Settings();

    getImageList() {
        axios.get(this._settings.serviceUrl + 'images/list').then(response => {
            this.setState({ images: response.data.images });
        });
    }

    handleQueryChange(event) {
        this.setState({ query: event.target.value });
    }

    componentDidMount() {
        this.getImageList();
    }

    render() {
        return (<div>
            <Search query={this.state.query} handleChange={this.handleQueryChange}/>
            <br />
            {/* {this.state.query}
            <br /> */}
            <GalleryList list={this.state.images} imageRoot={this._settings.serviceUrl} />
        </div>)
    }
}

export default Gallery;