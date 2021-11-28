import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/core";
import {connect} from "react-redux";

function HistoryItem(props) {

    const styles = StyleSheet.create({
        container: {
            marginTop: 23,
            height: 56,
            width: '80%',
            flexDirection: 'row',



        }, iconView: {
            justifyContent: 'center',
                height: 56,
            width: 63,
            borderRadius: 16,
            backgroundColor: '#71CCA2',
        },
        teaNameView: {
            alignSelf: 'center',
            marginLeft: 10,
            width: '55%',


        },
        detailView:{

            width: '24%',
            height: '100%',
            alignSelf: "center",
            justifyContent: 'space-between',
        }

    })
    const navigation = useNavigation()
    let date = 0;

    let dateNumber = parseInt(props.data.sessionID.replace(props.data.teaID + props.teaAvailable[props.data.teaID].teaName, ''))
    date = new Date(dateNumber).toLocaleDateString()

    const goToTeaPage = () => {
        navigation.navigate('DiaryListing', {
            data: props.data,
            date
        })
    }

    let flavorColor = '#E9C46A'

        if('flavor' in props.data)
        {
            if(props.data.flavor === false)
            {
                flavorColor = 'grey'
            }
        }



    const [teaNameToDisplay, setTeaName] = useState()

    useEffect(()=> {
        if(props.teaAvailable[props.data.teaID].teaName.length <=45)
        {
            setTeaName(props.teaAvailable[props.data.teaID].teaName)
        }
        else {
            setTeaName( props.teaAvailable[props.data.teaID].teaName.substring(0,45) + ' ...')
        }
    }, [props.teaAvailable])


    let backgroundColour

    if(props.teaAvailable[props.data.teaID].type === 'Hei cha')
    {
        backgroundColour = props.colors.HeiCha
    }
    else if(props.teaAvailable[props.data.teaID].type === 'Raw Pu-erh')
    { backgroundColour = props.colors.RawPuerh}
    else if(props.teaAvailable[props.data.teaID].type === 'Ripe Pu-erh')
    {
        backgroundColour = props.colors.RipePuerh
    }
    else{
        backgroundColour = props.colors[props.teaAvailable[props.data.teaID].type]
    }
    const clockiFy = (durationTime) => {



        durationTime = durationTime / 1000
        let hour = Math.floor(durationTime / 60 /  60)
        let mins = Math.floor((durationTime / 60) %60)
        let seconds = Math.floor(durationTime % 60)


        let displayHour = hour < 10 ? `0${hour}` : hour
        let displayMins = mins < 10 ? `0${mins}` : mins
        let displaySecs = seconds < 10 ? `0${seconds}` : seconds

        return {
            displayHour,
            displayMins,
            displaySecs
        }

    }
    return (
        <TouchableOpacity activeOpacity={1} onPress={goToTeaPage} style={styles.container}>

            <View style={[styles.iconView, {backgroundColor: backgroundColour}]}>
                <Image style={{height: 45, width: 45, alignSelf: 'center'}} source={require('../img/teaLeafWhite.png')}/>
            </View>

            <View style={styles.teaNameView}>
                <Text style={{color: 'white'}}>
                    {teaNameToDisplay}
                </Text>
            </View>
            <View style={{backgroundColor: flavorColor, height: 35, width: 35, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10, marginRight: 10}}>

                <Text style={{fontWeight: 'bold',fontSize: 20}}>
                    F
                </Text>

            </View>
            <View style={styles.detailView}>
                <Text style={{textAlign: 'right', color: 'white'}}>
                    {clockiFy(props.data.duration).displayHour + ':' +clockiFy(props.data.duration).displayMins + ':' + clockiFy(props.data.duration).displaySecs}
                </Text>
                <Text style={{textAlign: 'right', color: 'white'}}>
                    {date}
                </Text>
            </View>
        </TouchableOpacity>
    )


}


const mapStateToProps = (state, ownProps) => {
    const {Diary, TeaAvailable} = state;

    return {
        colors: TeaAvailable.teaColour,
        teaAvailable: TeaAvailable.teaAvailable
    };
};
export default connect(mapStateToProps)(HistoryItem)
