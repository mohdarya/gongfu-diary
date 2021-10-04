import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/core";

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
        },
        detailView:{
            width: '60%',
            height: '100%',
            alignSelf: "center",
            justifyContent: 'space-between',
        }

    })
    const navigation = useNavigation()
    let date = 0;

    let dateNumber =  parseInt(props.data.sessionID.replace(props.data.teaName, ''))
    date = new Date(dateNumber).toLocaleDateString()

    const goToTeaPage = () => {
        navigation.navigate('DiaryListing', {
            data: props.data,
            date
        })
    }

    return (
        <TouchableOpacity activeOpacity={1} onPress={goToTeaPage} style={styles.container}>
            <View style={styles.iconView}>
                <Image style={{height: 45, width: 45, alignSelf: 'center'}} source={require('../img/teaLeaf.png')}/>
            </View>
            <View style={styles.teaNameView}>
                <Text style={{color: 'white'}}>
                    {props.data.teaName}
                </Text>
            </View>
            <View style={styles.detailView}>
                <Text style={{textAlign: 'right', color: 'white'}}>
                    1:12
                </Text>
                <Text style={{textAlign: 'right', color: 'white'}}>
                    {date}
                </Text>
            </View>
        </TouchableOpacity>
    )


}

export default HistoryItem
