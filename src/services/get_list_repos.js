import {getFormattedDate} from "../helpers/function/get_formatted_date.js"

export {getListRepos}


async function getListRepos (url) {
    const headers = new Headers();
    const gitHubToken = "token " + process.env.TOKEN_GITHUB;
    headers.append("Authorization", gitHubToken);
    let [repos, lastPageNum, totalCount] = await getTopRepos(url, headers);
    let reposWithDateCommit = await Promise.all(repos.map(async (repo) => {
        let commitDate = await getCommitDate(repo.get('commit'), headers)
        repo.set('commit', commitDate);
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
                    oneRepo.set('commit', repo.commits_url);
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

function getCommitDate (url, headers) {

    let correctUrl = url.replace(/{.*}/,'');

    return fetch(correctUrl, { headers })
        .then(response => response.json())
        .then(data => {
            if (!data[0]) {
                return 'no commits yet';
            } else {
                return getFormattedDate(data[0].commit.author.date);
            }
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