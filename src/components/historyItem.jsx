import React from 'react';
import {StyleSheet, Text, View} from "react-native";

function HistoryItem(props) {

    const styles = StyleSheet.create({
        container: {
            marginTop: 23,
            height: 56,
            width: '100%',
            flexDirection: 'row'



        }, iconView: {
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

    return (
        <View style={styles.container}>
            <View style={styles.iconView}>

            </View>
            <View style={styles.teaNameView}>
                <Text style={{color: 'white'}}>
                    Red Tiger
                </Text>
            </View>
            <View style={styles.detailView}>
                <Text style={{textAlign: 'right', color: 'white'}}>
                    1:12
                </Text>
                <Text style={{textAlign: 'right', color: 'white'}}>
                    12/12/2021
                </Text>
            </View>
        </View>
    )


}

export default HistoryItem
