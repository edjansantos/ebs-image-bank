import React from 'react';

import './CardImage.css';

const CardImage = (props) => (
    <div className="card-image">
        <img src={props.imageRoot+'images/thumb/'+props.filename+'?width=160&height=160'} alt=''/>
    </div>
)

export default CardImage;