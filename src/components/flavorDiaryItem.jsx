import React, {useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";


function FlavorDiaryItem(props) {


    let level = toString

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
            width: '35%',
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


    const [value, setValue] = useState(props.data.level)
    const [detail, setDetail] = useState(() => {
        if (props.data.detail !== undefined) {
            return props.flavorNotes[props.noteIndex].detail[props.data.detail]
        } else {
            return 'detail'
        }
    })
    return (
        <View style={styles.container}>
            <View style={styles.sliderView}>
                <Text style={styles.fieldTag}>
                    {props.flavorNotes[props.noteIndex].note}
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
                        <View
                            style={[styles.progressBar, {width: props.data.level * 10 + '%',}, props.data.level  === 10 ? {borderRadius: 20,} : {
                                borderBottomLeftRadius: 20,
                                borderTopLeftRadius: 20,
                            }]}/>


                    </View>
                </View>
            </View>

            <View style={styles.detailView}>

                <Text style={{alignSelf: 'center', height: '100%', textAlignVertical:"center", textAlign: 'center', fontSize: 14,}}>
                    {detail}
                </Text>
            </View>
        </View>
    )
}


const mapStateToProps = (state, ownProps) => {
    const {Diary} = state;

    return {
        flavorNotes: Diary.flavorNotes
    };
};

export default connect(mapStateToProps)(FlavorDiaryItem);
