import React from "react";
import "../App.css";
export {SearchInfo}


function SearchInfo({totalCount}) {
    return(
        <div className="first-main-flex">
          <div className="number-search-results">
            <h1>{totalCount.toLocaleString()} repository results</h1>
          </div>
          <button className="sorter">
            Sort: <strong>Мost stars</strong>
          </button>
        </div>
    );
}