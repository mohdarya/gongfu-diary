import React, {useState} from 'react';
import {FlatList, Modal, SafeAreaView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from "react-native";
import Slider from "@react-native-community/slider";


function FlavorEntry(props) {


    const [value, setValue] = useState(0)
    const [flavorNoteModalVisible, setFlavorNoteModalVisible] = useState(false)
    const [flavorDetailModalVisible, setFlavorDetailModalVisible] = useState(false)
    const [chosenNote, setChosenNote] = useState('Flavor Note')
    const [chosenNoteIndex, setChosenNoteIndex] = useState(0)
    const [chosenDetail, setChosenDetail]= useState('Detail')
    let flavorNotes = [
        {
            'note': 'Marine',
            'detail': ['Seaweed', 'Ocean Air']
        },
        {
            'note': 'Mineral',
            'detail': ['Salt', 'Metallic', 'Wet Rocks']
        },
        {
            'note': 'Earth',
            'detail': ['moss', 'Musty', 'Leather', 'Compost', 'Wet Earth', 'Forest Floor', 'Decaying Wood']
        },
        {
            'note': 'Wood',
            'detail': ['Pine', 'Bark', 'Cedar', 'Resin', 'Wet Wood', 'Dark Wood', 'Green Wood', 'Cherry Wood']
        },
        {
            'note': 'Vegetal',
            'detail': ['Grass', 'Stems', 'Straw', 'Spinach', 'Broccoli', 'Zucchini', 'Asparagus', 'Garden Peas', 'Green Pepper']
        },
        {
            'note': 'Herbs',
            'detail': ['Thyme', 'Parsley', 'Cardamon', 'Eucalyptus', 'Fennel Seed', 'Coriander Seed']
        },
        {
            'note': 'Floral',
            'detail': ['Rose', 'Hops', 'Orchid', 'Violet', 'Jasmine', 'Perfume', 'Geranium', 'Dandelion', 'Honeysuckle', 'Cherry Blossom', 'Orange Blossom']
        },
        {
            'note': 'Nutty',
            'detail': ['Almond', 'Peanut', 'Walnut', 'Chestnut', 'Hazelnut', 'Roasted Nuts']
        },
        {
            'note': 'Sweet',
            'detail': ['Malt', 'Candy', 'Honey', 'Caramel', 'Molasses', 'Burnt Sugar', 'Maple Syrup']
        },
        {
            'note': 'Char',
            'detail': ['Ash', 'Tar', 'Toast', 'Smoke', 'Tobacco', 'Fireplace', 'Burnt Food', 'Grilled Food']
        },
        {
            'note': 'Spicy',
            'detail': ['Cocoa', 'Clove', 'Vanilla', 'Pepper', 'Saffron', 'Nutmeg', 'Licorice', 'Menthol', 'Cinnamon']
        },
        {
            'note': 'Tropical Fruit',
            'detail': ['Mango', 'Melon', 'Lychee', 'Banana', 'Pineapple']
        },
        {
            'note': 'Tree Fruit',
            'detail': ['Peach', 'Pear', 'Apricot', 'Red Apple', 'Green Apple', 'Dried Fruits']
        },
        {
            'note': 'Citrus Fruit',
            'detail': ['Lemon', 'Orange', 'Grapefruit', 'Citrus Zest']
        },
        {
            'note': 'Berries',
            'detail': ['Raspberry', 'Strawberry', 'Blackberry', 'Black Currant']
        }

    ]


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
            width: 150,
            height: 45,
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
            width: 150,
            height: 45,
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
            fontSize: 17,
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
        }, FlavorNoteItem: {
            height: 60,
            width: 160,
            borderRadius: 20,
            flexBasis: '40%',
            margin: 20,
            backgroundColor: 'white',
        },
        flavorNoteView: {
            flex: 1,

            flexDirection: 'row',
        },
        flavorNoteText: {
            alignSelf: 'center',
            height: '100%',
            textAlignVertical: 'center',
            textAlign: 'center',
            fontSize: 20
        },
        flavorListContainer: {
            flex: 1,
            marginBottom: 20,
        }


    })

    const renderFlavorNoteItem = ({item}) => {
        return (<TouchableOpacity style={styles.FlavorNoteItem} activeOpacity={1} onPress={() => {
            setChosenNote(item.note)
            setChosenNoteIndex(flavorNotes.indexOf(item))
            setFlavorNoteModalVisible(!flavorNoteModalVisible)
        }}>
            <Text style={styles.flavorNoteText}>
                {item.note}
            </Text>
        </TouchableOpacity>)

    }


    const renderFlavorDetailItem = ({item}) => {
        return (<TouchableOpacity style={styles.FlavorNoteItem} activeOpacity={1} onPress={() => {
            setChosenDetail(item)
            setFlavorDetailModalVisible(!flavorDetailModalVisible)
        }}>
            <Text style={styles.flavorNoteText}>
                {item}
            </Text>
        </TouchableOpacity>)

    }

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
                    <SafeAreaView style={styles.flavorListContainer}>
                    <FlatList data={flavorNotes}
                              horizontal={false}
                              numColumns={2}
                              renderItem={renderFlavorNoteItem}
                              keyExtractor={item => item.detail}/>

                    </SafeAreaView>

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

                    <SafeAreaView style={styles.flavorListContainer}>
                        <FlatList data={flavorNotes[chosenNoteIndex].detail}
                                  horizontal={false}
                                  numColumns={2}
                                  renderItem={renderFlavorDetailItem}
                                  keyExtractor={item => item}/>

                    </SafeAreaView>
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
                            <Text style={styles.fieldTag}>
                                {chosenNote}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.detailView}
                                          activeOpacity={1}
                                          onPress={() => {
                                              if(chosenNote !== 'Flavor Note')
                                              {
                                              setFlavorDetailModalVisible(true)
                                              }else {
                                                  ToastAndroid.show("Please Select A Flavor Note", ToastAndroid.LONG)
                                              }
                                          }}
                        >
                            <Text style={styles.fieldTag}>
                                {chosenDetail}
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

