import React from "react";
import "../App.css";
import gb from "../icons/gb.svg";
export {Banner}

const Banner = (props) => (
    <header role="banner">
        <AppIcon />
        <SearchForm setSearchSettings={props.setSearchSettings}/>
    </header>
);

const AppIcon = () => (
    <div className="gd-icon">
        <img src={gb} aria-label="GitHub Dashboard"/>
    </div>
);

const SearchForm = (props) => {
    const handler = (event) => {
        let target = event.target.value;
        props.setSearchSettings({target: target, page:1});
        event.preventDefault();
    }
    return (
        <form className="search-form" role="search" onSubmit={handler}>
            <label htmlFor="search">Which repository are you interested in?</label>
            <input id="search" type="text" placeholder="Search..."/>
        </form>
    )
}
