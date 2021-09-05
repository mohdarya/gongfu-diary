/*
planned to add (Origin, Vendor, Link)
{

teaName:
sessionID:
steeps:[[{
 level:
 note:
 Detail:
 }]]
}
 */


const initialState = {

    diaryEntry: [],
};

export function diaryEntryReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_STEEP':
            const index = state.diaryEntry.findIndex(item => item.sessionID !== action.sessionID)
            const newArray = [...state.diaryEntry]
            newArray[index].steeps = [...state.diaryEntry[index].steeps, ...action.newSteep]

            return {
                ...state,
                diaryEntry: newArray

            }
        case 'ADD_ENTRY':
            return {
                ...state,
                diaryEntry: [...state.diaryEntry, ...action.newEntry]

            }
        case 'REMOVE_ENTRY':
            return {
                ...state,
                diaryEntry: state.diaryEntry.filter(item => item.sessionID !== action.sessionID)

            }



        default:
            return state;
    }


}
