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


export function editEntrySteep(sessionID, steepIndex, newSteep)
{
    return {
        type: 'EDIT_ENTRY_STEEP',
        sessionID,
        steepIndex,
        newSteep


    };
}


export function addDuration(sessionID, duration)
{
    return {
        type: 'ADD_DURATION',
        sessionID,
       duration,


    };
}

export function editNote(sessionID, note)
{
    return {
        type: 'EDIT_NOTE',
        sessionID,
        note,


    };
}

export function resetDiaryData(){
    return{
        type: 'RESET_DATA'
    }
}
