import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {getPaginationArray} from '../helpers/function/get_Pagination_Array.js'
import {getLink} from '../helpers/function/get_Link.js';

export {Pagination};

const Pagination = (props) => {

    let {target: curTarget, page: curPage, adInfo: {lastPageNum: lastPage}} = props.searchSettings;

    let [pagination, setPagination] = useState([]);


    useEffect(()=> {
        const getNewPagination = () => { 
            if (lastPage) {
            let paginationArray = getPaginationArray(curPage, lastPage);
            let paginationObj = paginationArray.map((el)=>{
                let link = getLink(el, curPage, lastPage, curTarget);
                return {name: el, link: link}
            });
            setPagination(paginationObj);
            }
        }
        getNewPagination();
    }, [curTarget, curPage, lastPage]);
    
    if (!lastPage) return null;
    return (
        <div className='pagination-container'>
            {pagination.map((page, i) => 
                <CreatePointer
                    key={i} 
                    name={page.name}
                    link={page.link}
                /> 
            )}  
        </div>
    )
};




const CreatePointer = (props) => {
    
    let itemClass = typeof props.name === 'number' ? 'current-page': 'disabled';

    return (
        <React.Fragment>
            {props.link? <Link to={props.link}>{props.name}</Link>:
                <span className={itemClass}>{props.name}</span>
            }
        </React.Fragment>
    )
};