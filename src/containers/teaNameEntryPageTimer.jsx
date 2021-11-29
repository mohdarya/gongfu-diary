import React, {useState} from 'react';
import {Image, Keyboard, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/core";




function teaNameEntryPageTimer(props) {


    const [startingTime, setStartingTime] = useState(null)
    const navigation = useNavigation()
    const
        styles = StyleSheet.create({
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
                backgroundColor: 'grey',
                width: 200,
                height: 50,
                borderRadius: 10,
                justifyContent: 'center',
                alignContent: 'center',
            },
            doneButtonText: {
                textAlign: 'center',
                bottom: '5%',
                fontSize: 25,
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
                marginTop: '20%',
                marginRight: '10%',
                marginLeft: '10%',
            },
            buttonPart: {


                width: '100%',
                top: '15%',
                height: 400,
            },


        })



    function goToDiaryEntry() {
        if (startingTime !== null) {
            navigation.navigate("TimerPage", {
                startingTime
            })
        } else {
            ToastAndroid.show("Please Enter a Starting Time", ToastAndroid.LONG)
        }
    }


    return (

        <TouchableOpacity style={{flex: 1}} onPress={() => {
            Keyboard.dismiss();

        }
        } activeOpacity={1}>
            <View style={styles.container}>
                <View style={styles.topPart}>
                    <View style={styles.topPartBar}>

                    </View>
                    <View style={{ top: '70%',left: '15%',width: '70%', height: 110, backgroundColor: '#E9C46A', borderRadius:30, position: "absolute", alignContent: 'center', justifyContent: 'center'}}>
                        <Text style={{alignSelf: 'center', fontSize: 25, color: '#264653', fontWeight: 'bold'}}>
                            Enter Starting Time
                        </Text>
                    </View>

                </View>
                <View style={styles.infoPart}>

                    <TextInput style={{fontSize: 20,  borderBottomWidth: 2, borderColor: '#E9C46A'}}  placeholder={'First steep time'}  onChangeText={(text) => {
                        let amount
                        if(text === '')
                        {
                            amount = null
                        }
                        else {
                            amount = parseInt(text)
                        }
                        setStartingTime(amount)
                    }} keyboardType={'number-pad'}>

                    </TextInput>

                </View>
                <View style={styles.buttonPart}>
                    <TouchableOpacity activeOpacity={1} onPress={goToDiaryEntry} style={{width: 260, height: 55,backgroundColor: '#E9C46A', alignSelf: 'flex-end', marginRight: 15, borderRadius: 16, justifyContent: 'center', flexDirection: 'row'}}>
                        <Text style={{alignSelf: "center", marginLeft: 10,fontSize: 20, color: '#264653', fontWeight: 'bold'}}>
                            Let's Start Brewing
                        </Text>
                        <Image style={{height: 40, width: 40,top: '1%' ,alignSelf: "center",}} source={require('../img/nextArrow.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>

    )
}

export default teaNameEntryPageTimer
