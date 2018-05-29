import React from 'react';

import CardImage from '../CardImage/CardImage';

const GalleryList = (props) => (
    <div>
        {props.list.map(image => { return (
        <div key={image.filename}>
            <CardImage filename={image.filename} imageRoot={props.imageRoot} />
        </div>
    )})}
    </div>
)

export default GalleryList;