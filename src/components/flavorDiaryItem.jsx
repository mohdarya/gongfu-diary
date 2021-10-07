import React, {useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";


function FlavorDiaryItem(props) {


    let level = toString

    const styles = StyleSheet.create({
        container: {

            height: 120,
            margin: 15,
            width: 'auto',


        }, sliderView: {
           height: 50,

            width: '100%',
            borderRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,

        },
        detailView: {
            backgroundColor: '#E9C46A',
            width: 140,
            borderRadius: 20,
            marginBottom: 10,
            height: 35,
            justifyContent: 'center',
            alignSelf: 'flex-end',
        },
        fieldTag: {
            fontSize: 15,


            marginBottom: 0,
          alignSelf: 'center',
            textAlign: 'center',
        }, valueTextView: {
            position: 'absolute',


            width: '100%',
            alignItems: 'center',
        },
        valueText: {



            textAlign: 'center',
            fontSize: 17,

        }, progressBar: {


            justifyContent: 'center',
            left: 0,
            height: 25,
            position: 'absolute',

            backgroundColor: 'white',
            alignSelf: 'flex-start',
        },
        progressBarContainer: {
            top: 10,
            height: 25,
            alignSelf: 'center',
            width: '100%',
        }, backgroundProgressBar: {
            borderRadius: 20,

            backgroundColor: '#E9C46A',
            height: 25,
            width: '100%',
        }, titleView: {
            backgroundColor: '#E9C46A',
            width: 140,
            borderRadius: 20,
            marginBottom: 10,
            height: 35,
            justifyContent: 'center',
        }


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
            <View style={styles.titleView}>
            <Text style={styles.fieldTag}>
                {props.flavorNotes[props.noteIndex].note}
            </Text>
            </View>
            <View style={styles.sliderView}>


                    <View style={styles.progressBarContainer}>

                        <View style={styles.backgroundProgressBar}>

                        </View>
                        <View
                            style={[styles.progressBar, {width: props.data.level * 10 + '%',}, props.data.level  === 10 ? {borderRadius: 20,} : {
                                borderBottomLeftRadius: 20,
                                borderTopLeftRadius: 20,
                            }]}>

                        </View>
                        <View style={styles.valueTextView}>
                        <Text style={styles.valueText}>
                            {value}
                        </Text>
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
