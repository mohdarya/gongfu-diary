import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/core";
import {connect} from "react-redux";

function DiaryListingItem(props){
    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'white',
            width: '45%',
            height: 'auto',
            padding: 10,
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


const mapStateToProps = (state, ownProps) => {
    const {Diary, TeaAvailable} = state;

    return {
        teaAvailable: TeaAvailable.teaAvailable
    };
};
export default connect(mapStateToProps)(DiaryListingItem)
