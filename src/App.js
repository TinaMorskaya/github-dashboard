import React, {useEffect, useState, useReducer, useCallback} from "react";
import {BrowserRouter as Router, Switch, Route, Link, useLocation, useHistory} from "react-router-dom";
import "./App.css";
import {Banner} from "./main_page_components/Banner.js";
import {SearchInfo} from "./main_page_components/Search_Info.js";
import {getListTopRepos} from "./helpers/function/get_List_Top_Repos.js";
import {getURL} from "./helpers/function/get_URL.js";
import {ReposContainer} from "./main_page_components/Repos_Container.js";
import {getQueryParams} from "./helpers/function/get_Query_Params.js";
import {Pagination} from "./main_page_components/Pagination.js"




// function int (initialSetupItems) {
//     //localStorage.removeItem('search_settings');
//     let storedData = localStorage.getItem('search_settings');
//     let searchSettings = storedData ? JSON.parse(storedData): initialSetupItems;
//     console.log(searchSettings)
//     return searchSettings;
// }



function App() {

    let history = useHistory();
    let location = useLocation();
    
    const [searchSettings, setSearchSettings] = useState(()=> {
        const initialState = getQueryParams(location);
        return initialState;
    })

    useEffect(() => {
        const updateStateFromURL = () => {
            let {target, page} = getQueryParams(location);
            if (target !== searchSettings.target || page !== searchSettings.page) {
                console.log('change state from url')
                setSearchSettings({target, page})
            }
            //setSearchSettings(getQueryParams(location));
        }
        updateStateFromURL();
        
    },[location]);

    const [listRepos, setListRepos] = useState(null);

    const [lastPageNum, setLastPageNum] = useState(null);
    ///или в один стейт объект записать, посмотри логику рендоринга листа репосов

    useEffect(()=> {
        const fetchData = async () => {  
            let newListRepos = await getListTopRepos(getURL(searchSettings));
            setListRepos(newListRepos);
        }
        fetchData();
    }, [searchSettings]);

    return(
        <div className="App">
            <Banner 
                setSearchSettings={setSearchSettings}
                searchSettings={searchSettings.target}
                history={history}
            />
            <main>
                <SearchInfo/>
                <ReposContainer listRepos={listRepos}/>
                <Pagination/>
            </main>
         
        </div>
    );
}

export default App;

//0bd7dc8aec13dfc83bb7874381ac16f9a19b503f