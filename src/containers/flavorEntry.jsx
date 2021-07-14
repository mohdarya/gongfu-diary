import React from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {useHeaderHeight} from "@react-navigation/stack";

function FlavorEntry(props) {



    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',

        },

    })

    return (
    <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={useHeaderHeight() + 27}>

        <TouchableOpacity style={{flex: 1}} onPress={() =>
        {
            Keyboard.dismiss();

        }
        } activeOpacity={1}>
            <View style={styles.container}>


            </View>
        </TouchableOpacity>
    </KeyboardAvoidingView>
    )
}

export default FlavorEntry

