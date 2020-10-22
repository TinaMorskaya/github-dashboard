import React, {useState, useEffect} from "react";
import "../App.css";
import {RepositoryEntry} from "./RepositoryEntry.js";
import {getListRepos} from "../services/get_list_repos.js";
import {getURL} from "../helpers/function/get_url.js";
export {ReposContainer};

const ReposContainer = ({searchSettings, dispatch}) => {
    
    let {target: curTarget, page: curPage} = searchSettings;

    const [listRepos, setListRepos] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
        const fetchData = async () => {  
            setIsLoading(true);
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
            setIsLoading(false);
        }
        fetchData();
    }, [curTarget, curPage]);

    return (
        <div className='second-main-flex'>
            {isLoading 
              ? <h1 className='loading'>Loading...</h1>
              : listRepos.map ((repo) => 
                    <RepositoryEntry 
                        key = {repo.get('name')}
                        repoName = {repo.get('name')} 
                        repoLink = {repo.get('url')} 
                        date = {repo.get('commit')} 
                        countStars = {repo.get('stars')}
                    />
                )
            }
        </div>
    )
}