import React from "react";
import "../App.css";
export {SearchInfo}


function SearchInfo({totalCount}) {
    return(
        <div className="first-main-flex flex-sample">
          <h1 className="number-search-results">{totalCount.toLocaleString()} repository results</h1>
          <button className="sorter">
            Sort: <strong>Мost stars</strong>
          </button>
        </div>
    );
}