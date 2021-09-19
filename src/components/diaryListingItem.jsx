import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";

function DiaryListingItem(props){
    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'white',
            width: '45%',
            height: 130,
            marginTop: 20,
            borderTopLeftRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomRightRadius: 15,

        },
        dateTextStyle: {
            textAlign: 'center',
            fontSize: 16,

            fontWeight: 'bold'
        },
        teaTextStyle: {
            textAlign: 'center',
            fontSize: 14,

            fontWeight: 'bold'
        }

    })

    return(
        <TouchableOpacity style={styles.container} activeOpacity={1}>
            <Text style={styles.teaTextStyle}>
                Feng Qing Ye Sheng Hong Cha Wild Tree Purple Black Tea
            </Text>
            <Text style={styles.dateTextStyle}>
                Date
            </Text>

        </TouchableOpacity>
    )
}

export default  DiaryListingItem
