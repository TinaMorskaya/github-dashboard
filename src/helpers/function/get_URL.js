export {getURL}

function getURL (settings) {
    let {target, page} = settings;
    console.log(page, target)
    let urlStart = 'https://api.github.com/search/repositories?q='
    let urlEnd = '&per_page=10&sort=stars&order=desc';
    let query;
    if (target == 'top') {
        query = 'stars%3A%3E1';
    } else {
        query = name;
    };
    let url = urlStart + query + urlEnd + `&page=${page}`
    url = url + `&page=${page}`;
    return url
}