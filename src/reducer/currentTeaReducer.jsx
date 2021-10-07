/*

{
teaID:
teaName:
Origin:
Vendor:
Link:
}
 */

import {act} from "react-test-renderer";

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
            const index = state.teaAvailable.findIndex(item => item.teaID === action.teaID)
            const newArray = [...state.teaAvailable]
            newArray[index] = [...state.diaryEntry[index], ...action.newEntry]

            return {
                ...state,
                teaAvailable: newArray

            }
        case 'DEDUCT_WEIGHT':
            const indexWeight = state.teaAvailable.findIndex(item => item.teaID === action.teaID)
            const newArrayWeight = [...state.teaAvailable]
            newArrayWeight[indexWeight].weight = parseFloat(newArrayWeight[indexWeight].weight ) - parseFloat(action.weight)

            return {
                ...state,
                teaAvailable: newArrayWeight

            }
        case 'ADD_WEIGHT':
            const indexWeightAdd = state.teaAvailable.findIndex(item => item.teaID === action.teaID)
            const newArrayWeightAdd = [...state.teaAvailable]
            newArrayWeightAdd[indexWeightAdd].weight = parseFloat(newArrayWeightAdd[indexWeightAdd].weight ) + parseFloat(action.weight)

            return {
                ...state,
                teaAvailable: newArrayWeightAdd

            }
        default:
            return state;
    }


}
