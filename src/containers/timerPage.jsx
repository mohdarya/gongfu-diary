import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
    Animated, AppState, BackHandler,

    Image,
    Modal,

    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity, Vibration,
    View
} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/core";
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import {Directions, FlingGestureHandler, State} from "react-native-gesture-handler";
import Sound from "react-native-sound";

function TimerPage(props) {


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
    const [ timerEndingSound, setTimerSound] = useState(new Sound('phone_ring_bell.wav', Sound.MAIN_BUNDLE,(error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
    }))
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    const textInputWidth = useRef(new Animated.Value(0)).current
    const AnimatedImage = Animated.createAnimatedComponent(Image);
    const iconWidth = useRef(new Animated.Value(0)).current
    const navigation = useNavigation()
    const route = useRoute()
    const {startingTime} = route.params

    const [currentTime, setCurrenTime] = useState(parseInt(startingTime))

    const [startTimer, setStartTimer] = useState(false)
    const[countDownTimerState, setCountdownState] = useState(-1)
    const [increment, setIncrement] = useState(5);
    const [openNavigation, setOpenNavigation] = useState(false)
    const [timerViewVisibility, setTimerViewVisibility] = useState(false)
    const [buttonText, setButtonText] = useState('Stop')



    const endingTime = useRef(0);
    const countdownTimer = useRef(parseInt(startingTime))
    const first = useRef(true)
    const firstCounterRun = useRef(true)
    const endButtonAction = () => {


        setStartTimer(false)
        navigation.navigate("HomeScreen")
    }

    function handleBackButtonClick() {
        if(navigation.canGoBack())
        {

            setStartTimer(false)
            navigation.goBack()
        }
        else{

        }

        return true;
    }

    const ONE_SECOND_IN_MS = 300;
    const PATTERN = [
        1 * ONE_SECOND_IN_MS,
        2 * ONE_SECOND_IN_MS,
        3 * ONE_SECOND_IN_MS
    ];
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);
    useEffect(() => {
        if (!startTimer) {


            if(!first.current) {
               if(firstCounterRun.current)
               {

                   countdownTimer.current =(parseInt(currentTime))
                    firstCounterRun.current = false

               }
               else {
                   countdownTimer.current =(parseInt(currentTime) + parseInt(increment))
                   setCurrenTime(parseInt(currentTime) + parseInt(increment))
               }
           }

            setButtonText('Close')
            endingTime.current = 0
            deactivateKeepAwake();
        }


    }, [startTimer])

    useEffect(() => {

        if (openNavigation) {
            Animated.timing(textInputWidth, {
                toValue: 1,
                duration: 100,
                useNativeDriver: false,
            }).start();
            Animated.timing(iconWidth, {
                toValue: 1,
                duration: 1,
                useNativeDriver: false,
            }).start();

        } else if (!openNavigation) {
            Animated.timing(textInputWidth, {
                toValue: 0,
                duration: 100,
                useNativeDriver: false,
            }).start();
            Animated.timing(iconWidth, {
                toValue: 0,
                duration: 1,
                useNativeDriver: false,
            }).start();
        }
    }, [openNavigation])
    const startInterval = () => {




        activateKeepAwake();


        if (!first.current ){
            setStartTimer(true)
            endingTime.current = new Date().getTime() +   1000 * parseInt(countdownTimer.current + increment)
            setCountdownState(countdownTimer.current + increment)


        }
        else {
            setStartTimer(true)
            first.current =(false)
            endingTime.current = new Date().getTime() +   1000 * parseInt(startingTime)
            setCountdownState(countdownTimer.current)
        }
















    }


    useEffect(() => {


            if (startTimer && !first.current) {

                setTimeout(() => {
                        if (countDownTimerState <= 0) {
                            setStartTimer(false)
                            timerEndingSound.play((success) => {
                                if (!success) {
                                    console.log('Sound did not play')
                                }
                            })


                        } else {


                            setCountdownState(Math.ceil(( endingTime.current - new Date().getTime()) / 1000) > 0 ? Math.ceil(( endingTime.current - new Date().getTime()) / 1000) : 0)

                        }
                    }, 1000
                )
            }

        }


        ,
        [countDownTimerState]
    )

    const clockiFy = (time, origin) => {
        let mins = Math.floor((time / 60))
        let seconds = Math.floor(time % 60)

        let displayMins = mins < 10 ? `${mins}` : mins
        let displaySecs = seconds < 10 ? `0${seconds}` : seconds

        if (displayMins === '0' && origin === 'currentTime') {
            return displaySecs
        } else {
            return (
                displayMins + ':'+ displaySecs
            )
        }

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
                            height: 300,
                            width: 300,
                            justifyContent: 'center',

                        }}>
                            <Text style={{alignSelf: 'center', fontWeight: 'bold', color: 'white', fontSize: 80}}>
                                {clockiFy( countDownTimerState , 'countdownTimer')}
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

                <View style={styles.topPart}>
                    <View style={styles.topPartBar}>

                    </View>
                    <View style={{
                        top: '70%',
                        left: '10%',
                        width: '80%',
                        height: 400,
                        backgroundColor: '#E9C46A',
                        borderRadius: 30,
                        position: "absolute",
                        alignContent: 'center',
                        justifyContent: 'space-around'
                    }}>
                        <TouchableOpacity activeOpacity={1} onPress={()=> {
                            setButtonText('Stop')

                            setTimerViewVisibility(!timerViewVisibility)
                            startInterval()
                        }}>
                        <Text style={{alignSelf: 'center', fontSize: 70, color: '#264653', fontWeight: 'bold'}}>
                            {clockiFy(currentTime, 'currentTime')}
                        </Text>
                        <Text style={{alignSelf: 'center', fontSize: 40, color: '#264653'}}>
                            Timer
                        </Text>
                        </TouchableOpacity>
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
                                fontSize: 45,
                                color: '#264653',
                                fontWeight: 'bold'
                            }}
                            value={increment.toString()}>

                        </TextInput>
                        <Text style={{alignSelf: 'center', fontSize: 30, marginBottom: 20, color: '#264653'}}>
                            Increment
                        </Text>




                    </View>
                </View>





            <View style={{
                position: "absolute",
                bottom: '10%',
                width: '100%',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                flexDirection: 'row'
            }}>

                <TouchableOpacity activeOpacity={1} onPress={() => {setOpenNavigation(!openNavigation)}}>
                    <View style={styles.sessionActionMenu}>
                        <Animated.View style={{
                            height: 66,


                            backgroundColor: '#E9C46A', borderTopLeftRadius: 25,
                            borderBottomLeftRadius: 25,
                            flexDirection: 'row',
                            width: textInputWidth.interpolate({
                                inputRange: [0, 1],
                                outputRange: [65, 67]
                            }),

                        }}>


                            <AnimatedImage style={{
                                width: iconWidth.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 67]
                                }), height: 67, alignSelf: 'center'
                            }}
                                           source={require('../img/push.png')}/>




                            <AnimatedImage style={{
                                height: 67, width: iconWidth.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [60, 0]
                                }), alignSelf: 'center'
                            }}
                                           source={require('../img/pull.png')}/>

                        </Animated.View>
                        <Animated.View
                            style={[

                                {
                                    height: 66,
                                    width: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 230]
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
                </TouchableOpacity>

            </View>
        </View>


    )
}



export default TimerPage;
