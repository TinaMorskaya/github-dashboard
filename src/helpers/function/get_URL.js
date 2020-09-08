export {getURL}

function getURL (settings) {
    let {target: target, page: page} = settings;
    console.log(page, target)
    let urlStart = 'https://api.github.com/search/repositories?q='
    let urlEnd = '&per_page=10&sort=stars&order=desc';
    let query;
    if (target == '') {
        query = 'stars%3A%3E1';
    } else {
        query = target + '+in:name';
    };
    let url = urlStart + query + urlEnd + `&page=${page}`
    console.log(url)
    return url
}