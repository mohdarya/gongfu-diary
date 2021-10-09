import React, {useState} from 'react';
import {Image, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/core";
import {connect} from "react-redux";
import {deductWeight, resetCurrentTeaData, setTeaSessionForDay} from "../action/currentTeaAction";
import {addEntry, addSteep, resetDiaryData} from "../action/diaryEntryAction";

function SettingsPage(props) {


    const navigation = useNavigation();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#264653',


        },
        welcomeText: {
            fontSize: 30,
            color: 'white',
            marginLeft: 20,
            marginBottom: 20,
            marginRight: 15,
            marginTop: 50,
            fontWeight: 'bold'
        }


    });



    return (
        <View style={styles.container}>



            <View style={{height: '100%',}}>

                <View style={{flex: 1}}>


                    <Text style={styles.welcomeText}>
                        Settings
                    </Text>
                    <View style={{height: 500, width: '100%',alignItems: 'center',}}>
                        <TouchableOpacity  activeOpacity={1} style={{height: 50, width: '80%',alignSelf: "center", flexDirection: 'row', alignItems: 'center',}}>
                            <View style={{height: 50, width: 50, backgroundColor: 'white', borderRadius: 10}}>
                                <Image style={{height: '100%', width: '100%'}} source={require('../img/archive.png')}/>

                            </View>
                            <Text style={{marginLeft: 20, fontSize:  20, color: 'white', fontWeight: 'bold',}}>
                                Archived Tea
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity  activeOpacity={1} onPress={()=> {
                                        setConfirmation(!confirmationVisible)
                        }} style={{height: 50, width: '80%', marginTop: 50,alignSelf: "center", flexDirection: 'row', alignItems: 'center',}}>
                            <View style={{height: 50, width: 50, backgroundColor: 'white', borderRadius: 10}}>
                                <Image style={{height: '100%', width: '100%'}} source={require('../img/reset.png')}/>

                            </View>
                            <Text style={{marginLeft: 20, fontSize:  20, color: 'white', fontWeight: 'bold',}}>
                                Reset Data
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>


        </View>
    )
}



export default connect(null)(SettingsPage)

