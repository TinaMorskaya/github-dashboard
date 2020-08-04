import React, {useEffect, useState, useReducer} from "react";
import "./App.css";
import {Banner} from "./main_page_components/Banner.js";
import {SearchInfo} from "./main_page_components/Search_Info.js";
import {getListTopRepos} from "./helpers/function/get_List_Top_Repos.js";
import {getURL} from "./helpers/function/get_URL.js";
import {ReposContainer} from "./main_page_components/Repos_Container.js"


function int (initialSetupItems) {
    localStorage.removeItem('search_settings');
    let storedData = localStorage.getItem('search_settings');
    let searchSettings = storedData ? JSON.parse(storedData): initialSetupItems;
    console.log(searchSettings)
    return searchSettings;
  }



function App() {

    const [searchSettings, setSearchSettings] = useState(() => {
        const initialState = int({target: 'top', page: 1});
        return initialState;
    });
    
    useEffect(() => {
        localStorage.setItem('search_settings', JSON.stringify(searchSettings));
    }, [searchSettings]);

    const [listRepos, setListRepos] = useState(null);

    useEffect(()=> {
        const fetchData = async () => {  
            let newListRepos = await getListTopRepos(getURL(searchSettings));
            setListRepos(newListRepos);
        }
        fetchData();
    }, [searchSettings]);

    return(
      <div className="App">
        <Banner setSearchSettings={setSearchSettings}/>
        <main>
            <SearchInfo/>
            <ReposContainer listRepos={listRepos}/>
        </main>
      </div>
    );
}

export default App;

//0bd7dc8aec13dfc83bb7874381ac16f9a19b503f