import {getFormattedDate} from "./get_Formatted_Date.js"

export {getListRepos}

// async function getRepository () {
//     fetch('https://api.github.com/orgs/axios')
//         .then(response => response.json() 
//         .then(data => {
//             console.log(data) 
//         })
//         .catch(error => console.error(error)));
// }


async function getListRepos (url) {
    const headers = new Headers();
    headers.append("Authorization", "token 0bd7dc8aec13dfc83bb7874381ac16f9a19b503f");
    let [repos, lastPageNum] = await getTopRepos(url, headers);
    let reposWithDateCommit = await Promise.all(repos.map(async (repo) => {
        let commitDate = await getDateCommit(repo.get('commit'), headers);
        let commit = getFormattedDate(commitDate);
        repo.set('commit', commit)
        return repo
    }));
    return [reposWithDateCommit, lastPageNum]
}



function getTopRepos (url, headers) {
    let tenRepositories = [];
    let lastPageNum;
    return fetch(url, { headers })
        .then(response => {
            lastPageNum  = getNumberPagesFromLink(response.headers.get("Link"));
            console.log(lastPageNum);
            return response.json()
        }) 
        .then(data => {
            data.items.forEach(repo => {
                if (repo) {
                    let oneRepo = new Map();
                    oneRepo.set('name', repo.full_name);
                    oneRepo.set('url', repo.html_url);
                    oneRepo.set('stars', repo.stargazers_count);
                    oneRepo.set('commit', repo.commits_url)
                    tenRepositories.push(oneRepo);
                }
            })
            //console.log(tenRepositories)
            return [tenRepositories, lastPageNum]
        })
        .catch(error => console.error(error))
}

function getDateCommit (url, headers) {
    let correctUrl = url.replace(/{.*}/,'');
    return fetch(correctUrl, { headers })
        .then(response => response.json())
        .then(data => {
            return data[0].commit.author.date;
        })
        .catch(error => console.error(error))
}

function getNumberPagesFromLink (link) {
    let lastPageMatch = link.match(/page=(\d+)>; rel="last"/);
    let lastPageNum = lastPageMatch ? 
        Number.parseInt(lastPageMatch[1]): 
        Number.parseInt(link.match(/page=(\d+)>; rel="prev"/)[1]) + 1;
    console.log(typeof lastPageNum + ' lastPageNum')
    return lastPageNum
}