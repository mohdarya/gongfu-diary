import React, {useEffect, useState} from 'react';
import {
    BackHandler,
    FlatList,
    Image,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text, TextInput,
    ToastAndroid,
    TouchableOpacity,
    View
} from "react-native";
import Slider from "@react-native-community/slider";
import {useNavigation, useRoute} from "@react-navigation/core";


function NoteEntry(props) {



    let flavorNotes = [
        {
            'note': 'Marine',
            'detail': ['Seaweed', 'Ocean Air']
        },
        {
            'note': 'Mineral',
            'detail': ['Salt', 'Metallic', 'Wet Rocks']
        },
        {
            'note': 'Earth',
            'detail': ['moss', 'Musty', 'Leather', 'Compost', 'Wet Earth', 'Forest Floor', 'Decaying Wood']
        },
        {
            'note': 'Wood',
            'detail': ['Pine', 'Bark', 'Cedar', 'Resin', 'Wet Wood', 'Dark Wood', 'Green Wood', 'Cherry Wood']
        },
        {
            'note': 'Grass',
            'detail': ['Grass', 'Stems', 'Straw', 'barnyard', 'grass seed', 'freshly cut grass']
        },
        {
            'note': 'Vegetables',
            'detail': ['Spinach', 'Broccoli', 'Zucchini', 'Asparagus', 'Garden Peas', 'Green Pepper']
        },

        {
            'note': 'Herbs',
            'detail': ['Thyme', 'Parsley', 'Cardamon', 'Eucalyptus', 'Fennel Seed', 'Coriander Seed']
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
            'detail': ['Malt', 'Candy', 'Honey', 'Caramel', 'Molasses', 'Burnt Sugar', 'Maple Syrup']
        },
        {
            'note': 'Char',
            'detail': ['Ash', 'Tar', 'Toast', 'Smoke', 'Tobacco', 'Fireplace', 'Burnt Food', 'Grilled Food']
        },
        {
            'note': 'Spice',
            'detail': ['Cocoa', 'Clove', 'Vanilla', 'Pepper', 'Saffron', 'Nutmeg', 'Licorice', 'Menthol', 'Cinnamon']
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
            'detail': ['Lemon', 'Orange', 'Grapefruit', 'Citrus Zest']
        },
        {
            'note': 'Berries',
            'detail': ['Raspberry', 'Strawberry', 'Blackberry', 'Black Currant']
        }

    ]


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#264653',
            justifyContent: 'flex-start',


        },
        teaNameTag: {
            fontSize: 15,
            margin: 10,
            marginTop: 10,
        },
        teaName: {

            textAlign: 'center',
            textAlignVertical: 'top',
            fontSize: 15,
            borderTopRightRadius: 20,
            color: 'black',
        },
        teaNameTextView: {
            height: '70%',
            width: '90%',

            marginBottom: '3%',
            justifyContent: 'flex-start',
            alignSelf: 'center',


        },


        teaNameView: {


            height: 70,
            flexDirection: 'column',
            marginBottom: '5%',
            marginLeft: 20,
            marginRight: 20,
            marginTop: '20%',
            backgroundColor: 'grey',
            borderRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            justifyContent: 'space-around',
        },
        doneButtonView: {
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
        },
        doneButton: {
            backgroundColor: '#E9C46A',
            width: 200,
            height: 50,
            borderRadius: 10,
            justifyContent: 'center',
            alignContent: 'center',
        },
        doneButtonText: {
            textAlign: 'center',
            bottom: '5%',
            fontWeight: 'bold',
            fontSize: 30,
            color: '#264653',
        }, timeView: {
            height: 150,
            flexDirection: 'row',
            marginBottom: '30%',
            marginLeft: 20,
            marginRight: 20,


            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            justifyContent: 'space-around',
        },
        timerTag: {
            backgroundColor: 'grey',
            height: 80,
            width: 130,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
        },
        startingTime: {
            fontSize: 40,
            textAlign: 'center',
            color: 'black',
        },
        startingTimeView: {
            backgroundColor: 'grey',
            height: 80,
            width: 130,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
        },
        timerTagText: {
            fontSize: 20,
            top: 4,
            textAlign: 'center',
        },
        incrementView: {
            alignSelf: 'center',
            backgroundColor: 'grey',
            borderRadius: 20,

            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            justifyContent: 'space-between',
            height: 110,
            width: 170,
        }, topPart: {
            height: 170,
            width: '100%',


        },
        topPartBar: {
            height: 170,
            width: '100%',

            alignItems: 'center',
            backgroundColor: '#2A9D8F',
            borderBottomLeftRadius: 93,
            borderBottomRightRadius: 93,

        },
        infoPart: {
            width: '100%',
            justifyContent: 'center',
            marginTop: '20%',

        },
        buttonPart: {


            width: '100%',
            top: '15%',
            height: 400,

        }, flavorNote: {
            backgroundColor: 'grey',
            width: 150,
            height: 45,
            alignSelf: 'flex-end',
            margin: 5,
            marginRight: 0,
            borderTopRightRadius: 20,
            marginLeft: 15,
            borderBottomLeftRadius: 20,
        },
        flavorView: {
            height: 170,
            width: '100%',
            borderRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,

            justifyContent: 'flex-start',

            flexDirection: 'column',
        }, valueTextView: {
            height: 'auto',
            width: '100%',
            alignItems: 'center',
        },
        valueText: {
            top: '40%',
            fontSize: 30,
            color: 'white'

        }, sliderView: {
            height: 'auto',
            width: '100%',
            marginTop: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,

        },
        detailView: {
            width: 150,
            height: 45,
            margin: 10,
            marginRight: 0,
            borderRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            backgroundColor: 'grey',
            alignSelf: 'flex-end',
            flexDirection: 'row',
        },
        fieldTag: {
            fontSize: 17,
            height: '100%',
            width: '100%',

            textAlign: 'center',
            textAlignVertical: 'center',
        }, flavorContainer: {
            height: 120,
            margin: 15,
            width: 'auto',
            justifyContent: 'space-between',
        },
        endButton: {
            margin: 20,
            backgroundColor: 'grey',
            borderRadius: 5,
            height: 30,
            width: 60,
            alignSelf: 'flex-end',
            alignItems: 'center',
            justifyContent: 'center',
        },
        endButtonText: {
            textAlign: 'center',
            bottom: '5%',
            fontSize: 15,
        }, FlavorNoteItem: {
            height: 60,
            width: 160,
            borderRadius: 20,
            flexBasis: '40%',
            margin: 20,

        },
        flavorNoteView: {
            flex: 1,

            flexDirection: 'row',
        },
        flavorNoteText: {
            alignSelf: 'center',
            height: '100%',
            textAlignVertical: 'center',
            textAlign: 'center',
            fontSize: 20
        },
        flavorListContainer: {
            flex: 1,
            marginBottom: 20,
        }

    })


    const route = useRoute()






    const navigation = useNavigation()

    function handleBackButtonClick() {

        if(navigation.canGoBack())
        {
            navigation.goBack()
            return true;
        }

        else{
            return true
        }

    }
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    const doneButtonAction = () => {




        navigation.goBack()
    }
    return (



        <View style={styles.container}>
            <View style={styles.topPart}>
                <View style={styles.topPartBar}>

                </View>
                <View style={{ top: '70%',left: '15%',width: '70%', height: 110, backgroundColor: '#E9C46A', borderRadius:30, position: "absolute", alignContent: 'center', justifyContent: 'center'}}>
                    <Text style={{alignSelf: 'center', fontSize: 25, color: '#264653', fontWeight: 'bold'}}>
                        Enter Your Note
                    </Text>
                </View>

            </View>

            <View style={styles.infoPart}>


                <TextInput multiline={true}
                maxLength={456}
                           onChangeText={(text) => {
                               route.params.setNote(text)
                               route.params.setTeaTagColor('white')
                           }}
                           placeholder={'Enter your Note for the Tea'}
                style={{height: 350, width: '80%',alignSelf: 'center', textAlignVertical: 'top', textAlign: 'center', fontSize: 17}}>
                    {route.params.note}
                </TextInput>










            </View>


            <View style={styles.doneButtonView}>
                <TouchableOpacity style={styles.doneButton} onPress={doneButtonAction} activeOpacity={1}>
                    <Text style={styles.doneButtonText}>
                        Done
                    </Text>
                </TouchableOpacity>
            </View>

        </View>


    )
}

export default NoteEntry

