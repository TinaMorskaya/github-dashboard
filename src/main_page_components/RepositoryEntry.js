import React from "react";
import "../App.css";
import bookIcon from "../icons/developer_board24px.svg";
import starIcon from "../icons/star_outline24px.svg";
export {RepositoryEntry}



const RepositoryEntry = ({repoName, repoLink, date, countStars}) => {
    return (
        <div className="repo-card">
            <div className="repsitory-icon" aria-hidden="true">
                <img src={bookIcon}/>
            </div>
            <div className="repo-info">
                <p>
                    {repoName}
                </p>
                <a className="github-link" href={repoLink}>{repoName} on GitHub</a>
                <div>
                    <div className="stars">
                        <p><img src={starIcon} aria-label="star"/>{countStars}</p>
                    </div>
                    <p>
                        Latest commit: {date}
                    </p>
                </div>
            </div>
        </div>
    )
}
