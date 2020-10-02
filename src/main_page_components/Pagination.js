import React, {useState, useEffect} from "react";
import "../App.css";
import {CreatePointer} from './CreatePointer.js'
import {getPaginationArray} from '../helpers/function/get_pagination_array.js'
import {getLink} from '../helpers/function/get_link.js';

export {Pagination};

const Pagination = ({searchSettings}) => {

    let {target: curTarget, page: curPage, adInfo: {lastPageNum: lastPage}} = searchSettings;

    let [pagination, setPagination] = useState([]);


    useEffect(()=> {
        const getNewPagination = () => { 
            if (!lastPage) {
                return 
            }
            let paginationArray = getPaginationArray(curPage, lastPage);
            let paginationObj = paginationArray.map((el)=>{
                let link = getLink(el, curPage, lastPage, curTarget);
                return {
                    name: el, 
                    link: link
                }
            });
            setPagination(paginationObj);
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