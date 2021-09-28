import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/core";
import {connect} from "react-redux";
import InventoryItem from "../components/inventoryItem";
import HistoryItem from "../components/historyItem";

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
            width: 110,
            backgroundColor: '#E9C46A',
            alignItems: "center",
            justifyContent: 'center',
            alignSelf: "flex-end",
            borderTopLeftRadius: 25,
            borderBottomLeftRadius: 25,
        }


    });


    const [searchValue, setSearchValue] = useState('')
    const searchAnimation = useRef(new Animated.Value(0)).current
    const settingVisibility = useRef(new Animated.Value(0)).current
    const settingWidth = useRef(new Animated.Value(0)).current

    const textInputWidth = useRef(new Animated.Value(0)).current

    const [data, setData] = useState(props.diary)

    useEffect(() => {
        setData(props.diary)

    }, [props.state])


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
                <View style={styles.sessionActionMenu}>
                    <TouchableOpacity activeOpacity={1} style={{width: 67, height: 67}}>
                        <Image style={{height: '100%', width: '100%'}} source={require('../img/add.png')}/>
                    </TouchableOpacity>
                </View>
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

