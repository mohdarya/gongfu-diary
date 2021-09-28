import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/core";
import {addEntry, addSteep} from "../action/diaryEntryAction";
import {connect} from 'react-redux';
import RadarChart from "../components/radarChart";

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

            top: '130%',
            height: '250%',
            width: '90%',

        },
        steepTag: {
            alignSelf: 'center',
            borderRadius: 15,
            height: '10%',
            marginBottom: '10%',
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
        },


    });

    const navigation = useNavigation()
    const route = useRoute()
    let teaName = 'red Tiger'
    let startingTime = 20
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
            <ScrollView style={{flex: 1}} contentContainerStyle={{height: 1250}}>
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


                </View>
            </ScrollView>
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
