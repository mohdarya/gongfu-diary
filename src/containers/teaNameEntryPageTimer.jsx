import React from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform, ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {useHeaderHeight} from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/core";


function TeaNameEntryPage(props) {

    let startingTime = 20;
    let teaName
    const navigation = useNavigation()
    const
        styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: 'white',
                justifyContent: 'center',
            },
            teaNameView: {
                height: 70,
                flexDirection: 'column',
                marginBottom: '5%',
                marginLeft: 20,
                marginRight: 20,
                marginTop: '20%',
                backgroundColor: 'white',
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
            },

            startingTime: {
                fontSize: 40,
                textAlign: 'center',
                color: 'black',
            },

            timerTagText: {
                fontSize: 17,
                margin: 10,
                marginTop: 8,
            },
            incrementView: {
                alignSelf: 'center',
                backgroundColor: 'grey',
                borderRadius: 20,
                flexDirection: 'row',
                borderTopLeftRadius: 0,
                borderBottomRightRadius: 0,
                justifyContent: 'space-between',
                height: 80,
                width: '70%',
            },
            incrementNumberView: {
                justifyContent: 'flex-end',
                height: '100%',
                marginRight: 20,
                marginBottom: 20,
            },


        })


    function goToDiaryEntry() {
        navigation.navigate("TimerPage", {
            startingTime
        })
    }

    return (

        <TouchableOpacity style={{flex: 1}} onPress={() => {
            Keyboard.dismiss();

        }
        } activeOpacity={1}>
            <View style={styles.container}>

                <View style={styles.teaNameView}>

                </View>

                <View style={styles.incrementView}>
                    <View>
                        <Text style={styles.timerTagText}>
                            Starting Time
                        </Text>
                    </View>

                    <View style={styles.incrementNumberView}>
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
