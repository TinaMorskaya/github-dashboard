import React from "react";
import "../App.css";
import bookIcon from "../icons/developer_board24px.svg";
import starIcon from "../icons/star_outline24px.svg";
export {RepositoryEntry}



const RepositoryEntry = (props) => {
    return (
        <div className="repo-card">
            <div className="repsitory-icon" aria-hidden="true">
                <img src={bookIcon}/>
            </div>
            <div className="repo-info">
                <p>
                    {props.repoName}
                </p>
                <a className="github-link" href={props.repoLink}>{props.repoName} on GitHub</a>
                <div>
                    <div className="stars">
                        <p><img src={starIcon} aria-label="star"/>{props.countStars}</p>
                    </div>
                    <p>
                        Latest commit: {props.date}
                    </p>
                </div>
            </div>
        </div>
    )
}
