export function editTea(newEntry, teaID)
{
    return {
        type: 'EDIT_TEA',
        teaID,
        newEntry

    };
}

export function addTea(newEntry)
{
    return {
        type: 'ADD_TEA',
        newEntry


    };
}

export function removeTea(teaID)
{
    return {
        type: 'REMOVE_TEA',
        teaID


    };
}


export function deductWeight(teaID, weight)
{
    return {
        type: 'DEDUCT_WEIGHT',
        teaID,
        weight


    };
}
export function addWeight(teaID, weight)
{
    return {
        type: 'ADD_WEIGHT',
        teaID,
        weight


    };
}

export function archiveTea(teaID)
{
    return {
        type: 'ARCHIVE_TEA',
        teaID,



    };
}

export function setTeaSessionForDay(sessionDay, date)
{
    return {
        type: 'SET_DAY_SESSION',
        sessionDay,
    date


    };
}

export function resetCurrentTeaData(){
    return{
        type: 'RESET_DATA'
    }
}
