import {getCurrentDate} from "./get_Current_Date.js"

export {getListTopRepos}

// async function getRepository () {
//     fetch('https://api.github.com/orgs/axios')
//         .then(response => response.json() 
//         .then(data => {
//             console.log(data) 
//         })
//         .catch(error => console.error(error)));
// }

//how to create url for current search i write later


function getTopRepos (url, headers) {
    let tenRepositories = []
    return fetch(url, { headers })
        .then(response => response.json()) 
        .then(data => {
            data.items.forEach(repo => {
                let oneRepo = new Map();
                oneRepo.set('name', repo.full_name);
                oneRepo.set('url', repo.html_url);
                oneRepo.set('stars', repo.stargazers_count);
                oneRepo.set('commit', repo.commits_url)
                tenRepositories.push(oneRepo);
            })
            //console.log(tenRepositories)
            return tenRepositories;
        })
        .catch(error => console.error(error))
}

async function getListTopRepos (url) {
    const headers = new Headers();
    headers.append("Authorization", "token 0bd7dc8aec13dfc83bb7874381ac16f9a19b503f");
    let repos = await getTopRepos(url, headers);
    return await Promise.all(repos.map(async (repo) => {
        let commitDate = await getDateCommit(repo.get('commit'), headers);
        let commit = getCurrentDate(commitDate);
        repo.set('commit', commit)
        return repo
    }));
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
