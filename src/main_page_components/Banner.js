import React, {useState} from "react";
import "../App.css";
import gb from "../icons/gb.svg";
import {setQueryParams} from "../helpers/function/set_Query_Params.js";
export {Banner};

const Banner = (props) => (
    <header role="banner">
        <AppIcon />
        <SearchForm 
            search={props.search} 
            history={props.history}
        />
    </header>
);

const AppIcon = () => (
    <div className="gd-icon">
        <img src={gb} aria-label="GitHub Dashboard"/>
    </div>
);

const SearchForm = (props) => {

    const [searchTarget, setSerchTarget] = useState(props.search);

    const handleChange = (event) => {
        let value = event.target.value;
        setSerchTarget(value);
    };

    const handleSubmit = (event) => {
        let newState = {target: searchTarget, page:1};
        event.preventDefault();
        setQueryParams(newState, props.history);
    }; 

    return (
        <form className="search-form" role="search" onSubmit={handleSubmit}>
            <label htmlFor="search">Which repository are you interested in?</label>
            <input id="search" type="text" placeholder="Search..." onChange={handleChange} value={searchTarget}/>
        </form>
    )
}
