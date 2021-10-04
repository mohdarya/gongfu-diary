import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/core";
import {addDuration, addEntry, addSteep} from "../action/diaryEntryAction";
import {connect} from 'react-redux';
import RadarChart from "../components/radarChart";
import BackgroundTimer from 'react-native-background-timer';
import {Directions, FlingGestureHandler, State} from "react-native-gesture-handler";

function DiaryEntry(props) {


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#264653',

        },
        topPart: {
            height: 170,
            width: '100%',


        },
        topPartBar: {
            height: 250,
            width: '100%',

            alignItems: 'center',
            backgroundColor: '#2A9D8F',
            borderBottomLeftRadius: 93,
            borderBottomRightRadius: 93,

        },
        steepView: {
            alignSelf: 'center',


            top: 300,
            height: 400,
            width: '90%',

        },
        steepTag: {

            alignSelf: 'center',
            borderRadius: 15,
            height: 40,
            marginBottom: 10,
            width: '50%',
            backgroundColor: '#E9C46A',
        }, teaFlavorView: {
            backgroundColor: 'grey',
            flex: 5,
            marginLeft: 20,
            marginRight: 20,
            borderRadius: 20,
            flexDirection: 'column',
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
        }, graphView: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: 'white',
            marginTop: 20,
            borderRadius: 20,
        }, notesView: {

            alignSelf: 'center',


            top: 350,
            height: 400,
            width: '90%',
        },
        noteElement: {
            alignItems: 'center',
            justifyContent: 'center',
            height: 380,


            borderRadius: 20,
        },
        notesTag: {
            alignSelf: 'center',
            borderRadius: 15,
            height: 40,
            marginBottom: 10,
            width: '50%',
            backgroundColor: '#E9C46A',
        },
        sessionActionMenu: {
            height: 66,
            width: 'auto',
            backgroundColor: '#E9C46A',
            flexDirection: 'row',
            borderRadius: 25,

            alignItems: "center",
            justifyContent: 'center',
            alignSelf: "flex-end",

        }


    });


    let beginX
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    const textInputWidth = useRef(new Animated.Value(0)).current
    const navigation = useNavigation()
    const route = useRoute()
    const {teaName, startingTime, teaID, temp, waterVolume, weight} = route.params.teaData
    const [first, setFirst] = useState(true)
    const [currentTime, setCurrenTime] = useState(parseInt(startingTime))
    const [countdownTimer, setCountdownTimer] = useState(parseInt(startingTime))
    const [startTimer, setStartTimer] = useState(true)
    const [increment, setIncrement] = useState(5);
    const [steepData, setSteepData] = useState({})
    const [note, setNote] = useState('');
    const [timerViewVisibility, setTimerViewVisibility] = useState(false)
    const [buttonText, setButtonText] = useState('Stop')


    const [sessionID, setSessionID] = useState(() => {
        return teaName + Date.now()
    })


    useEffect(() => {
        props.createEntry({
            teaID, waterVolume, weight,  temp,
            teaName: teaName,
            sessionID: sessionID,
            steeps: [],

        })
    }, [])
    const endButtonAction = () => {

        let duration = Date.now() -  parseInt(sessionID.replace(teaName, ''))
        console.log(duration)
        props.addDuration(sessionID, parseInt(duration))

        navigation.navigate("HomeScreen")
    }


    useEffect(() => {
        if (!startTimer) {


            if (first) {


                setFirst(false)
                setCountdownTimer(parseInt(currentTime))

            } else {
                setCountdownTimer(parseInt(currentTime) + parseInt(increment))
            }
            BackgroundTimer.stopBackgroundTimer()
            setButtonText('Close')
        }
    }, [startTimer])
    const startInterval = () => {


        setCurrenTime(countdownTimer)


        if (!first) {


            props.addSteep(sessionID, steepData)
            setCountdownTimer((t) => t + increment)
        }


        BackgroundTimer.runBackgroundTimer(() => {


                setCountdownTimer(secs => {
                    if (secs > 0) {
                        return secs - 1


                    } else {

                        setStartTimer(false)
                        return 0


                    }
                })

            },
            1000);
        setStartTimer(true)


    }


    const clockiFy = () => {
        let mins = Math.floor((countdownTimer / 60) )
        let seconds = Math.floor(countdownTimer % 60)

        let displayMins = mins < 10 ? `0${mins}` : mins
        let displaySecs = seconds < 10 ? `0${seconds}` : seconds

        return {
            displayMins,
            displaySecs
        }

    }


    const goToFlavorSelection = () => {
        navigation.navigate('FlavorEntry', {
            setSteepData,
            steepData
        })
    }


    return (


        <View style={styles.container}>


            <Modal animationType="slide"
                   transparent={true}
                   visible={timerViewVisibility}
                   onRequestClose={() => {

                       setTimerViewVisibility(!timerViewVisibility)
                   }}>
                <View style={{height: '100%', width: '100%', justifyContent: 'flex-end'}}>
                    <View style={{
                        height: '80%',
                        width: '100%',
                        backgroundColor: '#13242A',
                        borderTopLeftRadius: 100,
                        borderTopRightRadius: 100
                    }}>


                        <View style={{
                            marginTop: '15%',
                            marginBottom: 5,
                            alignSelf: 'center',
                            borderRadius: 300,
                            backgroundColor: '#264653',
                            borderWidth: 10,
                            borderColor: '#2A9D8F',
                            height: '50%',
                            width: '75%',
                            justifyContent: 'center',

                        }}>
                            <Text style={{alignSelf: 'center', fontWeight: 'bold', color: 'white', fontSize: 80}}>
                                {clockiFy().displayMins + ':' + clockiFy().displaySecs}
                            </Text>
                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setStartTimer(false)
                                    setTimerViewVisibility(!timerViewVisibility)
                                }} style={{
                                backgroundColor: '#E53B3B',
                                width: 200,
                                height: 50,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignContent: 'center',
                            }} activeOpacity={1}>
                                <Text style={{
                                    textAlign: 'center',
                                    bottom: '5%',
                                    fontWeight: 'bold',
                                    fontSize: 30,
                                    color: '#000000',
                                }}>
                                    {buttonText}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </Modal>
            <ScrollView style={{flex: 1}} contentContainerStyle={{height: 1500}}>
                <View style={styles.topPart}>
                    <View style={styles.topPartBar}>
                        <View style={{
                            top: 20,
                            width: 80,
                            height: 80,
                            backgroundColor: '#E9C46A',
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity activeOpacity={1} style={{width: 70, height: 70}}>
                                <Image style={{height: '100%', width: '100%'}} source={require('../img/add.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{
                        top: '70%',
                        left: '20%',
                        width: '60%',
                        height: 300,
                        backgroundColor: '#E9C46A',
                        borderRadius: 30,
                        position: "absolute",
                        alignContent: 'center',
                        justifyContent: 'flex-start'
                    }}>
                        <Text style={{alignSelf: 'center', fontSize: 60, color: '#264653', fontWeight: 'bold'}}>
                            {startingTime}
                        </Text>
                        <Text style={{alignSelf: 'center', fontSize: 25, color: '#264653'}}>
                            Timer
                        </Text>
                        <View style={{
                            width: '80%',
                            marginTop: 5,
                            alignSelf: 'center',
                            height: 2,
                            backgroundColor: '#2A9D8F'
                        }}/>
                        <TextInput
                            selectTextOnFocus={true}
                            keyboardType={"number-pad"}
                            onChangeText={(text) => {
                                if (text !== '') {
                                    setIncrement(parseInt(text))
                                } else {
                                    setIncrement(0)
                                }
                            }}
                            style={{
                                alignSelf: 'center',
                                marginTop: 5,
                                fontSize: 25,
                                color: '#264653',
                                fontWeight: 'bold'
                            }}
                            value={increment.toString()}>

                        </TextInput>
                        <Text style={{alignSelf: 'center', fontSize: 25, color: '#264653'}}>
                            Increment
                        </Text>

                        <Text style={{
                            alignSelf: 'center',
                            marginTop: 15,
                            fontSize: 15,
                            color: '#264653',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>
                            {teaName}
                        </Text>


                    </View>
                </View>
                <View style={styles.steepView}>
                    <View style={styles.steepTag}>
                        <Text style={{
                            alignSelf: 'center',
                            height: '100%',
                            textAlignVertical: 'center',
                            fontSize: 20,
                            color: '#264653',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>
                            Flavor
                        </Text>

                    </View>
                    <TouchableOpacity style={styles.graphView}
                                      activeOpacity={1}
                                      onPress={goToFlavorSelection}
                    >

                        <RadarChart steeps={{...steepData}}/>

                    </TouchableOpacity>
                </View>


                <View style={styles.notesView}>
                    <View style={styles.notesTag}>
                        <Text style={{
                            alignSelf: 'center',
                            height: '100%',
                            textAlignVertical: 'center',
                            fontSize: 20,
                            color: '#264653',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>
                            Notes
                        </Text>

                    </View>
                    <TouchableOpacity style={styles.noteElement}
                                      activeOpacity={1}
                                      onPress={() => {
                                          navigation.navigate('NoteEntry', {
                                              note, setNote
                                          })
                                      }}
                    >

                        <Text style={{
                            textAlignVertical: 'top',
                            height: '100%',
                            color: 'white',
                            fontSize: 20,
                            textAlign: 'center'
                        }}>
                            {note}
                        </Text>

                    </TouchableOpacity>
                </View>


            </ScrollView>

            <View style={{
                position: "absolute",
                bottom: '10%',
                width: '100%',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                flexDirection: 'row'
            }}>

                <FlingGestureHandler
                    direction={Directions.RIGHT | Directions.LEFT}
                    onHandlerStateChange={({nativeEvent}) => {
                        if (nativeEvent.state === State.BEGAN) {
                            beginX = nativeEvent.absoluteX;
                        }
                        if (nativeEvent.state === State.END) {

                            if (nativeEvent.absoluteX - beginX < -50) {
                                Animated.timing(textInputWidth, {
                                    toValue: 1,
                                    duration: 100,
                                    useNativeDriver: false,
                                }).start();

                            } else if (nativeEvent.absoluteX - beginX > 10) {
                                Animated.timing(textInputWidth, {
                                    toValue: 0,
                                    duration: 100,
                                    useNativeDriver: false,
                                }).start();
                            }
                        }
                    }}>
                    <View style={styles.sessionActionMenu}>
                        <Animated.View style={{
                            height: 66,


                            backgroundColor: '#E9C46A', borderTopLeftRadius: 25,
                            borderBottomLeftRadius: 25,
                            width: textInputWidth.interpolate({
                                inputRange: [0, 1],
                                outputRange: [110, 67]
                            }),

                        }}>


                            <Image style={{width: 67, height: 67, alignSelf: 'center'}}
                                   source={require('../img/pausePlay.png')}/>

                        </Animated.View>
                        <Animated.View
                            style={[

                                {
                                    height: 66,
                                    width: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 200]
                                    }),
                                    backgroundColor: '#E9C46A',
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',


                                },
                            ]}>


                            <AnimatedTouchable activeOpacity={1} style={{
                                backgroundColor: '#3C91E6',
                                height: 48,

                                width: textInputWidth.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 50]
                                }),
                                borderRadius: 20,
                                alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <AnimatedTouchable activeOpacity={1} onPress={() => {
                                    setButtonText('Stop')
                                    startInterval()
                                    setTimerViewVisibility(!timerViewVisibility)
                                }} style={{
                                    width: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 40]
                                    }), height: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 40]
                                    }),
                                }}>
                                    <Image style={{height: '100%', width: '100%'}}
                                           source={require('../img/start.png')}/>
                                </AnimatedTouchable></AnimatedTouchable>
                            <AnimatedTouchable activeOpacity={1} style={{
                                backgroundColor: '#3C91E6',
                                height: 48,

                                width: textInputWidth.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 50]
                                }),
                                borderRadius: 20,
                                alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <AnimatedTouchable activeOpacity={1} onPress={endButtonAction} style={{
                                    width: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 40]
                                    }), height: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 40]
                                    }),
                                }}>
                                    <Image style={{height: '100%', width: '100%'}} source={require('../img/stop.png')}/>
                                </AnimatedTouchable></AnimatedTouchable>

                        </Animated.View>

                    </View>
                </FlingGestureHandler>

            </View>
        </View>


    )
}


const mapStateToProps = (state, ownProps) => {
    const {Diary} = state;

    return {
        Diary: Diary.diaryEntry
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {

    return {

        createEntry: (data) => dispatch(addEntry(data)),
        addSteep: (sessionID, steepData) => dispatch(addSteep(steepData, sessionID)),
        addDuration: (sessionID, duration) => dispatch(addDuration(sessionID, duration)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiaryEntry);
