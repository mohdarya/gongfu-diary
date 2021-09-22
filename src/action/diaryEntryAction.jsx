export function addSteep(newSteep, sessionID)
{
    return {
        type: 'ADD_STEEP',
        sessionID,
        newSteep

    };
}

export function addEntry(newEntry)
{
    return {
        type: 'ADD_ENTRY',
        newEntry


    };
}

export function removeEntry(sessionID)
{
    return {
        type: 'REMOVE_ENTRY',
        sessionID


    };
}



export function editEntryName(sessionID, newName)
{
    return {
        type: 'EDIT_ENTRY_NAME',
        sessionID,
        newName


    };
}
