export {setQueryParams}

function setQueryParams (searchSettings, history) {
        
    //let history = useHistory();
    let {target, page} = searchSettings;
    let query;
    if (target.length) {
        query = '/?target=' + target + '&page=' + page;
        console.log('queryTP', query);
    } else {
        query = '/?page=' + page;
        console.log('queryP', query);
    }
    history.push(query);
};