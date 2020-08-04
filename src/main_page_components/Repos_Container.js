import React from "react";
import "../App.css";
import {RepositoryEntry} from "./Repository_Entry.js";
export {ReposContainer};

const ReposContainer = (props) => {
    if (!props.listRepos) return null;
    return (
    <div className='second-main-flex'>
        {props.listRepos.map((repo) => 
            <RepositoryEntry 
                key = {repo.get('name')}
                repoName = {repo.get('name')} 
                repoLink = {repo.get('url')} 
                date = {repo.get('commit')} 
                countStars = {repo.get('stars')}
            />
        )} 
    </div>
    )
}