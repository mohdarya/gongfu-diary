import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/core";
import {connect} from "react-redux";

function HistoryItem(props) {

    const styles = StyleSheet.create({
        container: {
            marginTop: 23,
            height: 56,
            width: '100%',
            flexDirection: 'row'



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
            width: '60%',

        },
        detailView:{

            width: '20%',
            height: '100%',
            alignSelf: "center",
            justifyContent: 'space-between',
        }

    })
    const navigation = useNavigation()
    let date = 0;

    let dateNumber =  parseInt(props.data.sessionID.replace(toString(props.data.teaID), ''))
    date = new Date(dateNumber).toLocaleDateString()

    const goToTeaPage = () => {
        navigation.navigate('DiaryListing', {
            data: props.data,
            date
        })
    }


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
        let mins = Math.floor((durationTime / 60))
        let seconds = Math.floor(durationTime % 60)

        let displayMins = mins < 10 ? `0${mins}` : mins
        let displaySecs = seconds < 10 ? `0${seconds}` : seconds

        return {
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
                    {props.teaAvailable[props.data.teaID].teaName}
                </Text>
            </View>
            <View style={styles.detailView}>
                <Text style={{textAlign: 'right', color: 'white'}}>
                    {clockiFy(props.data.duration).displayMins + ':' + clockiFy(props.data.duration).displaySecs}
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
