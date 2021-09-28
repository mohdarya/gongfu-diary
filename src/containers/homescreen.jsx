import React, {useEffect, useRef, useState} from 'react';
import {Animated, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/core";
import {connect} from "react-redux";

function HomeScreen(props) {


    const navigation = useNavigation();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#264653',


        },
        topBar: {
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
            fontWeight: 'bold'
        },
        weekView: {
            flex: 2,

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
            flex: 3,
            marginLeft: 15,
            marginRight: 15,


        },
        inventoryView: {
            marginTop: 23,

                height: 125,
        },
        inventoryViewTextView: {
            width: '100%',
            height: '15%',
            flexDirection: 'row',
            alignItems: 'center'
        },
        historyContainer: {
            flex: 3,
            marginLeft: 15,
            marginRight: 15,

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

            <View style={{flex: 7}}>
            <ScrollView  style={{flex: 1}} contentContainerStyle={{height: 900}}>

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
                    <TouchableOpacity style={{alignSelf: 'flex-end', width: '50%', }}>
                        <Text style={{fontSize: 18 , color: 'white',textAlign: 'right', textAlignVertical: 'center'}}>
                            More
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inventoryView}>

                </View>
            </View>
                <View style={styles.historyContainer}>
                    <View style={styles.inventoryViewTextView}>
                        <Text style={{fontSize: 34, color: 'white', marginLeft: 10, width: '45%'}}>
                            History
                        </Text>
                        <TouchableOpacity style={{alignSelf: 'flex-end', width: '50%', }}>
                            <Text style={{fontSize: 18 , color: 'white',textAlign: 'right', textAlignVertical: 'center'}}>
                                More
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
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

