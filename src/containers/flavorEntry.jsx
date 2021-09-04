import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Slider from "@react-native-community/slider";


function FlavorEntry(props) {


    const [value, setValue] = useState(0)
    const [flavorNoteModalVisible, setFlavorNoteModalVisible] = useState(false)
    const [flavorDetailModalVisible, setFlavorDetailModalVisible] = useState(false)
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
        },
        doneButtonView: {
            flex: 10,
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
            top: 50,

        }, flavorNote: {
            backgroundColor: 'grey',
            width: 120,
            height: 50,
            alignSelf: 'flex-end',
            margin: 5,
            marginRight: 0,
            borderTopRightRadius: 20,
            marginLeft: 15,
            borderBottomLeftRadius: 20,
        },
        flavorView: {
            height: 170,
            width: '100%',
            borderRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,

            justifyContent: 'flex-start',

            flexDirection: 'column',
        }, valueTextView: {
            width: '100%',
            alignItems: 'center',
        },
        valueText: {
            top: '40%',
            fontSize: 17,

        }, sliderView: {
            height: '52%',
            width: '100%',
            borderRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            backgroundColor: 'grey',
        },
        detailView: {
            width: 120,
            height: 50,
            margin: 10,
            marginRight: 0,
            borderRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            backgroundColor: 'grey',
            alignSelf: 'flex-end',
            flexDirection: 'row',
        },
        fieldTag: {
            fontSize: 15,
            height: '100%',
            width: '100%',
            textAlign: 'center',
            textAlignVertical: 'center',
        }, flavorContainer: {
            height: 120,
            margin: 15,
            width: 'auto',
            justifyContent: 'space-between',
        },
        endButton: {
            margin: 20,
            backgroundColor: 'grey',
            borderRadius: 5,
            height: 30,
            width: 60,
            alignSelf: 'flex-end',
            alignItems: 'center',
            justifyContent: 'center',
        },
        endButtonText: {
            textAlign: 'center',
            bottom: '5%',
            fontSize: 15,
        },


    })

    return (

        <View style={styles.container}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={flavorNoteModalVisible}
                onRequestClose={() => {

                    setFlavorNoteModalVisible(!flavorNoteModalVisible)
                }}

            >


                <View style={{
                    height: '80%',
                    width: '90%',
                    margin: 20,
                    borderRadius: 20,
                    backgroundColor: '#2a9d8f'
                }}>
                    <TouchableOpacity style={styles.endButton} activeOpacity={1} onPress={() => {
                        setFlavorNoteModalVisible(!flavorNoteModalVisible)
                    }}>
                        <Text style={styles.endButtonText}>
                            Exit
                        </Text>
                    </TouchableOpacity>


                </View>


            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={flavorDetailModalVisible}
                onRequestClose={() => {

                    setFlavorDetailModalVisible(!flavorDetailModalVisible)
                }}

            >

                <View style={{
                    height: '80%',
                    width: '90%',
                    margin: 20,
                    borderRadius: 20,
                    backgroundColor: '#2a9d8f'
                }}>
                    <TouchableOpacity style={styles.endButton} activeOpacity={1} onPress={() => {
                        setFlavorDetailModalVisible(!flavorDetailModalVisible)
                    }}>
                        <Text style={styles.endButtonText}>
                            Exit
                        </Text>
                    </TouchableOpacity>

                </View>

            </Modal>
            <View style={styles.flavorList}>

                <View style={styles.flavorContainer}>

                    <View style={styles.sliderView}>
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
                    <View style={styles.flavorView}>
                        <TouchableOpacity style={styles.flavorNote}
                                          activeOpacity={1}
                                          onPress={() => {
                                              setFlavorNoteModalVisible(true)
                                          }}>
                            <Text style={{
                                height: '100%',
                                textAlign: 'center',
                                textAlignVertical: 'center'
                            }}>
                                Flavor Note
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.detailView}
                                          activeOpacity={1}
                                          onPress={() => {
                                              setFlavorDetailModalVisible(true)
                                          }}
                        >
                            <Text style={styles.fieldTag}>
                                detail
                            </Text>

                        </TouchableOpacity>

                    </View>

                </View>
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

