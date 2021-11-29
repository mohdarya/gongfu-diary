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

    teaColour: {
        Oolong: '#80B06D',
        Purple: '#35345B',
        Black: '#51010F',
        White: '#84a98c',
        Green: '#33673B',
        HeiCha: '#081c15',
        RawPuerh: '#053835',
        RipePuerh: '#19535F'

    },
    weeklySession: ['', '', '', '', '', '', ''],
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
                teaAvailable: {
                    ...state.teaAvailable,
                    [action.teaID]: {
                        ...state.teaAvailable[action.teaID],
                        status: 'archived'
                    }
                }

            }

        case 'EDIT_TEA':

            let status

            if(action.newEntry.weight > 0)
            {
                status = 'active'
            }else {
                status = 'archived'
            }
            return {
                ...state,
                teaAvailable: {
                    ...state.teaAvailable,
                    [action.teaID]: {
                        ...state.teaAvailable[action.teaID],
                        ...action.newEntry,
                        status: status
                    }
                }

            }
        case 'DEDUCT_WEIGHT':


            if (parseFloat(state.teaAvailable[action.teaID].weight) - parseFloat(action.weight) <= 0) {
                return {
                    ...state,
                    teaAvailable: {
                        ...state.teaAvailable,
                        [action.teaID]: {
                            ...state.teaAvailable[action.teaID],
                            weight: parseFloat(parseFloat(state.teaAvailable[action.teaID].weight) - parseFloat(action.weight)).toFixed(1),
                            status: 'archived'
                        }
                    }

                }
            } else {

                return {
                    ...state,
                    teaAvailable: {
                        ...state.teaAvailable,
                        [action.teaID]: {
                            ...state.teaAvailable[action.teaID],
                            weight: parseFloat(parseFloat(state.teaAvailable[action.teaID].weight) - parseFloat(action.weight)).toFixed(1)
                        }
                    }

                }
            }
        case 'ADD_WEIGHT':

            if (parseFloat(state.teaAvailable[action.teaID].weight) + parseFloat(action.weight) > 0) {
                return {
                    ...state,
                    teaAvailable: {
                        ...state.teaAvailable,
                        [action.teaID]: {
                            ...state.teaAvailable[action.teaID],
                            weight: parseFloat(parseFloat(state.teaAvailable[action.teaID].weight) + parseFloat(action.weight)).toFixed(1),
                            status: 'active'
                        }
                    }

                }
            } else {

                return {
                    ...state,
                    teaAvailable: {
                        ...state.teaAvailable,
                        [action.teaID]: {
                            ...state.teaAvailable[action.teaID],
                            weight: parseFloat(parseFloat(state.teaAvailable[action.teaID].weight) - parseFloat(action.weight)).toFixed(1)
                        }
                    }

                }
            }

        case 'ARCHIVE_TEA':



                return {
                    ...state,
                    teaAvailable: {
                        ...state.teaAvailable,
                        [action.teaID]: {
                            ...state.teaAvailable[action.teaID],
                            status: 'archived'
                        }
                    }

                }

        case 'UNARCHIVE_TEA':



            return {
                ...state,
                teaAvailable: {
                    ...state.teaAvailable,
                    [action.teaID]: {
                        ...state.teaAvailable[action.teaID],
                        status: 'active'
                    }
                }

            }


        case 'SET_DAY_SESSION':


            let modifiedWeekly = state.weeklySession
            modifiedWeekly[action.sessionDay] = action.date
            return {
                ...state,
                weeklySession: modifiedWeekly,
            }
        case 'RESET_DATA':
            return initialState


        default:
            return state;
    }


}
