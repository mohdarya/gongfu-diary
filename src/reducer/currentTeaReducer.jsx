/*

{
teaID:
teaName:
Origin:
Vendor:
Link:
}
 */

const initialState = {

    teaAvailable: [],
};

export function currentTeaReducer(state = initialState, action) {
    switch (action.type) {

         case 'ADD_TEA':
            return {
                ...state,
                teaAvailable: [...state.teaAvailable,  {...action.newEntry}]

            }
        case 'REMOVE_TEA':
            return {
                ...state,
                teaAvailable: state.teaAvailable.filter(item => item.teaID !== action.teaID)

            }

        case 'EDIT_TEA':
            const index = state.teaAvailable.findIndex(item => item.teaID !== action.teaID)
            const newArray = [...state.teaAvailable]
            newArray[index] = [...state.diaryEntry[index], ...action.newEntry]

            return {
                ...state,
                teaAvailable: newArray

            }
        default:
            return state;
    }


}
