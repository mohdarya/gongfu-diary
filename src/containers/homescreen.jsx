import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/core";
import {connect} from "react-redux";
import InventoryItem from "../components/inventoryItem";
import HistoryItem from "../components/historyItem";
import {Directions, FlingGestureHandler, State} from 'react-native-gesture-handler';

function HomeScreen(props) {


    const navigation = useNavigation();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#264653',


        },
        topBar: {
            top: '5%',
            position: 'absolute',
            zIndex: 2,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            marginLeft: 15,
            marginRight: 15,


        },


        buttonText: {

            textAlign: 'center',

            fontSize: 45,
        },

        searchView: {
            alignSelf: 'center',
            backgroundColor: '#E9C46A',
            flexDirection: 'row',


            borderRadius: 15,
            width: '98%',
            height: 42

        },
        settingView: {
            height: '45%',

        },
        searchTextInput: {
            marginLeft: 15,
            color: 'black'
        },
        welcomeText: {
            fontSize: 44,
            color: 'white',
            marginLeft: 20,
            marginBottom: 20,
            marginRight: 15,
            marginTop: '25%',
            fontWeight: 'bold'
        },
        weekView: {
            flex: 1,

            marginBottom: 50,
            marginLeft: 15,
            marginRight: 15,

        },
        weekBar: {
            alignSelf: 'center',
            borderRadius: 16,
            backgroundColor: '#2A9D8F',
            width: '98%',
            height: 90,
        }, inventoryContainer: {
            flex: 1.8,
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 50,


        },
        inventoryView: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 23,

            height: 125,
        },
        inventoryViewTextView: {
            width: '100%',
            height: 50,
            flexDirection: 'row',
            alignItems: 'center'
        },
        HistoryViewTextView: {
            width: '100%',
            height: 50,
            flexDirection: 'row',
            alignItems: 'center'
        },
        historyContainer: {
            flex: 5,
            marginLeft: 15,
            marginRight: 15,

        },
        historyView: {
            marginLeft: 15,
            marginRight: 15,
        },
        navigationBar: {


            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            borderTopRightRadius: 34,
            height: 61, width: 331,
            backgroundColor: '#E9C46A'
        },
        navigationGroup: {
            position: 'absolute',
            justifyContent: 'space-between',
            bottom: 0,
            width: '100%',
            height: '20%'
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



    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    const textInputWidth = useRef(new Animated.Value(0)).current

    const [data, setData] = useState(props.diary)


    useEffect(() => {
        setData(props.diary)

    }, [props.state])


    let beginX
    return (
        <View style={styles.container}>

            <View style={styles.topBar}>

                <View style={styles.searchView}>
                    <TextInput
                        style={styles.searchTextInput}
                        placeholder={'Search For a Tea'}
                        placeholderTextColor={'#585858'}/>
                </View>


            </View>

            <View style={{flex: 7,}}>

                <ScrollView style={{flex: 1}} contentContainerStyle={{height: 1250}}>


                    <Text style={styles.welcomeText}>
                        Welcome
                    </Text>
                    <View style={styles.weekView}>
                        <Text style={{fontSize: 34, color: 'white', marginLeft: 10}}>
                            Week
                        </Text>

                        <View style={styles.weekBar}>

                        </View>

                    </View>
                    <View style={styles.inventoryContainer}>
                        <View style={styles.inventoryViewTextView}>
                            <Text style={{fontSize: 34, color: 'white', marginLeft: 10, width: '45%'}}>
                                Inventory
                            </Text>
                            <TouchableOpacity style={{alignSelf: 'flex-end', width: '50%',}}>
                                <Text style={{
                                    fontSize: 18,
                                    color: 'white',
                                    textAlign: 'right',
                                    textAlignVertical: 'center'
                                }}>
                                    More
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inventoryView}>
                            <InventoryItem/>
                            <InventoryItem/>
                            <InventoryItem/>
                        </View>
                    </View>
                    <View style={styles.historyContainer}>
                        <View style={styles.HistoryViewTextView}>
                            <Text style={{fontSize: 34, color: 'white', marginLeft: 10, width: '45%'}}>
                                History
                            </Text>
                            <TouchableOpacity style={{alignSelf: 'flex-end', width: '50%',}}>
                                <Text style={{
                                    fontSize: 18,
                                    color: 'white',
                                    textAlign: 'right',
                                    textAlignVertical: 'center'
                                }}>
                                    More
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.historyView}>
                            <HistoryItem/>
                            <HistoryItem/>
                            <HistoryItem/>
                            <HistoryItem/>
                            <HistoryItem/>


                        </View>
                    </View>

                </ScrollView>
            </View>

            <View style={styles.navigationGroup}>

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
                                   source={require('../img/add.png')}/>

                        </Animated.View>
                        <Animated.View
                            style={[

                                {
                                    height: 66,
                                    width: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 300]
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
                                    outputRange: [0, 91]
                                }),
                                borderRadius: 15,
                                alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }} onPress={() => {
                                navigation.navigate("TeaName")
                            }}>
                                <Text>
                                    Diary
                                </Text></AnimatedTouchable>
                            <AnimatedTouchable activeOpacity={1} style={{
                                backgroundColor: '#3C91E6',
                                height: 48,
                                width: textInputWidth.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 91]
                                }),
                                borderRadius: 15,
                                alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text>
                                    Timer
                                </Text></AnimatedTouchable>

                        </Animated.View>

                    </View>
                </FlingGestureHandler>
                <View style={styles.navigationBar}>
                    <TouchableOpacity activeOpacity={1} style={{width: 35, height: 32}}>
                        <Image style={{height: '100%', width: '100%'}} source={require('../img/settings.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={{width: 35, height: 32}}>
                        <Image style={{height: '100%', width: '100%'}} source={require('../img/teaStorage.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={{width: 35, height: 32}}>
                        <Image style={{height: '100%', width: '100%'}} source={require('../img/shuffle.png')}/>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

const mapStateToProps = (state, ownProps) => {
    const {Diary} = state;

    return {
        diary: Diary.diaryEntry,
        state
    };
};
export default connect(mapStateToProps)(HomeScreen)

