import React, {useEffect, useState, useReducer, useCallback} from "react";
import {BrowserRouter as Router, Switch, Route, useParams, useLocation, useHistory} from "react-router-dom";
import "./App.css";
import {Banner} from "./main_page_components/Banner.js";
import {SearchInfo} from "./main_page_components/Search_Info.js";
import {getListTopRepos} from "./helpers/function/get_List_Top_Repos.js";
import {getURL} from "./helpers/function/get_URL.js";
import {ReposContainer} from "./main_page_components/Repos_Container.js"

// function getParams (params) {
//     //let params = useParams();
//     console.log('params- ', params)
//     return {
//         target: params.target || '',
//         page: params.page || 1
//     }
// };

function getParams (pageQuery) {
    return {
        target: pageQuery.get('target') || '',
        page: pageQuery.get('page') || 1
    }
};

function getOueryRarams(location) {
    const params = new URLSearchParams(location.search);
    let pr = getParams(params);
    console.log(pr, "paramssssss")
    return pr
}


// ==getParams, which is using useParams()
// function getOueryRarams(location) {
//     const params = new URLSearchParams(location);
//     return queryParamsIntoObj(params);
// }

// function queryParamsIntoObj (pageQuery) {
//     let obj = {};
//     if (pageQuery) {
//         obj.page = pageQuery.has('page')? pageQuery.get('page'): 1;
//         obj.target = pageQuery.has('target')? pageQuery.get('target'): '';
//     } else { 
//         obj = {target: '', page: 1};
//     }
//     return obj;
// }

function usePageQuery (location) {

    const [pageQuery, setPageQuery] = useState(() => {
        // It is equivalent to getOueryRarams.
        const params = new URLSearchParams(location);
        return queryParamsIntoObj(params);
    });

    const onSetPageQuery = useCallback (
        (searchSettings) => {
            setPageQuery(newParams);
            setOueryRarams(searchSettings)

        },
        [location]
    );

    return [pageQuery, onSetPageQuery]

    // useEffect(() => {
    //     const searchParams = () => {
    //         let params = new URLSearchParams(location.search);
    //         setPageQuery(params);
    //     }
    //     searchParams();
    
    // },[location]);

    // return pageQuery;
};


// function int (initialSetupItems) {
//     //localStorage.removeItem('search_settings');
//     let storedData = localStorage.getItem('search_settings');
//     let searchSettings = storedData ? JSON.parse(storedData): initialSetupItems;
//     console.log(searchSettings)
//     return searchSettings;
// }

// function int (initialSetupItems, pageQuery) {
//     //localStorage.removeItem('search_settings');
//     let searchSettings = {};
//     //let pageQuery = getPageQuery();
//     if (pageQuery.has('target')) {
//         searchSettings.target = pageQuery.get('target');
//         searchSettings.page = pageQuery.get('page');
//     } else {
//         searchSettings = initialSetupItems;
//     } 
//     console.log(searchSettings);
//     return searchSettings;
// }


function setupItemReducer (state, [type, settings]) {
    let {target, page} = settings;
    switch (type) {
      case 'url':
        if (target != state.target || page != state.page) {
            return {...state, view: value};
        } else {
            return {...state} 
        }
      case 'pageState':
        if (target != state.target || page != state.page) {
            //setOueryRarams(settings)
            return {...state, target: target, page: page}

        } else {
            return {...state}
        }
      
      default:
        return state;
    }
  
  }



function App() {

    //let pageQuery = getPageQuery();

    let history = useHistory();

    // const [searchSettings, setSearchSettings] = useState(() => {
    //     const initialState = int({target: '', page: 1}, pageQuery);
    //     return initialState;
    // });

    // const [searchSettings, setSearchSettings] = useState(() => {
    //     const params = new URLSearchParams(location.search);
    //     return queryParamsIntoObj(params);
    // });

   
    
    let location = useLocation();
    
    //const [searchSettings, dispatch] = useReducer(setupItemReducer, getOueryRarams(location));
    
    const [searchSettings, setSearchSettings] = useState(()=> {
        const initialState = getOueryRarams(location);
        return initialState;
    })

    useEffect(() => {
        const updateStateFromURL = () => {
            let {target, page} = getOueryRarams(location);
            if (target !== searchSettings.target || page !== searchSettings.page) {
                console.log('change state from url')
                setSearchSettings({target, page})
            }
            //setSearchSettings(getOueryRarams(location));
        }
        updateStateFromURL();
        
    },[location]);

    // useEffect(() => { 
    //     const updateURL = () => {
    //         let {target, page} = searchSettings;
    //         let query;
    //         if (target.length) {
    //             query = '/?target=' + target + '&page=' + page;
    //             console.log('queryTP', query);
    //         } else {
    //             query = '/?page=' + page;
    //             console.log('queryP', query);
    //         };

    //         history.push(query);
    //     };
    //     updateURL();
    // }, [searchSettings])

    // let location = useLocation();
    // const [searchSettings, searchSettings] = usePageQuery(location.search);

    // useEffect(() => {
    //     const updateURL = () => {
    //         let {target, page} = searchSettings;
    //         let query;
    //         if (target.length) {
    //             query = '/?target=' + target + '&page=' + page;
    //         } else {
    //             query = '/?page=' + page;
    //         }
    //         history.push(query);
    //     }
    //     updateURL();
    // }, [searchSettings]);

    // let location = useLocation();

    // useEffect(() => {
    //     const searchParams = () => {
    //         let params = new URLSearchParams(location.search);
    //         let obj = queryParamsIntoObj(params);
    //         setSearchSettings(obj);
    //     }
    //     searchParams();
    
    // },[location]);

    // useEffect(() => {
    //     const updatePage = () => {
    //         let obj = queryParamsIntoObj(pageQuery);
    //         setSearchSettings(obj);
    //     }
    //     updatePage();
    // }, [pageQuery]);

    
    // useEffect(() => {
    //     localStorage.setItem('search_settings', JSON.stringify(searchSettings));
    // }, [searchSettings]);

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
           
                <Banner 
                    setSearchSettings={setSearchSettings}
                    searchSettings={searchSettings.target}
                    history={history}
                />
                <main>
                    <SearchInfo/>
                    <ReposContainer listRepos={listRepos}/>
                </main>
         
        </div>
    );
}

export default App;

//0bd7dc8aec13dfc83bb7874381ac16f9a19b503f