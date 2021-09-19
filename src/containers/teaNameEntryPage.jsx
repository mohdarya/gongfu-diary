import React from 'react';
import {Keyboard, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/core";


function TeaNameEntryPage(props) {

    let startingTime = 20;
    let teaName = ''
    const navigation = useNavigation()
    const
        styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: 'white',
                justifyContent: 'center',


            },
            teaNameTag: {
                fontSize: 15,
                margin: 10,
                marginTop: 10,
            },
            teaName: {
                marginBottom: '3%',
                textAlign: 'center',
                textAlignVertical: 'top',
                fontSize: 15,
                borderTopRightRadius: 20,
                color: 'black',
            },
            teaNameTextView: {
                height: '70%',
                width: '90%',


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
            },


        })


    function goToDiaryEntry() {
        if(teaName !== '') {
            navigation.navigate("DiaryEntry", {
                teaName,
                startingTime
            })
        }
        else {
            ToastAndroid.show("Please Enter a Tea Name", ToastAndroid.LONG)
        }
    }

    return (

        <TouchableOpacity style={{flex: 1}} onPress={() => {
            Keyboard.dismiss();

        }
        } activeOpacity={1}>
            <View style={styles.container}>
                <View style={styles.teaNameView}>
                    <View>
                        <Text style={styles.teaNameTag}>
                            Tea name
                        </Text>
                    </View>

                    <View style={styles.teaNameTextView}>
                        <TextInput style={styles.teaName}
                                   selectTextOnFocus={true}
                                   onChangeText={(text) => {
                                       teaName = text
                                   }}
                                   placeholder={"Enter Tea Name"}
                        >
                            {teaName}
                        </TextInput>
                    </View>
                </View>
                <View style={styles.incrementView}>
                    <View>
                        <Text style={styles.timerTagText}>
                            Starting Time
                        </Text>
                    </View>

                    <View>
                        <TextInput style={styles.startingTime}
                                   selectTextOnFocus={true}
                                   keyboardType={"number-pad"}
                                   onChangeText={(text) => {
                                       startingTime = text
                                   }}
                        >
                            {startingTime}
                        </TextInput>

                    </View>
                </View>
                <View style={styles.doneButtonView}>
                    <TouchableOpacity style={styles.doneButton}
                                      onPress={goToDiaryEntry} activeOpacity={1}>
                        <Text style={styles.doneButtonText}>
                            Done
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>

    )
}

export default TeaNameEntryPage
