import React from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform, ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {useHeaderHeight} from "@react-navigation/stack";
import FlavorItem from "../components/flavorListItem";
import {useRoute} from "@react-navigation/core";


function FlavorEntry(props) {


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',

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
        }, flavorList: {
            flex: 8,

        },


    })

    return (

        <View style={styles.container}>
            <View style={styles.flavorList}>
                <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
                    <FlavorItem/>
                    <FlavorItem/>
                    <FlavorItem/>
                    <FlavorItem/>
                    <FlavorItem/>
                    <FlavorItem/>
                    <FlavorItem/>
                    <FlavorItem/>
                    <FlavorItem/>
                    <FlavorItem/>
                    <FlavorItem/>
                    <FlavorItem/>
                    <FlavorItem/>
                </ScrollView>
            </View>
            <View style={styles.doneButtonView}>
                <TouchableOpacity style={styles.doneButton}>
                    <Text style={styles.doneButtonText}>
                        Done
                    </Text>
                </TouchableOpacity>
            </View>

        </View>


    )
}

export default FlavorEntry

