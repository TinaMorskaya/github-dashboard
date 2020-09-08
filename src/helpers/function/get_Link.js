export {getLink}


// unused old function
function isDisabled (symbol, curPage, lastPage) {
    switch (symbol) {
        case '<':
            return curPage === 1? true: false;
        case '>':
            return curPage === lastPage? true: false;
        case curPage:
            return true;
        case '…':
            return true;
        default:
            return false;
    }
}


function getLink (symbol, curPage, lastPage, curTarget) {
    switch (symbol) {
        case '<':
            return curPage === 1? null 
            : '/?target=' + curTarget + '&page=' + (curPage - 1);
        case '>':
            return curPage === lastPage? null
            : '/?target=' + curTarget + '&page=' + (curPage + 1);
        case curPage:
            return null;
        case '…':
            return null;
        default:
            return '/?target=' + curTarget + '&page=' + symbol;
    }
};