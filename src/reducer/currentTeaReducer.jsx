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

    currentTeaID: 0,
    teaAvailable: {},
};

export function currentTeaReducer(state = initialState, action) {
    switch (action.type) {

        case 'ADD_TEA':
            return {
                ...state,
                teaAvailable: {
                    ...state.teaAvailable,
                    [state.currentTeaID++]: {...action.newEntry}
                }

            }
        case 'REMOVE_TEA':
            return {
                ...state,
                teaAvailable: Object.fromEntries(Object.entries(state.teaAvailable).filter(([key, value]) => key !== action.teaID)),

            }

        case 'EDIT_TEA':
            return {
                ...state,
                teaAvailable: {
                    ...state.teaAvailable,
                    [action.teaID]: {
                        ...state.teaAvailable[action.teaID],
                        ...action.newEntry
                    }
                }

            }
        case 'DEDUCT_WEIGHT':



            return {
                ...state,
                teaAvailable: {
                    ...state.teaAvailable,
                    [action.teaID]: {
                        ...state.teaAvailable[action.teaID],
                        weight:  parseFloat(state.teaAvailable[action.teaID].weight) - parseFloat(action.weight)
                    }
                }

            }
        case 'ADD_WEIGHT':
            return {
                ...state,
                teaAvailable: {
                    ...state.teaAvailable,
                    [action.teaID]: {
                        ...state.teaAvailable[action.teaID],
                        weight:  parseFloat(state.teaAvailable[action.teaID].weight) + parseFloat(action.weight)
                    }
                }

            }
        default:
            return state;
    }


}
