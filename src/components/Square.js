import React from "react";

import '../styles/Square.css';

function Square(props) {
    return (

        <span className="square" onClick={props.onClick}>
            {props.sign ? props.sign : String.fromCharCode(160)}
        </span>
        
    );
}


export default Square;