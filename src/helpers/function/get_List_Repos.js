import {getFormattedDate} from "./get_Formatted_Date.js"

export {getListRepos}


async function getListRepos (url) {
    
    const token = process.env.TOKEN_GITHUB;

    const headers = new Headers();
    const gitHubToken = "token " + token;
    headers.append("Authorization", gitHubToken);
    let [repos, lastPageNum, totalCount] = await getTopRepos(url, headers);
    let reposWithDateCommit = await Promise.all(repos.map(async (repo) => {
        let commitDate = await getDateCommit(repo.get('commit'), headers);
        let commit = getFormattedDate(commitDate);
        repo.set('commit', commit)
        return repo
    }));
    return [reposWithDateCommit, lastPageNum, totalCount]
}



function getTopRepos (url, headers) {
    try { let tenRepositories = [];
    let lastPageNum;
    return fetch(url, { headers })
        .then(response => {
            try { 
                lastPageNum  = getNumberPagesFromLink(response.headers.get("Link"));
                console.log(lastPageNum);
            }
            catch (error) {
                console.log('Sorry, nothing was found');
            }
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
            return [tenRepositories, lastPageNum, data.total_count]
        })
        .catch(error => console.error(error))
    }
    catch (error) {
        console.log(error);
      }
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
    return lastPageNum
}