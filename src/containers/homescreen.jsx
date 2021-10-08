import React, {useEffect, useRef, useState} from 'react';
import {Animated, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
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
            justifyContent: 'space-around',
            flexDirection: 'row',
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

            height: 175,
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

        },
        dateBall: {height: 35, width: 35, backgroundColor: 'white', borderRadius: 100,justifyContent: 'center', alignItems: 'center'},
        dateText:
            {

            },
        dateItem:{height: '100%', width: 40, justifyContent: 'space-around', alignItems: 'center'}


    });


    const[ searchTermValue, setSearchTerm] = useState('')
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    const textInputWidth = useRef(new Animated.Value(0)).current
    const [historyItems, setHistoryItems] = useState([])
    const [data, setData] = useState(props.diary)
    let date = new Date()

    useEffect(() => {
        setData(props.diary)


    }, [props.state])

    useEffect(() => {
        let items = []

        let loopNumber = props.diary.length

        if (loopNumber > 5) {
            loopNumber = 5
        }
        for (let i = 0; i < loopNumber; i++) {
            items.push(<HistoryItem key={`historyItem${i}`} data={props.diary[props.diary.length - 1 - i]}/>)
        }
        setHistoryItems(items)
    }, [props.wholeDiary])
    const renderItems = ({item}) => {



        return (
            <View style={{marginRight: 10, marginLeft: 10,}}>
                <InventoryItem key={`inventoryItem${item[0]}`} turnOff={false} teaID={item[0]}/>
            </View>

        )
    }



    let beginX
    return (
        <View style={styles.container}>

            <View style={styles.topBar}>

                <View style={styles.searchView}>
                    <TextInput
                        onSubmitEditing={(event) => {
                            navigation.navigate("SearchPage", {searchTerm: event.nativeEvent.text, setSearchTerm})
                        }}
                        style={styles.searchTextInput}
                        onChangeText={(text) => {
                            setSearchTerm(text)
                        }}

                        placeholder={'Search For a Tea'}
                        placeholderTextColor={'#585858'}>
                        {searchTermValue}
                    </TextInput>
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
                        <View style={styles.dateItem}>
                                    <Text style={{fontSize: 17}}>
                                        S
                                    </Text>

                            <View style={[styles.dateBall, props.weeklySession[0] === new Date(date.setDate(date.getDate() - date.getDay() + 0)).getDate() ? {backgroundColor: '#E76F51'} :{backgroundColor: 'white'} ]}>
                                    <Text style={{fontSize: 20,}}>
                                        {new Date(date.setDate(date.getDate() - date.getDay() + 0)).getDate()}
                                    </Text>
                            </View>
                        </View>
                            <View style={styles.dateItem}>
                                <Text style={{fontSize: 17}}>
                                    M
                                </Text>

                                <View  style={[styles.dateBall, props.weeklySession[1] === new Date(date.setDate(date.getDate() - date.getDay() + 1)).getDate()? {backgroundColor: '#E76F51'} :{backgroundColor: 'white'} ]}>
                                    <Text style={{fontSize: 20,}}>
                                        {new Date(date.setDate(date.getDate() - date.getDay() + 1)).getDate()}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.dateItem}>
                                <Text style={{fontSize: 17}}>
                                    T
                                </Text>

                                <View  style={[styles.dateBall, props.weeklySession[2] === new Date(date.setDate(date.getDate() - date.getDay() + 2)).getDate()? {backgroundColor: '#E76F51'} :{backgroundColor: 'white'} ]}>
                                    <Text style={{fontSize: 20,}}>
                                        {new Date(date.setDate(date.getDate() - date.getDay() + 2)).getDate()}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.dateItem}>
                                <Text style={{fontSize: 17}}>
                                    W
                                </Text>

                                <View  style={[styles.dateBall, props.weeklySession[3] === new Date(date.setDate(date.getDate() - date.getDay() + 3)).getDate() ? {backgroundColor: '#E76F51'} :{backgroundColor: 'white'} ]}>
                                    <Text style={{fontSize: 20,}}>
                                        {new Date(date.setDate(date.getDate() - date.getDay() + 3)).getDate()}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.dateItem}>
                                <Text style={{fontSize: 17}}>
                                    T
                                </Text>

                                <View  style={[styles.dateBall, props.weeklySession[4] === new Date(date.setDate(date.getDate() - date.getDay() + 4)).getDate() ? {backgroundColor: '#E76F51'} :{backgroundColor: 'white'} ]}>
                                    <Text style={{fontSize: 20,}}>
                                        {new Date(date.setDate(date.getDate() - date.getDay() + 4)).getDate()}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.dateItem}>
                                <Text style={{fontSize: 17}}>
                                    F
                                </Text>

                                <View style={[styles.dateBall,props.weeklySession[5] === new Date(date.setDate(date.getDate() - date.getDay() + 5)).getDate()? {backgroundColor: '#E76F51'} :{backgroundColor: 'white'} ]}>
                                    <Text style={{fontSize: 20,}}>
                                        {new Date(date.setDate(date.getDate() - date.getDay() + 5)).getDate()}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.dateItem}>
                                <Text style={{fontSize: 17}}>
                                    S
                                </Text>

                                <View  style={[styles.dateBall, props.weeklySession[6] === new Date(date.setDate(date.getDate() - date.getDay() + 6)).getDate() ? {backgroundColor: '#E76F51'} :{backgroundColor: 'white'} ]}>
                                    <Text style={{fontSize: 20,}}>
                                        {new Date(date.setDate(date.getDate() - date.getDay() + 6)).getDate()}
                                    </Text>
                                </View>
                            </View>

                        </View>

                    </View>
                    <View style={styles.inventoryContainer}>
                        <View style={styles.inventoryViewTextView}>
                            <Text style={{fontSize: 34, color: 'white', marginLeft: 10, width: '45%'}}>
                                Inventory
                            </Text>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('TeaInventory', {searchTerm: null})
                            }} activeOpacity={1} style={{alignSelf: 'flex-end', width: '50%',}}>
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
                            <FlatList
                                data={Object.entries(props.teaAvailable).filter(([key, value]) => value.status === 'active'
                                )} style={{height: '100%',}} renderItem={renderItems}
                                horizontal={true}


                                keyExtractor={item => item[0]}/>
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
                            {historyItems}


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
                            <AnimatedTouchable activeOpacity={1} onPress={() => {
                                navigation.navigate("TimerTeaName")
                            }} style={{
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
                    <TouchableOpacity activeOpacity={1} onPress={() => {
                        navigation.navigate('TeaInventory', {searchTerm: null})
                    }} style={{width: 35, height: 32}}>
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
    const {Diary, TeaAvailable} = state;

    return {
        weeklySession : TeaAvailable.weeklySession,
        wholeDiary: Diary,
        diary: Diary.diaryEntry,
        teaAvailable: TeaAvailable.teaAvailable
    };
};
export default connect(mapStateToProps)(HomeScreen)

