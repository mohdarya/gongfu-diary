import React, {useState} from 'react';
import {Image, Keyboard, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/core";



function TeaNameEntryPage(props) {


    const [teaData, setTeaData] = useState({
        teaName: 'Tea',
        teaID: null,
        weight: null,
        temp: null,
        waterVolume: null,
        startingTime: null

    })
    const navigation = useNavigation()
    const
        styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#264653',
                justifyContent: 'flex-start',


            },
            teaNameTag: {
                fontSize: 15,
                margin: 10,
                marginTop: 10,
            },
            teaName: {

                textAlign: 'center',
                textAlignVertical: 'top',
                fontSize: 15,
                borderTopRightRadius: 20,
                color: 'black',
            },
            teaNameTextView: {
                height: '70%',
                width: '90%',

                marginBottom: '3%',
                justifyContent: 'flex-start',
                alignSelf: 'center',


            },


            teaNameView: {


                height: 70,
                flexDirection: 'column',
                marginBottom: '5%',
                marginLeft: 20,
                marginRight: 20,
                marginTop: '20%',
                backgroundColor: 'grey',
                borderRadius: 20,
                borderTopLeftRadius: 0,
                borderBottomRightRadius: 0,
                justifyContent: 'space-around',
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
            }, timeView: {
                height: 150,
                flexDirection: 'row',
                marginBottom: '30%',
                marginLeft: 20,
                marginRight: 20,


                borderTopLeftRadius: 0,
                borderBottomRightRadius: 0,
                justifyContent: 'space-around',
            },
            timerTag: {
                backgroundColor: 'grey',
                height: 80,
                width: 130,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15,
            },
            startingTime: {
                fontSize: 40,
                textAlign: 'center',
                color: 'black',
            },
            startingTimeView: {
                backgroundColor: 'grey',
                height: 80,
                width: 130,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
            },
            timerTagText: {
                fontSize: 20,
                top: 4,
                textAlign: 'center',
            },
            incrementView: {
                alignSelf: 'center',
                backgroundColor: 'grey',
                borderRadius: 20,

                borderTopLeftRadius: 0,
                borderBottomRightRadius: 0,
                justifyContent: 'space-between',
                height: 110,
                width: 170,
            }, topPart: {
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
            buttonPart: {


                width: '100%',
                top: '15%',
                height: 400,
            },


        })


    const setTeaName = (teaNameAndID) => {
        setTeaData({...teaData, ...teaNameAndID})
    }
    function goToDiaryEntry() {
        if (teaData.teaName !== 'Tea' && teaData.temp !== null && teaData.weight !== null && teaData.waterVolume !== null && teaData.startingTime !== null) {
            navigation.navigate("DiaryEntry", {
                teaData
            })
        } else {
            ToastAndroid.show("Please Enter a Tea Name", ToastAndroid.LONG)
        }
    }


    return (

        <TouchableOpacity style={{flex: 1}} onPress={() => {
            Keyboard.dismiss();

        }
        } activeOpacity={1}>
            <View style={styles.container}>
                <View style={styles.topPart}>
                    <View style={styles.topPartBar}>
                        <View style={{ top: 20,width: 80, height: 80, backgroundColor: '#E9C46A', borderRadius:100, justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity activeOpacity={1} style={{width: 70, height: 70}}>
                                <Image style={{height: '100%', width: '100%'}} source={require('../img/add.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ top: '70%',left: '15%',width: '70%', height: 110, backgroundColor: '#E9C46A', borderRadius:30, position: "absolute", alignContent: 'center', justifyContent: 'center'}}>
                        <Text style={{alignSelf: 'center', fontSize: 25, color: '#264653', fontWeight: 'bold'}}>
                            Enter The Tea Detail
                        </Text>
                    </View>

                </View>
                <View style={styles.infoPart}>
                    <TouchableOpacity  activeOpacity={1} onPress={() => {
                        navigation.navigate('TeaSelection', {
                            setTeaName
                        })
                    }} style={{fontSize: 20,  borderBottomWidth: 2,borderColor: '#E9C46A'}}>
                        <Text style={{fontSize: 20,marginLeft: 3, marginBottom: 5,color:'white'}}>
                            {teaData.teaName}
                        </Text>
                    </TouchableOpacity>
                    <TextInput style={{fontSize: 20,  borderBottomWidth: 2, borderColor: '#E9C46A'}} placeholderTextColor={'white'} placeholder={'Starting Time'}  onChangeText={(text) => {
                        let amount
                        if(text === '')
                        {
                            amount = null
                        }
                        else {
                            amount = parseInt(text)
                        }
                        setTeaData({...teaData, startingTime: amount})
                    }} keyboardType={'number-pad'}>

                    </TextInput>
                    <TextInput style={{fontSize: 20,  borderBottomWidth: 2, borderColor: '#E9C46A'}} placeholderTextColor={'white'} placeholder={'Weight'}  onChangeText={(text) => {
                        let amount
                        if(text === '')
                        {
                            amount = null
                        }
                        else {
                            amount = parseFloat(text)
                        }
                        setTeaData({...teaData, weight: amount})
                    }} keyboardType={'number-pad'}>

                    </TextInput>
                    <TextInput style={{fontSize: 20,  borderBottomWidth: 2, borderColor: '#E9C46A'}}  placeholderTextColor={'white'}  placeholder={'Temperature'}  onChangeText={(text) => {
                        let amount
                        if(text === '')
                        {
                            amount = null
                        }
                        else {
                            amount = parseInt(text)
                        }
                        setTeaData({...teaData, temp: amount})
                    }} keyboardType={'number-pad'}>

                    </TextInput>
                    <TextInput style={{fontSize: 20, borderBottomWidth: 2, borderColor: '#E9C46A'}}  placeholderTextColor={'white'}  placeholder={'Water Volume'}  onChangeText={(text) => {
                        let amount
                        if(text === '')
                        {
                            amount = null
                        }
                        else {
                            amount = parseInt(text)
                        }
                        setTeaData({...teaData, waterVolume: amount})
                    }} keyboardType={'number-pad'}>

                    </TextInput>
                </View>
                <View style={styles.buttonPart}>
                    <TouchableOpacity activeOpacity={1} onPress={goToDiaryEntry} style={{width: 260, height: 55,backgroundColor: '#E9C46A', alignSelf: 'flex-end', marginRight: 15, borderRadius: 16, justifyContent: 'center', flexDirection: 'row'}}>
                        <Text style={{alignSelf: "center", marginLeft: 10,fontSize: 20, color: '#264653', fontWeight: 'bold'}}>
                            Let's Start Brewing
                        </Text>
                        <Image style={{height: 40, width: 40,top: '1%' ,alignSelf: "center",}} source={require('../img/nextArrow.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>

    )
}

export default TeaNameEntryPage
