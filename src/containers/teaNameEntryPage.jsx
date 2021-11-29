import React, {useEffect, useState} from 'react';
import {Image, Keyboard, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/core";


function TeaNameEntryPage(props) {




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


    const navigation = useNavigation()
    const route  = useRoute()
    const [teaNameToDisplay, setDisplayTeaName] = useState('Tea')
    const [flavorText, setFlavorText] = useState('On')
    const [flavorColor, setFlavorColor] = useState( '#E9C46A')
    const [flavorFontColor, setFlavorFontColor] = useState(  '#264653')
    const setTeaName = (teaNameAndID) => {

        if(teaNameAndID.teaName.length <=65)
        {
            setDisplayTeaName(teaNameAndID.teaName)
        }
        else {
            setDisplayTeaName(teaNameAndID.teaName.substring(0, 65) + ' ...')
        }
        setTeaData({...teaData, ...teaNameAndID})
    }
    function goToDiaryEntry() {
        if (teaData.teaName !== 'Tea' && teaData.temp !== null && teaData.weight !== null && teaData.waterVolume !== null && teaData.startingTime !== null) {
            navigation.navigate("DiaryEntry", {
                teaData
            })
        } else {
            ToastAndroid.show("Please Fill All Fields", ToastAndroid.LONG)
        }
    }
    const [teaData, setTeaData] = useState(()=> {
        return {
            teaName: 'Tea',
            teaID: null,
            weight: null,
            temp: null,
            waterVolume: null,
            startingTime: null,
            flavor: true
        }
            })

    useEffect(()=> {
        if( typeof route.params !== 'undefined')
        {

            setTeaName({  teaName: route.params.teaName,
                teaID: route.params.teaID,})
        }

    }, [])
    return (

        <TouchableOpacity style={{flex: 1}} onPress={() => {
            Keyboard.dismiss();

        }
        } activeOpacity={1}>
            <View style={styles.container}>
                <View style={styles.topPart}>
                    <View style={styles.topPartBar}>

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
                            {teaNameToDisplay}
                        </Text>
                    </TouchableOpacity>
                    <TextInput style={{fontSize: 20,  borderBottomWidth: 2, borderColor: '#E9C46A'}} placeholderTextColor={'grey'} placeholder={'First steep time'}  onChangeText={(text) => {
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
                    <TextInput style={{fontSize: 20,  borderBottomWidth: 2, borderColor: '#E9C46A'}} placeholderTextColor={'grey'} placeholder={'Tea leaf weight'}  onChangeText={(text) => {
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
                    <TextInput style={{fontSize: 20,  borderBottomWidth: 2, borderColor: '#E9C46A'}}  placeholderTextColor={'grey'}  placeholder={'Water Temperature'}  onChangeText={(text) => {
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
                    <TextInput style={{fontSize: 20, borderBottomWidth: 2, borderColor: '#E9C46A'}}  placeholderTextColor={'grey'}  placeholder={'Water Volume'}  onChangeText={(text) => {
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

                    <TouchableOpacity style={{fontSize: 20, borderBottomWidth: 2, height: 50, borderColor: '#E9C46A', flexDirection: 'row', justifyContent: 'space-between'}} activeOpacity={1} onPress={()=> {
                        if(flavorText.localeCompare('On') === 0) {
                            setFlavorText('Off')
                            setTeaData({...teaData, flavor: false})
                            setFlavorColor( 'grey')
                            setFlavorFontColor('white')
                        }else {
                            setFlavorText('On')
                            setTeaData({...teaData, flavor: true})
                            setFlavorColor( '#E9C46A')
                            setFlavorFontColor( '#264653')
                        }
                    }} >
                        <Text  style={{fontSize: 20,marginLeft: 3,marginTop: 8,color:'white'}}>
                            Flavor
                        </Text>
                        <View style={{height: 30, width: 100,marginBottom: 4, borderRadius: 10, backgroundColor: flavorColor, alignSelf: 'center'}}>
                            <Text style={{fontSize: 20, alignSelf: 'center', color: flavorFontColor, fontWeight: 'bold'}}>
                                {flavorText}
                            </Text>
                        </View>

                    </TouchableOpacity>
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
