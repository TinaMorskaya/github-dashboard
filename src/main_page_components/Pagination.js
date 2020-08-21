import React, {useState} from "react";
import {Switch, Route, Link, useLocation, useHistory} from "react-router-dom";
export {Pagination};

const Pagination = (props) => {
    console.log(props.lastPageNum)
    return (
        <div className='pagination-container'>
            <Link to=''> </Link>
            <Link to=''> </Link>
            <Link to=''> </Link>
            <Link to=''> </Link>
            <Link to=''> </Link>

        </div>
    )
};