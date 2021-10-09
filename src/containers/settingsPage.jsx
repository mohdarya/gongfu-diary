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
        }, doneButton: {
            backgroundColor: '#E9C46A',
            width: 100,
            height: 50,
            borderRadius: 10,
            justifyContent: 'center',
            alignContent: 'center',
        },
        doneButtonText: {
            textAlign: 'center',
            bottom: '5%',
            fontWeight: 'bold',
            fontSize: 30,
            color: '#264653',
        },


    });

    const [confirmationVisible, setConfirmation] = useState(false)

    return (
        <View style={styles.container}>

            <Modal animationType="slide"
                   transparent={true}
                   visible={confirmationVisible}
                   onRequestClose={() => {

                       setConfirmation(!confirmationVisible)
                   }}>
                <View style={{height: '50%', width: '100%', justifyContent: 'center',alignSelf: 'center', alignItems: 'center'}}>
                    <View style={{backgroundColor: 'white' , justifyContent: 'space-around',height: 200, width: '90%',borderRadius:20}}>

                        <Text style={ {
                            fontSize: 23,
                            color: 'black',
                            marginLeft: 20,
                            marginRight: 20,
                            textAlign: 'center',
                            marginTop: 5,
                            fontWeight: 'bold'
                        }}>
                            Are You Sure You Wanna Reset The Data?
                        </Text>

                        <View style={{flexDirection: 'row',  justifyContent: 'space-around', marginRight: 50, marginLeft: 50,}}>
                        <TouchableOpacity style={{ backgroundColor: 'grey',
                            width: 100,
                            height: 50,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignContent: 'center',}}  onPress={()=> {
                            props.resetTeaInventory()
                                props.resetDiary()

                            setConfirmation(!confirmationVisible)
                        }} activeOpacity={1}>
                            <Text style={ {
                                textAlign: 'center',
                                bottom: '5%',
                                fontWeight: 'bold',
                                fontSize: 30,
                                color: 'black',
                            }}>
                                Yes
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.doneButton}  onPress={()=> {
                            setConfirmation(!confirmationVisible)
                        }} activeOpacity={1}>
                            <Text style={styles.doneButtonText}>
                                No
                            </Text>
                        </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </Modal>

            <View style={{height: '100%',}}>

                <View style={{flex: 1}}>


                    <Text style={styles.welcomeText}>
                        Settings
                    </Text>
                    <View style={{height: 500, width: '100%',alignItems: 'center',}}>
                        <TouchableOpacity  activeOpacity={1} onPress={()=> {
                            navigation.navigate('TeaInventory', {searchTerm: null, status: 'archived'})
                        }} style={{height: 50, width: '80%',alignSelf: "center", flexDirection: 'row', alignItems: 'center',}}>
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

const mapDispatchToProps = (dispatch, ownProps) => {

    return {
       resetDiary: ()=> dispatch(resetDiaryData()),
        resetTeaInventory: ()=> dispatch(resetCurrentTeaData())
    };
};


export default connect(null,mapDispatchToProps)(SettingsPage)

