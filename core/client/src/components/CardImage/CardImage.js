import React from 'react';

import './CardImage.scss';

const CardImage = (props) => (
    <div className="card-image">
        <img src={props.imageRoot+'images/thumb/'+props.filename+'?width=200&height=200'} alt=''/>
    </div>
)

export default CardImage;