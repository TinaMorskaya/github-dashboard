export {getPaginationArray}


    function getPaginationArray (curPage, lastPage) {
        console.log('curPage = ' + curPage +' lastPage = '+lastPage)
        let names = ['<'];
        if (lastPage < 10) {
            for (let i = 1; i <= lastPage; i++) {
                names.push(i)
            }
        } else if (curPage < 6) {
                for (let i = 1; i <= 7; i++) {
                    names.push(i)
                };
                names.push('…', lastPage);
        } else {
            names.push(1, '…');
            if (curPage > lastPage - 5) {
                for (let i = lastPage - 6; i <= lastPage; i++) {
                    names.push(i)
                }
            } else {
                let stop = curPage + 2;
                let start = curPage - 2; 
                for (let i = start; i <= stop; i++) {
                    names.push(i)
                };
                names.push('…', lastPage);
            }
        }
        names.push('>');
        console.log(names)
        return names
    };