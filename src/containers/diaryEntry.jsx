import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/core";
import {addEntry, addSteep} from "../action/diaryEntryAction";
import {connect} from 'react-redux';
import RadarChart from "../components/radarChart";

function DiaryEntry(props) {


    const navigation = useNavigation()
    const route = useRoute()


    let data = [1,
       2,
        3,
        4,
        5,
        6,
        7,
        8]
    const {teaName, startingTime} = route.params
    const [first, setFirst] = useState(true)
    const [currentTime, setCurrenTime] = useState(parseInt(startingTime))
    const [countdownTimer, setCountdownTimer] = useState(parseInt(startingTime))
    const [startTimer, setStartTimer] = useState(false)
    const [increment, setIncrement] = useState(5);
    const [steepData, setSteepData] = useState([])
    const [sessionID, setSessionID] = useState(() => {
        return teaName + Date.now()
    })
    useEffect(() => {

        console.log('called')


        props.createEntry({
            teaName: teaName,
            sessionID: sessionID,
            steeps: []
        })
    }, [])
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',

        },
        topBar: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flex: 1,
            margin: 10,
            marginTop: 0,


        },
        timerView: {
            alignItems: 'center',
            marginBottom: 20,
            marginLeft: 10,
            marginRight: 10,
            flexDirection: 'row',
            justifyContent: 'space-around',
            flex: 2,
        },
        countdownTimer: {

            backgroundColor: 'grey',
            borderRadius: 15,
            height: 160,
            width: 160,
            alignItems: 'center',
            justifyContent: 'center',
        },
        countdownTimerText: {
            textAlign: 'center',
            fontSize: 50,
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
            flexDirection: 'column',
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            justifyContent: 'center',
            alignContent: 'center',
            height: 90,
            width: 150,
        },
        incrementTag: {
            fontSize: 17,
            alignSelf: 'center',
        }, incrementNumber: {
            alignSelf: 'center',
            fontSize: 30,
            color: 'black',
        }, teaNameView: {
            height: 60,
            flexDirection: 'column',
            marginBottom: 20,
            marginTop: 10,
            marginLeft: 20,
            marginRight: 20,
            backgroundColor: 'grey',
            borderRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            justifyContent: 'space-between',
        }, teaFlavorView: {
            backgroundColor: 'grey',
            flex: 5,
            marginLeft: 20,
            marginRight: 20,
            borderRadius: 20,
            flexDirection: 'column',
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
        }, doneButtonView: {
            flex: 2,
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
            height: 50,
            textAlign: 'center',
            textAlignVertical: 'top',
            fontSize: 15,
            color: 'black',
        },
        teaNameTextView: {
            width: '50%',
            justifyContent: 'center',
            alignSelf: 'center',
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
            justifyContent: 'center',
            height: 60,
        },


    });


    const endButtonAction = () => {
        setStartTimer(false)
        navigation.navigate("HomeScreen")
    }


    const startInterval = () => {


        console.log(props.Diary)
        props.addSteep(sessionID, steepData)
        setSteepData({})
        setCurrenTime(countdownTimer)


        if (first) {
            setCountdownTimer((t) => t - 1)
        } else {


            setCountdownTimer((t) => t + increment)
        }

        setStartTimer(true)

    }


    useEffect(() => {

            if (startTimer) {
                setTimeout(() => {
                        if (countdownTimer <= 0) {
                            setStartTimer(false)
                            if(first)
                            {
                                setCountdownTimer(parseInt(currentTime))
                                setFirst(false)
                            }else {
                                setCountdownTimer(parseInt(currentTime) + parseInt(increment))}


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
                <View style={styles.teaNameView}>
                    <View>
                        <Text style={styles.teaNameTag}>
                            Tea
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.teaNameTextView}>
                        <Text style={styles.teaName}
                        >
                            {teaName}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.teaFlavorView}
                                  activeOpacity={1}

                >

                    <View>
                        <Text style={styles.teaNameTag}>
                            Flavor
                        </Text>
                    </View>
                    <View style={styles.graphView}>

                    <RadarChart/>
                    </View>
                </TouchableOpacity>
                <View style={styles.doneButtonView}>
                    <TouchableOpacity style={styles.doneButton} onPress={startInterval} activeOpacity={1}>
                        <Text style={styles.doneButtonText}>
                            Start
                        </Text>
                    </TouchableOpacity>
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
