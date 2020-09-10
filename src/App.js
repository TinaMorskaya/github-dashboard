import React, {useEffect, useState, useReducer} from "react";
import {BrowserRouter as Router, useLocation, useHistory} from "react-router-dom";
import "./App.css";
import {Banner} from "./main_page_components/Banner.js";
import {SearchInfo} from "./main_page_components/Search_Info.js";
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

function setupItemReducer (state, action) {
    let value = action.value
    switch (action.name) {
        case 'target':
            return {...state, target: value};
        case 'page':
            return {...state, page: Number.parseInt(value)};
        case 'adadditionalInfo': 
            return {...state, adInfo: {
                lastPageNum: value.lastPageNum, 
                totalCount: value.totalCount}
            };
        case 'newURL':
            return {target: value.target, page: Number.parseInt(value.page), adInfo: {
                lastPageNum: 0,
                totalCount: 0
                }
            };
        default:
            return state;
    }
}



function App() {

    let history = useHistory();
    let location = useLocation();
    
    // const [searchSettings, setSearchSettings] = useState(()=> {
    //     const initialState = getQueryParams(location);
    //     return initialState;
    // })

    const [searchSettings, dispatch] = useReducer (setupItemReducer, 
        {...getQueryParams(location), 
            adInfo: {
                lastPageNum: 0,
                totalCount: 0
            }
        });

    useEffect(() => {
        const updateStateFromURL = () => {
            let {target, page} = getQueryParams(location);
            if (target !== searchSettings.target || page !== searchSettings.page) {
                console.log('change state from url')
                //setSearchSettings({target, page})
                dispatch({name: 'newURL', value: {'target': target, 'page': page}})
            }
            //setSearchSettings(getQueryParams(location));
        }
        updateStateFromURL();
        
    },[location]);


    return(
        <div className="App">
            <Banner 
                search={searchSettings.target}
                history={history}
            />
            <main>
                <SearchInfo 
                    totalCount={searchSettings.adInfo.totalCount}
                />
                <ReposContainer 
                    searchSettings={searchSettings}
                    dispatch={dispatch}
                />
                <Pagination 
                    searchSettings={searchSettings}
                    dispatch={dispatch}
                    history={history}
                
                />
            </main>
         
        </div>
    );
}

export default App;

//0bd7dc8aec13dfc83bb7874381ac16f9a19b503f