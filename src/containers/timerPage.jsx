import React, {useEffect, useState} from 'react';
import {Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/core";

function TimerPage(props) {


    const navigation = useNavigation()
    const route = useRoute()


    const {startingTime} = route.params
    const [currentTime, setCurrenTime] = useState(parseInt(startingTime))
    const [countdownTimer, setCountdownTimer] = useState(parseInt(startingTime))
    const [startTimer, setStartTimer] = useState(false)
    const [increment, setIncrement] = useState(5);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',

        },
        topBar: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flex: 0.6,
            margin: 10,
            marginTop: 0,


        },
        timerView: {
            alignItems: 'center',
            marginTop: 100,
            marginLeft: 10,
            marginRight: 10,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            flex: 3,
        },
        countdownTimer: {

            backgroundColor: 'grey',
            borderRadius: 15,
            marginBottom: 50,
            height: 180,
            width: 180,
            alignItems: 'center',
            justifyContent: 'center',
        },
        countdownTimerText: {

            textAlign: 'center',

            fontSize: 60,
        },


        endButton: {

            backgroundColor: 'grey',
            borderRadius: 5,
            height: '45%',
            width: '25%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        endButtonText: {

            textAlign: 'center',
            bottom: '5%',
            fontSize: 23,
        },
        incrementView: {
            backgroundColor: 'grey',
            borderRadius: 20,
            flexDirection: 'row',
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            justifyContent: 'space-between',
            height: 80,
            width: '70%',


        },
        incrementTag: {
            fontSize: 17,
            margin: 5,
            marginTop: 1,

        }, incrementNumber: {
            alignSelf: 'flex-end',
            fontSize: 30,
            color: 'black',


        }, teaNameView: {
            height: 80,
            flexDirection: 'row',
            marginBottom: 30,
            marginLeft: 20,
            marginRight: 20,
            backgroundColor: 'grey',
            borderRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            justifyContent: 'space-between',
        }, teaFlavorView: {
            backgroundColor: 'grey',
            flex: 4,

            marginLeft: 20,
            marginRight: 20,
            borderRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
        }, doneButtonView: {
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
        },
        teaNameTag: {
            fontSize: 17,
            margin: 5,
            marginTop: 1,
        },
        teaName: {
            height: '100%',
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 15,
            borderTopRightRadius: 20,
            color: 'black',
        },
        teaNameTextView: {


            width: '70%',
            justifyContent: 'center',
            alignSelf: 'flex-end',


        },
        graphView: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,

        }, doneButton: {
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
        incrementNumberView: {


            justifyContent: 'flex-end',

            height: '100%',
            marginRight: 20,
            marginBottom: 20,
        },


    });


    const endButtonAction = () => {
        navigation.navigate("HomeScreen")
    }
    const startInterval = () => {

        setCurrenTime(countdownTimer)
        setCountdownTimer((t) => t - 1)
        setStartTimer(true)

    }


    useEffect(() => {

            if (startTimer) {
                setTimeout(() => {
                        if (countdownTimer <= 0) {
                            setStartTimer(false)
                            setCountdownTimer(parseInt(currentTime) + parseInt(increment))

                        } else {
                            setCountdownTimer((t) => t - 1)
                        }
                    }, 1000
                )
            }
        }


        ,
        [countdownTimer]
    )
    const goToFlavorSelection = () => {
        navigation.navigate('FlavorEntry')
    }
    return (


        <TouchableOpacity style={{flex: 1}} onPress={() => {
            Keyboard.dismiss();

        }
        } activeOpacity={1}>
            <View style={styles.container}>

                <View style={styles.topBar}>


                    <TouchableOpacity style={styles.endButton} activeOpacity={1} onPress={endButtonAction}>
                        <Text style={styles.endButtonText}>
                            End
                        </Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.timerView}>

                    <View style={styles.countdownTimer}>
                        <Text style={styles.countdownTimerText}>
                            {countdownTimer}
                        </Text>
                    </View>
                    <View style={styles.incrementView}>
                        <View>
                            <Text style={styles.incrementTag}>
                                Increment
                            </Text>
                        </View>

                        <View style={styles.incrementNumberView}>
                            <TextInput selectTextOnFocus={true} keyboardType={"number-pad"}
                                       style={styles.incrementNumber}
                                       onChangeText={(text) => {
                                           setIncrement(parseInt(text))
                                       }}>
                                {increment}
                            </TextInput>
                        </View>
                    </View>
                </View>


                <View style={styles.doneButtonView}>
                    <TouchableOpacity style={styles.doneButton} onPress={startInterval} activeOpacity={1}>
                        <Text style={styles.doneButtonText}>
                            Start
                        </Text>
                    </TouchableOpacity>
                </View>


            </View>

        </TouchableOpacity>


    )
}

export default TimerPage
