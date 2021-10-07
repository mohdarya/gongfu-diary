import React, {useState} from 'react';
import {Image, Keyboard, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/core";




function TeaDetailPage(props) {



    const navigation = useNavigation()
    const
        styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#264653',
                justifyContent: 'flex-start',


            },




       topPart: {
                height: 170,
                width: '100%',


            },
            topPartBar: {
                height: 170,
                width: '100%',

                alignItems: 'center',
                backgroundColor: '#2A9D8F',
                borderBottomLeftRadius: 93,
                borderBottomRightRadius: 93,

            },
            infoPart: {
                marginTop: '20%',
                marginRight: '10%',
                marginLeft: '10%',
            },


        })




    return (



            <View style={styles.container}>
                <View style={styles.topPart}>
                    <View style={styles.topPartBar}>

                    </View>
                    <View style={{ top: '70%',left: '15%',width: '70%', height: 110, backgroundColor: '#E9C46A', borderRadius:30, position: "absolute", alignContent: 'center', justifyContent: 'center'}}>
                        <Text style={{alignSelf: 'center', fontSize: 25, color: '#264653', fontWeight: 'bold'}}>
                            Enter Starting Time
                        </Text>
                    </View>

                </View>
                <View style={styles.infoPart}>


                </View>
            </View>


    )
}

export default TeaDetailPage
