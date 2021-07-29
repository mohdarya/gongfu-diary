import React, {useState} from 'react';
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
import Slider from '@react-native-community/slider';


function FlavorDiaryItem(props) {

    const styles = StyleSheet.create({
        container: {
            height: 100,
            margin: 15,
            width: 'auto',


        }, sliderView: {
            height: '65%',
            width: '100%',
            borderRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            backgroundColor: 'grey',
        },
        detailView: {
            height: '40%',
            width: '30%',
            top: '5%',
            borderRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            backgroundColor: 'grey',

            alignSelf: 'flex-end',
            flexDirection: 'column',
        },
        fieldTag: {
            fontSize: 15,
            marginTop: 3,
            margin: 15,
            marginBottom: 0,
            position: 'absolute',
        }, valueTextView: {
            width: '100%',
            alignItems: 'center',
        },
        valueText: {
            top: '40%',
            fontSize: 17,

        }, progressBar: {
            borderBottomLeftRadius: 20,
            borderTopLeftRadius: 20,
            width: '50%',
            left: 0,
            height: '70%',
            position: 'absolute',

            backgroundColor: '#98D4B0',
            alignSelf: 'flex-start',
        },
        progressBarContainer: {
            top: '30%',
            height: '30%',
            alignSelf: 'center',
            width: '90%',
        }, backgroundProgressBar: {
            borderRadius: 20,

            backgroundColor: 'white',
            height: '70%',
            width: '100%',
        },


    })

    const [value, setValue] = useState(0)
    return (
        <View style={styles.container}>
            <View style={styles.sliderView}>
                <Text style={styles.fieldTag}>
                    fruity
                </Text>
                <View>
                    <View style={styles.valueTextView}>
                        <Text style={styles.valueText}>
                            {value}
                        </Text>
                    </View>
                    <View style={styles.progressBarContainer}>
                        <View style={styles.backgroundProgressBar}>

                        </View>
                        <View style={styles.progressBar}/>


                    </View>
                </View>
            </View>

            <View style={styles.detailView}>

                <Text style={{alignSelf: 'center', top: '10%', fontSize: 20,}}>
                    cherry
                </Text>
            </View>
        </View>
    )
}

export default FlavorDiaryItem
