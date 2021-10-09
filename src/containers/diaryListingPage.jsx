import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/core";
import {addEntry, addSteep, editEntryName, editEntrySteep, editNote, removeEntry} from "../action/diaryEntryAction";
import {connect} from 'react-redux';
import RadarChart from "../components/radarChart";
import {Directions, FlingGestureHandler, State} from "react-native-gesture-handler";
import Slider from "@react-native-community/slider";
import SteepSelector from "../components/steepSelector";
import {addWeight, deductWeight} from "../action/currentTeaAction";

function DiaryListingPage(props) {


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
            height: 200,
            width: '100%',

            alignItems: 'center',
            backgroundColor: '#2A9D8F',
            borderBottomLeftRadius: 93,
            borderBottomRightRadius: 93,

        },
        steepView: {
            alignSelf: 'center',


            top: '13%',
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
            marginTop: 20,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,

            borderRadius: 20,
        }, notesView: {

            alignSelf: 'center',


            top: '14%',
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
            flexDirection: 'row',
            borderRadius: 25,

            alignItems: "center",
            justifyContent: 'center',
            alignSelf: "flex-end",

        },
        sliderView: {
            height: 'auto',
            width: '100%',
            marginTop: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,

        }, valueTextView: {
            height: 'auto',
            width: '100%',
            alignItems: 'center',
        },
        valueText: {
            top: '40%',
            fontSize: 30,
            color: 'white'

        },
        steepSelector: {
            width: '100%',
            height: 80,

            borderRadius: 10,
            backgroundColor: 'white',

            marginTop: 30,


        },


    });

    const navigation = useNavigation()
    const route = useRoute()

    let beginX

    const [editBackground, setEditBackground] = useState({  backgroundColor: '#E9C46A',})
    const [data, setData] = useState(route.params.data)
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    const textInputWidth = useRef(new Animated.Value(0)).current
    const [steepData, setSteepData] = useState(route.params.data.steeps)
    const [editActive, setEdit] = useState(false)
    const [note, setNote] = useState(route.params.data.note)
    const [teaName, setName] = useState(data.teaName)
    const [currentSteepIndex, setSteepIndex] = useState(0)
    const [dataToDisplay, setDataToDisplay] = useState(() => {
        if (steepData[0] === undefined) {
            return {}
        } else {
            return steepData[0][0]
        }
    })



    let backgroundColour

    if(props.teaAvailable[data.teaID].type === 'Hei cha')
    {
        backgroundColour = props.colors.HeiCha
    }
    else if(props.teaAvailable[data.teaID].type === 'Raw Pu-erh')
    { backgroundColour = props.colors.RawPuerh}
    else if(props.teaAvailable[data.teaID].type === 'Ripe Pu-erh')
    {
        backgroundColour = props.colors.RipePuerh
    }
    else{
        backgroundColour = props.colors[props.teaAvailable[data.teaID].type]
    }




    const setNoteMiddleFunc = (note) => {
        setNote(note)
        props.editNote(data.sessionID, note)
    }
    const goToFlavorSelection = () => {

        if(editActive) {
            navigation.navigate('FlavorEntry', {
                setSteepData: changeSteepData,
                steepData: dataToDisplay
            })
        }
        else {
            navigation.navigate('FlavorDiaryEntry', {
                steepData: dataToDisplay
            })
        }
    }
    const deleteTea = () => {
        props.deleteEntry(route.params.data.sessionID)
        navigation.goBack()
    }
    const steepChanged = (index) => {
        setSteepIndex(index - 1)
        setDataToDisplay(steepData[index - 1][0])
    }
    const setTeaName = (teaNameAndID) => {

    props.deductWeight(teaNameAndID.teaID, data.weight)
        props.addWeight(data.teaID, data.weight)
        props.editName(data.sessionID, {...teaNameAndID})

            setData({...data, teaID: teaNameAndID.teaID})


    }
    const editTeaName = () => {

        if(editActive)
        {
            navigation.navigate('TeaSelection', {
                setTeaName
            })
            }

    }


    const changeSteepData = (newSteepData) =>{



        props.editSteep(route.params.data.sessionID,currentSteepIndex, newSteepData)
        setDataToDisplay(newSteepData)
    }
    const editSelected = () => {
        setEdit(!editActive)

    }


    useEffect(() => {


        if(editActive){
            setEditBackground({ backgroundColor: '#E53B3B'})
        }
        else {


            setEditBackground({ backgroundColor: '#E9C46A'})
        }
        Animated.timing(textInputWidth, {
            toValue: 0,
            duration: 150,
            useNativeDriver: false,
        }).start();
    }, [editActive])


    const gotToNoteSection = () => {

        if(editActive){

                navigation.navigate('NoteEntry', {
                    note, setNote: setNoteMiddleFunc
                })

        }
    }

    const clockiFy = (durationTime) => {



        durationTime = durationTime / 1000
        let mins = Math.floor((durationTime / 60))
        let seconds = Math.floor(durationTime % 60)

        let displayMins = mins < 10 ? `0${mins}` : mins
        let displaySecs = seconds < 10 ? `0${seconds}` : seconds

        return {
            displayMins,
            displaySecs
        }

    }
    return (


        <View style={styles.container}>
            <ScrollView style={{flex: 1}} contentContainerStyle={{height: 1580}}>
                <View style={styles.topPart}>
                    <View style={styles.topPartBar}>
                        <View style={{
                            top: 20,
                            width: 80,
                            height: 80,
                            backgroundColor: backgroundColour,
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity activeOpacity={1} style={{width: 50, height: 50, }}>
                                <Image style={{height: '100%', width: '100%'}} source={require('../img/teaLeafWhite.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={editTeaName} activeOpacity={1} style={{
                        top: '80%',
                        left: '20%',
                        width: '60%',
                        height: 130,
                        backgroundColor: '#E9C46A',
                        borderRadius: 40,
                        position: "absolute",
                        alignContent: 'center',
                        justifyContent: 'space-around'
                    }}>

                        <Text style={{
                            alignSelf: 'center',
                            marginTop: 15,
                            fontSize: 15,
                            color: '#264653',
                            width: '90%',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>
                            {props.teaAvailable[data.teaID].teaName}
                        </Text>

                        <Text style={{
                            alignSelf: 'center',
                            marginTop: 15,
                            fontSize: 15,
                            color: '#264653',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>
                            {route.params.date}
                        </Text>

                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', height: 'auto', width: '90%', top: '35%', marginRight: 20, marginLeft: 20,justifyContent: 'space-around'}}>

                    <View style={{height: 100, width: 70, backgroundColor: '#2A9D8F', borderRadius: 25, justifyContent: 'center'}}>

                        <Image style={{width: 40, height: 40, alignSelf: 'center'}}
                               source={require('../img/temperature.png')}/>
                        <Text style={{textAlign: 'center', marginTop: 7}}>
                            {data.temp + '°C'}
                        </Text>
                    </View>
                    <View style={{height: 100, width: 70, backgroundColor: '#2A9D8F', borderRadius: 25, justifyContent: 'center'}}>

                        <Image style={{width: 40, height: 40, alignSelf: 'center'}}
                               source={require('../img/water.png')}/>
                        <Text style={{textAlign: 'center', marginTop: 7}}>
                            {data.waterVolume + 'ml'}
                        </Text>
                    </View>
                    <View style={{height: 100, width: 70, backgroundColor: '#2A9D8F', borderRadius: 25, justifyContent: 'center'}}>

                        <Image style={{width: 40, height: 40, alignSelf: 'center'}}
                               source={require('../img/clock.png')}/>
                        <Text style={{textAlign: 'center', marginTop: 7}}>
                            {clockiFy(route.params.data.duration).displayMins + ':' + clockiFy(route.params.data.duration).displaySecs}
                        </Text>
                    </View>
                    <View style={{height: 100, width: 70, backgroundColor: '#2A9D8F', borderRadius: 25, justifyContent: 'center'}}>

                        <Image style={{width: 40, height: 40, alignSelf: 'center'}}
                               source={require('../img/scale.png')}/>
                        <Text style={{textAlign: 'center', marginTop: 7}}>
                            {data.weight + 'G'}
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

                        <RadarChart steeps={{...dataToDisplay}}/>

                    </TouchableOpacity>
                    <View style={styles.steepSelector}>
                        <SteepSelector maxValue={steepData.length} processChange={steepChanged}/>
                    </View>
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
                                      onPress={gotToNoteSection}
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
                        <Animated.View style={[{
                            height: 66,
                            justifyContent: 'center',
                            borderTopLeftRadius: 25,
                            borderBottomLeftRadius: 25,
                            width: textInputWidth.interpolate({
                                inputRange: [0, 1],
                                outputRange: [65, 67]
                            }),

                        }, editBackground]}>


                            <Image style={{width: 50, height: 50, alignSelf: 'center'}}
                                   source={require('../img/edit.png')}/>

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
                                <AnimatedTouchable activeOpacity={1} onPress={()=> {
                                    setEdit(!editActive)
                                }} style={{
                                    width: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 40]
                                    }), height: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 40]
                                    }),
                                }}>
                                    <Image style={{height: '100%', width: '100%'}} source={require('../img/edit.png')}/>
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
                                <AnimatedTouchable activeOpacity={1} onPress={deleteTea} style={{
                                    width: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 40]
                                    }), height: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 40]
                                    }),
                                }}>
                                    <Image style={{height: '100%', width: '100%'}}
                                           source={require('../img/delete.png')}/>
                                </AnimatedTouchable></AnimatedTouchable>

                        </Animated.View>

                    </View>
                </FlingGestureHandler>

            </View>
        </View>


    )
}

const mapStateToProps = (state, ownProps) => {
    const {Diary, TeaAvailable} = state;

    return {
        colors: TeaAvailable.teaColour,
        teaAvailable: TeaAvailable.teaAvailable,
        Diary: Diary.diaryEntry
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {

    return {

        editName: (sessionid, newName) => dispatch(editEntryName(sessionid, newName)),
        editNote: (sessionid, newNote) => dispatch(editNote(sessionid, newNote)),
        editSteep: (sessionid, steepIndex, newSteep) => dispatch(editEntrySteep(sessionid,steepIndex,newSteep)),
        deleteEntry: (sessionid) => dispatch(removeEntry(sessionid)),
        deductWeight: (teaId, newData) => dispatch(deductWeight(teaId, newData)),
        addWeight: (teaId, newData) => dispatch(addWeight(teaId, newData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiaryListingPage);
