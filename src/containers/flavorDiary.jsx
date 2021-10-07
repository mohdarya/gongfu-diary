import React from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useRoute} from "@react-navigation/core";
import FlavorDiaryItem from "../components/flavorDiaryItem";


function FlavorDiary(props) {


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#264653',

        },
      flavorList: {
            height: '70%',
          top: '5%',


        },
        topPart: {
            height: 170,
            width: '100%',


        },
        topPartBar: {
            height: 150,
            width: '100%',

            alignItems: 'center',
            backgroundColor: '#2A9D8F',
            borderBottomLeftRadius: 93,
            borderBottomRightRadius: 93,

        },


    })


    const route = useRoute();
    const passedData = route.params.steepData === null ? {} : route.params.steepData


    const renderData = ({item}) => {

        return (
            <FlavorDiaryItem noteIndex={item} data={passedData[item]}/>
        )
    }
    return (

        <View style={styles.container}>
            <View style={styles.topPart}>
                <View style={styles.topPartBar}>

                </View>
                <View style={{ top: '50%',left: '15%',width: '70%', height: 110, backgroundColor: '#E9C46A', borderRadius:100, position: "absolute", alignContent: 'center', justifyContent: 'center'}}>
                    <Text style={{alignSelf: 'center', fontSize: 25, color: '#264653', fontWeight: 'bold'}}>
                        Flavor Details
                    </Text>
                </View>
            </View>
            <View style={styles.flavorList}>
                <FlatList data={Object.keys(passedData)} renderItem={renderData} keyExtractor={item => item}/>
            </View>



        </View>


    )
}

export default FlavorDiary

