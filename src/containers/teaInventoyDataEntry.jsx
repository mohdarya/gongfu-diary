


import React, {useState} from 'react';
import {
    FlatList,
    Image,
    Keyboard,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View
} from "react-native";
import {useNavigation} from "@react-navigation/core";


function TeaInventoryEntry(props) {

    let startingTime = 20;
    let teaName = ''
    const navigation = useNavigation()
    const
        styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#264653',
                justifyContent: 'flex-start',


            },
            teaNameTag: {
                fontSize: 15,
                margin: 10,
                marginTop: 10,
            },
            teaName: {

                textAlign: 'center',
                textAlignVertical: 'top',
                fontSize: 15,
                borderTopRightRadius: 20,
                color: 'black',
            },
            teaNameTextView: {
                height: '70%',
                width: '90%',

                marginBottom: '3%',
                justifyContent: 'flex-start',
                alignSelf: 'center',


            },


            teaNameView: {


                height: 70,
                flexDirection: 'column',
                marginBottom: '5%',
                marginLeft: 20,
                marginRight: 20,
                marginTop: '20%',
                backgroundColor: 'grey',
                borderRadius: 20,
                borderTopLeftRadius: 0,
                borderBottomRightRadius: 0,
                justifyContent: 'space-around',
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
            }, timeView: {
                height: 150,
                flexDirection: 'row',
                marginBottom: '30%',
                marginLeft: 20,
                marginRight: 20,


                borderTopLeftRadius: 0,
                borderBottomRightRadius: 0,
                justifyContent: 'space-around',
            },
            timerTag: {
                backgroundColor: 'grey',
                height: 80,
                width: 130,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15,
            },
            startingTime: {
                fontSize: 40,
                textAlign: 'center',
                color: 'black',
            },
            startingTimeView: {
                backgroundColor: 'grey',
                height: 80,
                width: 130,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
            },
            timerTagText: {
                fontSize: 20,
                top: 4,
                textAlign: 'center',
            },
            incrementView: {
                alignSelf: 'center',
                backgroundColor: 'grey',
                borderRadius: 20,

                borderTopLeftRadius: 0,
                borderBottomRightRadius: 0,
                justifyContent: 'space-between',
                height: 110,
                width: 170,
            }, topPart: {
                height: 170,
                width: '100%',


            },
            topPartBar: {
                height: 130,
                width: '100%',

                alignItems: 'center',
                backgroundColor: '#2A9D8F',
                borderBottomLeftRadius: 93,
                borderBottomRightRadius: 93,

            },
            infoPart: {
                marginTop: '10%',
                marginRight: '10%',
                marginLeft: '10%',
            },
            buttonPart: {


                width: '100%',
                top: '15%',
                height: 400,
            },
            flavorListContainer: {
                flex: 1,
                marginBottom: 20,
            },
            endButtonText: {
                textAlign: 'center',
                bottom: '5%',
                fontSize: 15,
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
            flavorNoteText: {
                alignSelf: 'center',
                height: '100%',
                textAlignVertical: 'center',
                textAlign: 'center',
                fontSize: 20
            },
            FlavorNoteItem: {
                backgroundColor: 'white',
                height: 60,
                width: 160,
                borderRadius: 20,
                flexBasis: '40%',
                margin: 20,

            },


        })


    const [typeModal, setTypeModal] = useState(true)

    return (

        <TouchableOpacity style={{flex: 1}} onPress={() => {
            Keyboard.dismiss();

        }
        } activeOpacity={1}>
            <View style={styles.container}>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={typeModal}
                    onRequestClose={() => {

                        setTypeModal(!typeModal)
                    }}

                >

                    <View style={{
                        zIndex: 3,
                        height: '80%',
                        width: '90%',
                        margin: 20,
                        borderRadius: 20,
                        backgroundColor: 'black'
                    }}>
                        <TouchableOpacity style={styles.endButton} activeOpacity={1} onPress={() => {
                            setTypeModal(!typeModal)
                        }}>
                            <Text style={styles.endButtonText}>
                                Exit
                            </Text>
                        </TouchableOpacity>

                        <SafeAreaView style={styles.flavorListContainer}>
                            <FlatList data={['Oolong', 'Black', 'Green', 'White', 'hei cha', 'purple', 'Raw Pu-erh', 'Ripe Pu-erh', ]}
                                      horizontal={false}
                                      numColumns={2}
                                      renderItem={({item})=> {
                                          return(
                                              <TouchableOpacity style={[styles.FlavorNoteItem]} activeOpacity={1} onPress={() => {



                                                  setTypeModal(!typeModal)
                                              }}>
                                                  <Text style={styles.flavorNoteText}>
                                                      {item}
                                                  </Text>
                                              </TouchableOpacity>
                                          )
                                      }}
                                      keyExtractor={item => item}/>

                        </SafeAreaView>
                    </View>

                </Modal>
                <View style={styles.topPart}>

                    <View style={styles.topPartBar}>

                    </View>
                    <View style={{ top: '40%',left: '15%',width: '70%', height: 110, backgroundColor: '#E9C46A', borderRadius:30, position: "absolute", alignContent: 'center', justifyContent: 'center'}}>
                        <Text style={{alignSelf: 'center', fontSize: 25, color: '#264653', fontWeight: 'bold'}}>
                            Enter The Tea Detail
                        </Text>
                    </View>

                </View>
                <View style={styles.infoPart}>

                    <TextInput style={{fontSize: 20,  marginBottom: 15, borderBottomWidth: 2, borderColor: '#E9C46A'}} placeholderTextColor={'white'} placeholder={'Name'} keyboardType={'default'}>

                    </TextInput>
                    <TouchableOpacity  activeOpacity={1} onPress={() => {
                       setTypeModal(true)
                    }} style={{fontSize: 20, height: 50, marginBottom: 15,  borderBottomWidth: 2, borderColor: '#E9C46A'}}>
                        <Text style={{fontSize: 20, color:'white'}}>
                            Type
                        </Text>
                    </TouchableOpacity>
                    <TextInput style={{fontSize: 20,marginBottom: 15,  borderBottomWidth: 2, borderColor: '#E9C46A'}}  placeholderTextColor={'white'}  placeholder={'Weight'} keyboardType={'number-pad'}>

                    </TextInput>
                    <TextInput style={{fontSize: 20, marginBottom: 15,borderBottomWidth: 2, borderColor: '#E9C46A'}}  placeholderTextColor={'white'}  placeholder={'Link'} keyboardType={'default'}>

                    </TextInput>
                </View>
                <View style={styles.buttonPart}>

                </View>
            </View>
        </TouchableOpacity>

    )
}

export default TeaInventoryEntry
