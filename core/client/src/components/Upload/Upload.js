import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import './Upload.scss';

class Upload extends Component {
    constructor() {
        super()
        this.state = { files: [] }
    }

    onDrop(files) {
        console.log(files);
        // this.setState({
        //     files
        // });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 py-3">
                        <h1>Upload</h1>
                        <Dropzone onDrop={this.onDrop.bind(this)} className="upload-area">
                            Upload Area
                        </Dropzone>
                    </div>
                </div>
            </div>
        )
    }
}

export default Upload;