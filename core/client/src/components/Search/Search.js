import React from 'react';

import './Search.scss';


const CardImage = (props) => (

    <form noValidate className="d-flex my-2 w-100">
        <div className="input-group d-flex">
            <input type="text" className="form-control" placeholder="Buscar imagem" aria-label="Buscar imagem"  onChange={props.handleQueryChange} />
            <div className="input-group-append">
                <button className="btn btn-dark" type="button">Buscar</button>
            </div>
        </div>
    </form>
)

export default CardImage;