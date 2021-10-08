import React, {useEffect, useRef, useState} from 'react';
import {Animated, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {getFocusedRouteNameFromRoute, useNavigation, useRoute} from "@react-navigation/core";
import {connect} from "react-redux";
import InventoryItem from "../components/inventoryItem";
import HistoryItem from "../components/historyItem";
import {Directions, FlingGestureHandler, State} from 'react-native-gesture-handler';

function SearchPage(props) {


    const navigation = useNavigation();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#264653',


        },
        topBar: {
            top: '5%',
            position: 'absolute',
            zIndex: 2,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            marginLeft: 15,
            marginRight: 15,


        },


        buttonText: {

            textAlign: 'center',

            fontSize: 45,
        },

        searchView: {
            alignSelf: 'center',
            backgroundColor: '#E9C46A',
            flexDirection: 'row',


            borderRadius: 15,
            width: '98%',
            height: 42

        },
        settingView: {
            height: '45%',

        },
        searchTextInput: {
            marginLeft: 15,
            color: 'black'
        },
        welcomeText: {
            fontSize: 30,
            color: 'white',
            marginLeft: 20,
            marginBottom: 20,
            marginRight: 15,
            marginTop: '25%',
            fontWeight: 'bold'
        },
        weekView: {
            flex: 1,

            marginBottom: 50,
            marginLeft: 15,
            marginRight: 15,

        },
        weekBar: {
            alignSelf: 'center',
            borderRadius: 16,
            backgroundColor: '#2A9D8F',
            width: '98%',
            height: 90,
        }, inventoryContainer: {
            flex: 1.8,
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 50,


        },
        inventoryView: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 23,

            height: 175,
        },
        inventoryViewTextView: {
            width: '100%',
            height: 50,
            flexDirection: 'row',
            alignItems: 'center'
        },
        HistoryViewTextView: {
            width: '100%',
            height: 50,
            flexDirection: 'row',
            alignItems: 'center'
        },
        historyContainer: {
            flex: 5,
            marginLeft: 15,
            marginRight: 15,

        },
        historyView: {
            marginLeft: 15,
            marginRight: 15,
        },
        navigationBar: {


            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            borderTopRightRadius: 34,
            height: 61, width: 331,
            backgroundColor: '#E9C46A'
        },
        navigationGroup: {
            position: 'absolute',
            justifyContent: 'flex-end',
            bottom: 0,
            width: '100%',
            height: '20%'
        },
        sessionActionMenu: {
            height: 66,
            width: 'auto',
            backgroundColor: '#E9C46A',
            flexDirection: 'row',
            borderRadius: 25,

            alignItems: "center",
            justifyContent: 'center',
            alignSelf: "flex-end",

        }


    });




    const [data, setData] = useState(props.diary)
    const route = useRoute()

    const {searchTerm} = route.params


    const historyItems = () => {


        const searchList = props.diary.filter(item => props.teaAvailable[item.teaID].teaName.toLowerCase().includes( searchTerm.toLowerCase()))


        let items = []

        let loopNumber = searchList.length

        if (loopNumber > 5) {
            loopNumber = 5
        }
        for (let i = 0; i < loopNumber; i++) {
            items.push(<HistoryItem key={`historyItem${i}`} data={searchList[searchList.length - 1 - i]}/>)
        }
        return items
    }

    const renderItems = ({item}) => {



        return (
            <View style={{marginRight: 10, marginLeft: 10,}}>
                <InventoryItem key={`inventoryItem${item[0]}`} turnOff={false} teaID={item[0]}/>
            </View>

        )
    }


    let beginX
    return (
        <View style={styles.container}>



            <View style={{height:'100%',}}>

                <ScrollView style={{flex: 1}} contentContainerStyle={{height: 1000}}>


                    <Text style={styles.welcomeText}>
                        {`Results For: ${searchTerm}`}
                    </Text>

                    <View style={styles.inventoryContainer}>
                        <View style={styles.inventoryViewTextView}>
                            <Text style={{fontSize: 34, color: 'white', marginLeft: 10, width: '45%'}}>
                                Inventory
                            </Text>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('TeaInventory', {searchTerm})
                            }} activeOpacity={1} style={{alignSelf: 'flex-end', width: '50%',}}>
                                <Text style={{
                                    fontSize: 18,
                                    color: 'white',
                                    textAlign: 'right',
                                    textAlignVertical: 'center'
                                }}>
                                    More
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inventoryView}>
                            <FlatList data={Object.entries(props.teaAvailable).filter(([key, value]) => value.teaName.toLowerCase().includes( searchTerm.toLowerCase())

                            )} style={{height: '100%',}} renderItem={renderItems}
                                      horizontal={true}


                                      keyExtractor={item => item[0]}/>
                        </View>
                    </View>
                    <View style={styles.historyContainer}>
                        <View style={styles.HistoryViewTextView}>
                            <Text style={{fontSize: 34, color: 'white', marginLeft: 10, width: '45%'}}>
                                History
                            </Text>
                            <TouchableOpacity style={{alignSelf: 'flex-end', width: '50%',}}>
                                <Text style={{
                                    fontSize: 18,
                                    color: 'white',
                                    textAlign: 'right',
                                    textAlignVertical: 'center'
                                }}>
                                    More
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.historyView}>
                            {historyItems()}


                        </View>
                    </View>

                </ScrollView>
            </View>

            <View style={styles.navigationGroup}>


                <View style={styles.navigationBar}>
                    <TouchableOpacity activeOpacity={1} style={{width: 35, height: 32}}>
                        <Image style={{height: '100%', width: '100%'}} source={require('../img/settings.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={() => {
                        navigation.navigate('TeaInventory')
                    }} style={{width: 35, height: 32}}>
                        <Image style={{height: '100%', width: '100%'}} source={require('../img/teaStorage.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={{width: 35, height: 32}}>
                        <Image style={{height: '100%', width: '100%'}} source={require('../img/shuffle.png')}/>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

const mapStateToProps = (state, ownProps) => {
    const {Diary, TeaAvailable} = state;

    return {
        wholeDiary: Diary,
        diary: Diary.diaryEntry,
        teaAvailable: TeaAvailable.teaAvailable
    };
};
export default connect(mapStateToProps)(SearchPage)

