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


import {currentTeaReducer} from "./currentTeaReducer";

const initialState = {

    flavorNotes: [
        {
            'note': 'Marine',
            'detail': ['Seaweed','Fish', 'Oyster','Shrimp','Seasalt', 'Ocean Air']
        },
        {
            'note': 'Mineral',
            'detail': ['Salt','Volcanic','Chalk','Granite', 'Metallic', 'Wet Rocks']
        },
        {
            'note': 'Earth',
            'detail': ['Moss', 'Musty', 'Leather', 'Compost', 'Wet Earth', 'Forest Floor', 'Wet Leaves']
        },
        {
            'note': 'Wood',
            'detail': ['Pine', 'Bark', 'Cedar', 'Resin', 'Wet Wood','Sawdust','Oak' ,'Dark Wood', 'Green Wood', 'Cherry Wood', 'Eucalyptus']
        },
        {
            'note': 'Grass',
            'detail': ['Grass', 'Stems', 'Straw', 'barnyard', 'Bamboo', 'freshly cut grass']
        },
        {
            'note': 'Vegetables',
            'detail': ['Spinach', 'Broccoli', 'Zucchini', 'Asparagus', 'Peas', 'Green Pepper', 'Bean sprout', 'Green beans']
        },

        {
            'note': 'Herbs',
            'detail': ['Thyme', 'Parsley', 'Cardamon', 'Fennel Seed', 'Coriander Seed', 'Lavender','Mint','Basil', 'Sage']
        },
        {
            'note': 'Floral',
            'detail': ['Rose', 'Hops', 'Orchid', 'Violet', 'Jasmine', 'Perfume', 'Geranium', 'Dandelion', 'Honeysuckle', 'Cherry Blossom', 'Orange Blossom']
        },
        {
            'note': 'Nutty',
            'detail': ['Almond', 'Peanut', 'Walnut', 'Chestnut', 'Hazelnut', 'Roasted Nuts']
        },
        {
            'note': 'Sweet',
            'detail': ['Malt', 'Candy', 'Honey', 'Toffee','Brown sugar', 'Caramel', 'Molasses', 'Burnt Sugar', 'Maple Syrup']
        },
        {
            'note': 'Char',
            'detail': ['Ash', 'Tar', 'Toast', 'Smoke', 'Tobacco', 'Fireplace', 'Burnt Food', 'Grilled Food']
        },
        {
            'note': 'Spice',
            'detail': ['Cocoa', 'Clove', 'Vanilla', 'Pepper','Cardamom', 'Saffron', 'Nutmeg', 'Licorice', 'Menthol', 'Cinnamon', 'Ginger',]
        },
        {
            'note': 'Tropical Fruit',
            'detail': ['Mango', 'Melon', 'Lychee', 'Banana', 'Pineapple']
        },
        {
            'note': 'Tree Fruit',
            'detail': ['Peach', 'Pear', 'Apricot', 'Red Apple', 'Green Apple', 'Dried Fruits']
        },
        {
            'note': 'Citrus Fruit',
            'detail': ['Lemon','Lime','Mandarin', 'Orange', 'Grapefruit', 'Citrus Zest']
        },
        {
            'note': 'Berries',
            'detail': ['Raspberry', 'Strawberry', 'Blackberry', 'Blackcurrant']
        },
        {
            'note': 'Milky',
            'detail': ['Butter', 'Creamy']
        }
    ],
    diaryEntry: [],
};

export function diaryEntryReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_STEEP':
            const index = state.diaryEntry.findIndex(item => item.sessionID === action.sessionID)
            const newArray = state.diaryEntry
            newArray[index].steeps = [...state.diaryEntry[index].steeps, [action.newSteep]]

            return {
                ...state,
                diaryEntry: newArray

            }
        case 'ADD_ENTRY':
            return {
                ...state,
                diaryEntry: [...state.diaryEntry, {...action.newEntry}]

            }
        case 'REMOVE_ENTRY':
            return {
                ...state,
                diaryEntry: state.diaryEntry.filter(item => item.sessionID !== action.sessionID)

            }
        case 'EDIT_ENTRY_NAME':
            const teaNameIndex = state.diaryEntry.findIndex(item => item.sessionID === action.sessionID)
            const newTeaNameArray = state.diaryEntry
            let dateNumber = parseInt(newTeaNameArray[teaNameIndex].sessionID.replace(newTeaNameArray[teaNameIndex].teaID + newTeaNameArray[teaNameIndex].teaName, ''))
            let newdate = action.newName.teaID + action.newName.teaName + dateNumber
            newTeaNameArray[teaNameIndex].teaName = action.newName.teaName
            newTeaNameArray[teaNameIndex].sessionID = newdate
            newTeaNameArray[teaNameIndex].teaID = action.newName.teaID
            return {
                ...state,
                diaryEntry: newTeaNameArray
            }


        case 'EDIT_ENTRY_STEEP':

            const teaSteepIndex = state.diaryEntry.findIndex(item => item.sessionID === action.sessionID)
            const newTeaSteepArray = state.diaryEntry
            newTeaSteepArray[teaSteepIndex].steeps[action.steepIndex] = [action.newSteep]
            return {
                ...state,
                diaryEntry: newTeaSteepArray
            }

        case 'ADD_DURATION':

            const Index = state.diaryEntry.findIndex(item => item.sessionID === action.sessionID)
            const Array = state.diaryEntry

            Array[Index] = { ...Array[Index], duration: action.duration}

            return {
                ...state,
                diaryEntry: Array
            }

        case 'EDIT_NOTE':

            const noteIndex = state.diaryEntry.findIndex(item => item.sessionID === action.sessionID)
            const noteArray = state.diaryEntry

            noteArray[noteIndex] = { ...noteArray[noteIndex], note: action.note}

            return {
                ...state,
                diaryEntry: noteArray
            }
        case 'RESET_DATA':
            return initialState


        default:
            return state;
    }


}
