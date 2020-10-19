import React, {useState, useEffect} from "react";
import "../App.css";
import {RepositoryEntry} from "./RepositoryEntry.js";
import {getListRepos} from "../services/get_list_repos.js";
import {getURL} from "../helpers/function/get_url.js";
export {ReposContainer};

const ReposContainer = ({searchSettings, dispatch}) => {
    
    let {target: curTarget, page: curPage} = searchSettings;


    const [listRepos, setListRepos] = useState(null);

    useEffect(()=> {
        const fetchData = async () => {  
            window.scrollTo(0, 0);
            let [newListRepos, lastPageNum, totalCount] = await getListRepos(getURL(searchSettings));
            setListRepos(newListRepos);
            console.log('totalCount ' + totalCount);
            dispatch({
                name: 'adadditionalInfo', 
                value: {
                    lastPageNum: lastPageNum,
                    totalCount: totalCount
                }
            });
            //window.scrollTo(0, 0);
        }
        fetchData();
    }, [curTarget, curPage]);

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