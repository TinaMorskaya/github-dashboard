import React, {useState, useEffect} from "react";
import "../App.css";
import {RepositoryEntry} from "./Repository_Entry.js";
import {getListRepos} from "../helpers/function/get_List_Repos.js";
import {getURL} from "../helpers/function/get_URL.js";
export {ReposContainer};

const ReposContainer = (props) => {
    
    const [listRepos, setListRepos] = useState(null);

    useEffect(()=> {
        const fetchData = async () => {  
            let [newListRepos, lastPageNum] = await getListRepos(getURL(props.searchSettings));
            setListRepos(newListRepos);
            // if (props.lastPageNum !== lastPageNum) {
            //     props.setLastPageNum(lastPageNum)
            // }
            props.dispatch({name: 'lastPageNum', value: lastPageNum})
        }
        fetchData();
    }, [props.searchSettings.target, props.searchSettings.page]);

    if (!listRepos) return null;
    return (
    <div className='second-main-flex'>
        {listRepos.map((repo) => 
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