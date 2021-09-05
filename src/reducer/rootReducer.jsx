import {combineReducers} from 'redux';
import {diaryEntryReducer} from "./diaryEntryReducer";
import {currentTeaReducer} from "./currentTeaReducer";


const rootReducer = combineReducers({
    Diary: diaryEntryReducer,
    TeaAvailable: currentTeaReducer
});

export default rootReducer;
