import React, {useEffect, useRef, useState} from 'react';
import {Animated, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {getFocusedRouteNameFromRoute, useNavigation, useRoute} from "@react-navigation/core";
import {connect} from "react-redux";
import InventoryItem from "../components/inventoryItem";
import HistoryItem from "../components/historyItem";
import {Directions, FlingGestureHandler, State} from 'react-native-gesture-handler';

function SettingsPage(props) {


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
            fontSize: 30,
            color: 'white',
            marginLeft: 20,
            marginBottom: 20,
            marginRight: 15,
            marginTop: 50,
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
            justifyContent: 'flex-end',
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












    return (
        <View style={styles.container}>



            <View style={{height:'100%',}}>

                <View style={{flex: 1}}>


                    <Text style={styles.welcomeText}>
                        Settings
                    </Text>


                </View>
            </View>


        </View>
    )
}

const mapStateToProps = (state, ownProps) => {
    const {Diary, TeaAvailable} = state;

    return {
        wholeDiary: Diary,
        diary: Diary.diaryEntry,
        teaAvailable: TeaAvailable.teaAvailable
    };
};
export default connect(mapStateToProps)(SettingsPage)

