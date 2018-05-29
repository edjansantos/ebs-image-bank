import React from 'react';

import './Search.css';


const CardImage = (props) => (
    
    <div className="search-box">
        <form>
            <label htmlFor="search-query">Busca</label>
            <br />
            <input type="search" id="search-query" value={props.query} onChange={props.handleChange.bind(this)}/>
            <button type="submit">Buscar</button>
        </form>
    </div>
)

export default CardImage;