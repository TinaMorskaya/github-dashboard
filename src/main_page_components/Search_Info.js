import React from "react";
import "../App.css";
export {SearchInfo}


function SearchInfo(props) {
    return(
        <div className="first-main-flex">
          <div className="number-search-results">
            <h1>{props.totalCount} repository results</h1>
          </div>
          <button className="sorter">
            Sort: <strong>Мost stars</strong>
          </button>
        </div>
    );
}