import React from "react";
import "../App.css";
import {Link} from "react-router-dom";
export {CreatePointer};

const CreatePointer = ({link, name}) => {
    
    let itemClass = typeof name === 'number' 
        ? 'current-page'
        : 'disabled';

    return (
        <React.Fragment>
            {link
            ? <Link to={link}>{name}</Link>
            : <span className={itemClass}>{name}</span>
            }
        </React.Fragment>
    )
};