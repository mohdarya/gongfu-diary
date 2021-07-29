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
import SteepSelector from "../components/steepSelector";


function DiaryListingPage(props) {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',


        },
        teaNameTag: {
            fontSize: 15,
            margin: 5,
            marginTop: 1,
        },
        teaName: {
            height: '100%',
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 15,
            borderTopRightRadius: 20,
            color: 'black',
        },
        teaNameTextView: {


            width: '50%',
            justifyContent: 'center',
            alignSelf: 'flex-end',


        },
        teaFlavorView: {
            backgroundColor: 'grey',
            flex: 4,

            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20,
            borderRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
        },
        graphView: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,


        },
        teaNameView: {
            height: 50,
            flexDirection: 'row',
            marginBottom: 30,
            marginLeft: 20,
            marginRight: 20,

            backgroundColor: 'grey',
            borderRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            justifyContent: 'space-between',
        },
        steepSelector: {
            width: '90%',
            height: '10%',
  
            marginLeft: 20,
            marginTop: 40,


        }


    })


    return (
        <View style={styles.container}>
            <View style={[{marginTop: '10%',}, styles.teaNameView]}>
                <View style={{left: '5%'}}>
                    <Text style={styles.teaNameTag}>
                        Tea
                    </Text>
                </View>

                <TouchableOpacity style={styles.teaNameTextView}>
                    <Text style={styles.teaName}>
                        Red Tiger Oolong
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.teaNameView}>
                <View style={{left: '5%'}}>
                    <Text style={styles.teaNameTag}>
                        Number of steeps
                    </Text>
                </View>

                <TouchableOpacity style={styles.teaNameTextView}>
                    <Text style={styles.teaName}>
                        5
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.steepSelector}>
                <SteepSelector/>
            </View>
            <View style={styles.teaFlavorView}>

                <View>
                    <Text style={styles.teaNameTag}>
                        Flavor
                    </Text>
                </View>
                <View style={styles.graphView}>
                    <Text>
                        graph
                    </Text>
                </View>
            </View>


        </View>
    )
}

export default DiaryListingPage
