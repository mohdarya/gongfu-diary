import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

function DiaryEntry(props) {


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',

        },
        topBar: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flex: 1,
            margin: 10,
            marginTop: 0,


        },
        timerView: {
            alignItems: 'center',

            marginLeft: 10,
            marginRight: 10,
            flexDirection: 'row',
            justifyContent: 'space-around',
            flex: 2,
        },
        countdownTimer: {

            backgroundColor: 'grey',
            borderRadius: 15,
            height: '55%',
            width: '35%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        countdownTimerText: {

            textAlign: 'center',

            fontSize: 45,
        },

        list: {
            backgroundColor: 'grey',
            margin: 20,
            flex: 7,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
        },
        endButton: {

            backgroundColor: 'grey',
            borderRadius: 5,
            height: '45%',
            width: '25%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        endButtonText: {

            textAlign: 'center',
            bottom: '5%',
            fontSize: 23,
        },
        incrementView: {
            backgroundColor: 'grey',
            borderRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            justifyContent: 'space-between',
            height: '55%',
            width: '55%',


        },
        incrementTag: {
            fontSize: 20,
            margin: 5,
            marginTop: 1,

        }, incrementNumber: {
            alignSelf: 'flex-end',
            fontSize: 35,
            marginRight: 20,
            marginBottom: 10,

        }, teaNameView: {
            flex: 0.8,
            flexDirection: 'row',
            marginBottom: 30,
            marginLeft: 20,
            marginRight: 20,
            backgroundColor: 'grey',
            borderRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            justifyContent: 'space-between',
        }, teaFlavorView: {
            backgroundColor: 'grey',
            flex: 4,
            marginLeft: 20,
            marginRight: 20,
            borderRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
        }, doneButtonView: {
            flex: 2,
        },
        teaNameTag: {
            fontSize: 20,
            margin: 5,
            marginTop: 1,
        },
        teaName: {
            height: '100%',
            textAlign: 'center',
            fontSize: 15,
            borderTopRightRadius: 20,
            color: 'black',
        },
        teaNameTextView: {



            width: '70%',
            alignSelf: 'flex-end',


        }


    });
    return (
        <View style={styles.container}>

            <View style={styles.topBar}>


                <TouchableOpacity style={styles.endButton}>
                    <Text style={styles.endButtonText}>
                        End
                    </Text>
                </TouchableOpacity>

            </View>
            <View style={styles.timerView}>
                <TouchableOpacity style={styles.incrementView}>
                    <View>
                        <Text style={styles.incrementTag}>
                            Increment
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.incrementNumber}>
                            5
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.countdownTimer}>
                    <Text style={styles.countdownTimerText}>
                        15
                    </Text>
                </View>
            </View>
            <View style={styles.teaNameView}>
                <View>
                    <Text style={styles.teaNameTag}>
                        Tea
                    </Text>
                </View>

                <View style={styles.teaNameTextView}>
                    <TextInput style={styles.teaName}
                    multiline={true}>
                        Red Tiger Oolong
                    </TextInput>
                </View>
            </View>
            <View style={styles.teaFlavorView}>

            </View>
            <View style={styles.doneButtonView}>

            </View>


        </View>
    )
}

export default DiaryEntry
