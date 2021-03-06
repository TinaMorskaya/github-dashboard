import React, {useEffect, useState, useReducer} from "react";
import {BrowserRouter as Router, useLocation, useHistory} from "react-router-dom";
import "./App.css";
import {Banner} from "./main_page_components/Banner.js";
import {SearchInfo} from "./main_page_components/SearchInfo.js";
import {ReposContainer} from "./main_page_components/ReposContainer.js";
import {getQueryParams} from "./helpers/function/get_query_params.js";
import {Pagination} from "./main_page_components/Pagination.js";

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
            return {
                target: value.target, 
                page: Number.parseInt(value.page), 
                adInfo: {
                    lastPageNum: 0,
                    totalCount: null
                }
            };
        default:
            return state;
    }
}


function App() {

    let history = useHistory();
    let location = useLocation();

    const [searchSettings, dispatch] = useReducer ( 
        setupItemReducer, 
        {...getQueryParams(location), 
            adInfo: {
                lastPageNum: 0,
                totalCount: null
            }
        }
    );

    useEffect(() => {
        const updateStateFromURL = () => {
            let {target, page} = getQueryParams(location);
            if (target !== searchSettings.target || page !== searchSettings.page) {
                console.log('change state from url')
                dispatch({
                    name: 'newURL', 
                    value: {
                        'target': target, 
                        'page': page
                    }
                });
            }
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
                />
            </main>
         
        </div>
    );
}

export default App;

