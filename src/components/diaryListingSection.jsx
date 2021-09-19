import React from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import DiaryListingItem from "./diaryListingItem";

function DiaryListingSection(props) {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'grey',

        },
        textStyle: {
            textAlign: 'center',
            fontSize: 16,

            fontWeight: 'bold'
        }

    })

    return (

        <View style={styles.container}>
            <ScrollView>
<DiaryListingItem/>

            </ScrollView>
        </View>
    )


}


export default DiaryListingSection
