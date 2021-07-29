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


function SteepSelector(props) {

    const styles = StyleSheet.create({
        container: {
            height: 120,

            width: 'auto',
            justifyContent: 'space-between',

        }, sliderView: {
            height: '52%',
            width: '100%',
            borderRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            backgroundColor: 'grey',
        },
        detailView: {
            height: '38%',
            width: '50%',

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

        },


    })

    const [value, setValue] = useState(0)
    return (
        <View style={styles.container}>
            <View style={styles.sliderView}>
                <Text style={styles.fieldTag}>
                    Steep
                </Text>
                <View>
                    <View style={styles.valueTextView}>
                        <Text style={styles.valueText}>
                            {value}
                        </Text>
                    </View>
                    <Slider
                        style={{width: '100%', height: 40}}
                        minimumValue={0}
                        maximumValue={10}
                        step={1}
                        onValueChange={(value => {
                            setValue(value)
                        })}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                    />
                </View>
            </View>

        </View>
    )
}

export default SteepSelector
