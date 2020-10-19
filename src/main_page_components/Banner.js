import React, {useState} from "react";
import "../App.css";
import gb from "../icons/binoculars.svg";
import {setQueryParams} from "../helpers/function/set_query_params.js";
export {Banner};

const Banner = ({search, history}) => (
    <header role="banner" className="flex-sample">
        <AppIcon />
        <SearchForm 
            search={search} 
            history={history}
        />
    </header>
);

const AppIcon = () => (
    <div className="gd-icon">
        <img src={gb} aria-label="GitHub Dashboard"/>
    </div>
);

const SearchForm = ({search, history}) => {

    const [searchTarget, setSerchTarget] = useState(search);

    const handleChange = (event) => {
        let value = event.target.value;
        setSerchTarget(value);
    };

    const handleSubmit = (event) => {
        let newState = {target: searchTarget, page:1};
        event.preventDefault();
        setQueryParams(newState, history);
    }; 

    return (
        <form className="search-form flex-sample" role="search" onSubmit={handleSubmit}>
            <label htmlFor="search">
                Which repository are you interested in?
            </label>
            <input id="search" type="text" placeholder="Search..." onChange={handleChange} value={searchTarget}/>
        </form>
    )
}
