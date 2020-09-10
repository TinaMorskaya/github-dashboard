export {getQueryParams}

function getParams (pageQuery) {
    return {
        target: pageQuery.get('target') || '',
        page: Number.parseInt(pageQuery.get('page') || 1)
    }
};

function getQueryParams(location) {
    const params = new URLSearchParams(location.search);
    let pr = getParams(params);
    console.log(pr, " = params")
    return pr
}