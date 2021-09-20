import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/core";

function DiaryListingItem(props){
    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'white',
            width: '45%',
            height: 'auto',
            margin: 8,
            borderTopLeftRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomRightRadius: 15,

        },
        dateTextStyle: {
            textAlign: 'center',
            fontSize: 13,
            marginTop: 5,
            fontWeight: 'bold'
        },
        teaTextStyle: {
            textAlign: 'center',
            fontSize: 14,

            fontWeight: 'bold'
        }

    })

    const navigation = useNavigation()
    let date = 0;

    let dateNumber =  parseInt(props.data.sessionID.replace(props.data.teaName, ''))
    date = new Date(dateNumber).toLocaleDateString()

    const goToTeaPage = () => {
        navigation.navigate('DiaryListing', {
            data: props.data
        })
    }
    return(
        <TouchableOpacity style={styles.container} onPress={goToTeaPage} activeOpacity={1}>
            <Text style={styles.teaTextStyle}>
                {props.data.teaName}
            </Text>
            <Text style={styles.dateTextStyle}>
                {date}
            </Text>

        </TouchableOpacity>
    )
}

export default  DiaryListingItem
