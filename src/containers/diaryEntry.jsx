import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/core";
import {addEntry, addSteep} from "../action/diaryEntryAction";
import {connect} from 'react-redux';
import RadarChart from "../components/radarChart";
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
            height: 500,
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

    const navigation = useNavigation()
    const route = useRoute()
    let teaName = 'red Tiger'
    let startingTime = 20
    let beginX
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    const textInputWidth = useRef(new Animated.Value(0)).current
    const [first, setFirst] = useState(true)
    const [currentTime, setCurrenTime] = useState(parseInt(startingTime))
    const [countdownTimer, setCountdownTimer] = useState(parseInt(startingTime))
    const [startTimer, setStartTimer] = useState(false)
    const [increment, setIncrement] = useState(5);
    const [steepData, setSteepData] = useState({})
    const [sessionID, setSessionID] = useState(() => {
        return teaName + Date.now()
    })
    useEffect(() => {
        props.createEntry({
            teaName: teaName,
            sessionID: sessionID,
            steeps: []
        })
    }, [])
    const endButtonAction = () => {
        setStartTimer(false)
        navigation.navigate("HomeScreen")
    }


    const startInterval = () => {


        setCurrenTime(countdownTimer)


        if (first) {
            setCountdownTimer((t) => t - 1)
        } else {

            props.addSteep(sessionID, steepData)
            setCountdownTimer((t) => t + increment)
        }

        setStartTimer(true)

    }


    useEffect(() => {

            if (startTimer) {
                setTimeout(() => {
                        if (countdownTimer <= 0) {
                            setStartTimer(false)
                            if (first) {
                                setCountdownTimer(parseInt(currentTime))
                                setFirst(false)
                            } else {
                                setCountdownTimer(parseInt(currentTime) + parseInt(increment))
                            }


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
        navigation.navigate('FlavorEntry', {
            setSteepData,
            steepData
        })
    }


    return (


        <View style={styles.container}>
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
                            16:40
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
                        <Text
                            style={{
                                alignSelf: 'center',
                                marginTop: 5,
                                fontSize: 25,
                                color: '#264653',
                                fontWeight: 'bold'
                            }}>
                            500
                        </Text>
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
                            Feng Qing Ye Sheng Hong Cha Wild Tree Purple Black Tea
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
                                      onPress={goToFlavorSelection}
                    >

                        <Text style={{textAlignVertical: 'top', height: '100%', color: 'white', fontSize: 20, textAlign: 'center'}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu tempus est, in convallis nibh. Pellentesque sit amet dictum purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu tempus est, in convallis nibh. Pellentesque sit amet dictum purus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu tempus est, in convallis nibh. Pellentesque sit amet dictum purus.Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </Text>

                    </TouchableOpacity>
                </View>


            </ScrollView>

            <View style={{position: "absolute", bottom:'10%', width: '100%',justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row'}}>

                <FlingGestureHandler
                    direction={Directions.RIGHT | Directions.LEFT}
                    onHandlerStateChange={({nativeEvent}) => {
                        if (nativeEvent.state === State.BEGAN) {
                            beginX = nativeEvent.absoluteX;
                        }
                        if (nativeEvent.state === State.END) {
                            console.log(nativeEvent.absoluteX - beginX)
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
                                <AnimatedTouchable activeOpacity={1} style={{width: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 40]
                                    }), height: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 40]
                                    }),}}>
                                    <Image style={{height: '100%', width: '100%'}} source={require('../img/start.png')}/>
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
                                <AnimatedTouchable activeOpacity={1} style={{width: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 40]
                                    }), height: textInputWidth.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 40]
                                }),}}>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiaryEntry);
