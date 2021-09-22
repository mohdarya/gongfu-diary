import React from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import {useRoute} from "@react-navigation/core";
import FlavorDiaryItem from "../components/flavorDiaryItem";


function FlavorDiary(props) {


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',

        },
        doneButtonView: {
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
        },
        doneButton: {
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
        }, flavorList: {
            flex: 8,

        },


    })


    const route = useRoute();
    const passedData = route.params.steepData;


    const renderData = ({item}) => {

        return (
            <FlavorDiaryItem noteIndex={item} data={passedData[item]}/>
        )
    }
    return (

        <View style={styles.container}>
            <View style={styles.flavorList}>
                <FlatList data={Object.keys(passedData)} renderItem={renderData} keyExtractor={item => item}/>
            </View>


        </View>


    )
}

export default FlavorDiary

